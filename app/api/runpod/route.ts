import { NextResponse } from 'next/server';
import https from 'https';
import fetch from 'node-fetch';

const RUNPOD_API_KEY = process.env.NEXT_PUBLIC_RUNPOD_API_KEY;
const ENDPOINT_ID = process.env.NEXT_PUBLIC_ENDPOINT_ID;

interface RunPodResponse {
  id: string;
  output?: {
    user_input?: { text: string };
    assistant_response?: { text: string; audio?: string };
  };
  status: 'COMPLETED' | 'FAILED' | 'PENDING' | 'IN_QUEUE' | 'PROCESSING';
  error?: string;
}

// Configure HTTPS Agent to bypass SSL for development
const httpsAgent = process.env.NODE_ENV === 'development'
  ? new https.Agent({ rejectUnauthorized: false })
  : undefined;

// Function to poll for job completion
async function pollForCompletion(jobId: string): Promise<RunPodResponse> {
  const maxAttempts = 7; // Increased max attempts to allow for longer queue times
  let delayMs = 3000; // Initial delay (can increase gradually)

  console.log(`Polling for job completion. Job ID: ${jobId}`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      console.log(`Polling attempt ${attempt + 1}...`);
      const response = await fetch(
        `https://api.runpod.ai/v2/${ENDPOINT_ID}/status/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${RUNPOD_API_KEY}`,
          },
          ...(httpsAgent && { agent: httpsAgent }),
        }
      );

      console.log(`Status response code: ${response.status}`);
      if (!response.ok) {
        // Handle server-side error responses
        const errorDetails = await response.json().catch(() => null);
        throw new Error(
          `Status check failed with status ${response.status}: ${
            errorDetails?.error?.message || 'Unknown error'
          }`
        );
      }

      const data = (await response.json()) as RunPodResponse;
      console.log(`Polling response data:`, data);

      // Handle various job statuses
      if (data.status === 'COMPLETED') {
        console.log(`Job completed successfully:`, data);
        return data;
      } else if (data.status === 'FAILED') {
        throw new Error(data.error || 'Job failed without error message');
      } else if (data.status === 'IN_QUEUE' || data.status === 'PROCESSING') {
        // Continue polling if job is still in queue or processing
        console.log(`Job is still in ${data.status}, retrying...`);
      }

      // Add an exponential backoff to increase the delay after each attempt
      delayMs *= 2; // Double the delay time after each attempt
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    } catch (error) {
      console.error(`Error in poll attempt ${attempt + 1}:`, error);

      // Retry on network-related issues or temporary service failure
      if (error instanceof Error && error.message.includes('fetch')) {
        console.log('Network issue, retrying...');
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

      if (attempt === maxAttempts - 1) {
        throw new Error('Job timed out after multiple attempts');
      }
    }
  }

  throw new Error('Job timed out');
}

// Main handler for POST requests
export async function POST(request: Request) {
  console.log('Received ENDPOINT_ID:', RUNPOD_API_KEY);
  console.log('Received RUNPOD_API_KEY:', ENDPOINT_ID);

  try {
    const body = await request.json();
    console.log('Received request body:', body);

    const { type, text, audio } = body;

    if (!type || !text) {
      console.error('Missing required fields: type or text');
      return NextResponse.json(
        { error: 'Missing required fields: type and text are mandatory.' },
        { status: 400 }
      );
    }

    console.log('Preparing to call RunPod API with:', { type, text, audio });

    const response = await fetch(`https://api.runpod.ai/v2/${ENDPOINT_ID}/run`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RUNPOD_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: { type, text, audio } }),
      ...(httpsAgent && { agent: httpsAgent }),
    });

    console.log(`RunPod API response status: ${response.status}`);
    if (!response.ok) {
      const errorDetails = await response.json().catch(() => null);
      console.error('RunPod API call failed:', {
        status: response.status,
        errorDetails,
      });

      return NextResponse.json(
        {
          error: 'RunPod API error',
          details: errorDetails?.error?.message || `Unexpected error (${response.status})`,
        },
        { status: response.status }
      );
    }

    const data = (await response.json()) as RunPodResponse;
    console.log('RunPod job initiated:', data);

    const completedData = await pollForCompletion(data.id);
    console.log('RunPod job completed:', completedData);

    return NextResponse.json(completedData);
  } catch (error: unknown) {
    console.error(
      'Error in RunPod API Route:',
      error instanceof Error ? error.message : error
    );

    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    const isClientError = errorMessage.includes('invalid_request_error');

    // Return 500 with detailed error message if a server issue occurred
    if (error instanceof Error && error.message.includes('Job timed out')) {
      return NextResponse.json(
        {
          error: 'Server Timeout',
          details: 'The job processing took too long to complete.',
        },
        { status: 500 }
      );
    }

    // Return specific error for other internal errors
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
