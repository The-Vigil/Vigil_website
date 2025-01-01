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
  status: 'COMPLETED' | 'FAILED' | 'PENDING';
  error?: string;
}
// Configure HTTPS Agent to bypass SSL for development
const httpsAgent = process.env.NODE_ENV === 'development'
  ? new https.Agent({ rejectUnauthorized: false })
  : undefined;

async function pollForCompletion(jobId: string): Promise<RunPodResponse> {
  const maxAttempts = 30;
  const delayMs = 1000;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await fetch(
        `https://api.runpod.ai/v2/${ENDPOINT_ID}/status/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${RUNPOD_API_KEY}`,
          },
          ...(httpsAgent && { agent: httpsAgent }),
        }
      );

      if (!response.ok) {
        throw new Error(`Status check failed with status ${response.status}`);
      }

      const data = (await response.json()) as RunPodResponse;
      console.log("data", data)

      if (data.status === 'COMPLETED') {
        return data;
      } else if (data.status === 'FAILED') {
        throw new Error(data.error);
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    } catch (error) {
      console.error(`Error in poll attempt ${attempt + 1}:`, error);
      throw error;
    }
  }

  throw new Error('Job timed out');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, text, audio } = body;

    // Fetch request to the RunPod API
    const response = await fetch(`https://api.runpod.ai/v2/${ENDPOINT_ID}/run`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RUNPOD_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: { type, text, audio } }),
      ...(httpsAgent && { agent: httpsAgent }), // Add the agent option only if defined
    });

    if (!response.ok) {
      console.error(`RunPod API error: ${response.statusText}`);
      return NextResponse.json(
        { error: `Failed to call RunPod API: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Poll for job completion
    const completedData = await pollForCompletion(data.id);

    return NextResponse.json(completedData);

  } catch (error: any) {
    console.error('Error in RunPod API Route:', error.message || error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message || error },
      { status: 500 }
    );
  }
}