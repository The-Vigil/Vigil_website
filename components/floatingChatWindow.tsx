import React, { useState, useRef, useEffect, FC } from 'react';
import { X, Send, Mic, StopCircle, Bot } from 'lucide-react';
import { Howl } from 'howler';
import CosmicRingComponent from './cosmicRingComponent';
import CosmicRing from './cosmicRing';

interface Message {
  type: 'user' | 'assistant' | 'error' | 'system';
  text: string;
}

interface RunPodResponse {
  id: string;
  output?: {
    user_input?: { text: string };
    assistant_response?: { text: string; audio?: string };
  };
  status: 'COMPLETED' | 'FAILED' | 'PENDING';
  error?: string;
}

const FloatingChatWindow: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference for audio playback
  const [showPredefinedMessages, setShowPredefinedMessages] = useState(false);


  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'assistant',
          text: "Hi! I'm AEGIS Vigil's AI Property Protection Consultant AI assistant. How can I help you today?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const stopAudioPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset playback
      audioRef.current.src = ''; // Clear source
    }
    Howler.stop(); // Stops all audio from Howler.js globally
  };

  // Updated function to work with `messages` array
  const generatePredefinedMessages = (messages: Message[]): string[] => {
    // Find the most recent user message
    const lastUserMessage = messages
      .slice() // Make a copy to avoid modifying the original
      .reverse() // Reverse to find the last message from the user
      .find((message) => message.type === 'user');

    // If no user message is found, provide default options
    if (!lastUserMessage) {
      return ["Hi", "What can you help me with?", "Tell me about yourself"];
    }

    // Extract the text from the last user message
    const userInput = lastUserMessage.text.toLowerCase();

    if (userInput.includes("details")) {
      return ["Can you elaborate on your query?", "What specific details are you looking for?", "Would you like examples or more insights?"];
    } else if (userInput.includes("purpose")) {
      return ["What is your main goal?", "Can you explain your purpose in detail?", "What are you trying to achieve?"];
    } else if (userInput.includes("help")) {
      return ["What kind of help do you need?", "Can you describe your issue in detail?", "Let me know how I can assist you."];
    } else if (userInput.includes("property protection")) {
      return ["Are you looking for advice on securing a property?", "Can I guide you with property safety tips?", "What kind of protection do you need?"];
    }

    // Default fallback messages
    return ["Can you clarify your question?", "How can I assist you?", "What information do you need?"];
  };

  const predefinedMessages = generatePredefinedMessages(messages);


  const handleClose = () => {
    stopAudioPlayback(); // Stop any audio
    setIsOpen(false); // Close the chat window
  };

  const handlePredefinedMessageClick = async (message: string) => {
    setInputText(message);
    await handleSendMessage();
  };

  const startRecording = async (): Promise<void> => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser does not support getUserMedia API.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        await processAudioInput(audioBlob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      // Handle stream usage
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'NotAllowedError') {
        console.error('Permission denied:', error);
        setMessages((prev) => [
          ...prev,
          { type: 'error', text: 'Microphone access denied. Please enable permissions in browser settings.' },
        ]);
      } else {
        console.error('Error accessing microphone:', error);
        setMessages((prev) => [
          ...prev,
          { type: 'error', text: 'Unable to access microphone. Ensure permissions are enabled and try again.' },
        ]);
      }
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string)
          .replace('data:audio/wav;base64,', '')
          .replace('data:audio/webm;base64,', '');
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const base64ToBlob = (base64: string): Blob => {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: 'audio/wav' });
  };

  const processAudioInput = async (blob: Blob): Promise<void> => {
    setIsLoading(true);
    try {
      const base64Audio = await blobToBase64(blob);

      setMessages((prev) => [
        ...prev,
        {
          type: 'system',
          text: 'Processing your voice message...',
        },
      ]);

      const response = await callRunPodEndpoint({
        type: 'audio',
        audio: base64Audio,
      });

      setMessages((prev) => prev.filter((msg) => msg.text !== 'Processing your voice message...'));

      if (response?.output?.user_input?.text) {
        setMessages((prev) => [
          ...prev,
          {
            type: 'user',
            text: response.output?.user_input?.text || '',
          },
        ]);
      }

      if (response?.output?.assistant_response) {
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            text: response?.output?.assistant_response?.text || '',
          },
        ]);

        if (response.output.assistant_response.audio) {
          const audioData = base64ToBlob(response.output.assistant_response.audio);
          const audioUrl = URL.createObjectURL(audioData);

          // Use Howler.js for playback
          const sound = new Howl({
            src: [audioUrl],
            format: ['wav'], // Specify the format
            autoplay: true, // Automatically play when loaded
            onend: () => {
              URL.revokeObjectURL(audioUrl); // Cleanup URL after playback ends
            },
            onplayerror: (error: unknown) => {
              if (error instanceof Error) {
                console.error('Audio playback failed:', error.message);
              } else {
                console.error('Audio playback failed with an unknown error.');
              }
              setMessages((prev) => [
                ...prev,
                { type: 'error', text: 'Unable to play audio. User interaction required.' },
              ]);
            },

          });

          sound.play();
        }

      }
    } catch (error) {
      console.error('Error processing audio:', error);
      setMessages((prev) =>
        prev.filter((msg) => msg.text !== 'Processing your voice message...')
      );
      setMessages((prev) => [
        ...prev,
        {
          type: 'error',
          text: 'Sorry, there was an error processing your audio.',
        },
      ]);
    }
    setIsLoading(false);
  };

  const callRunPodEndpoint = async (payload: Record<string, unknown>): Promise<RunPodResponse> => {
    console.log('Sending API Request:', payload);
    try {
      const response = await fetch('/api/runpod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calling server API:', error);
      throw error;
    }
  };

  const handleSendMessage = async (): Promise<void> => {
    setShowPredefinedMessages(false)
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText('');
    setMessages((prev) => [...prev, { type: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await callRunPodEndpoint({
        type: 'text',
        text: userMessage,
      });

      if (response?.output?.assistant_response) {
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            text: response?.output?.assistant_response?.text || '',
          },
        ]);

        if (response.output.assistant_response.audio) {
          const audioData = base64ToBlob(response.output.assistant_response.audio);
          const audioUrl = URL.createObjectURL(audioData);

          // Use Howler.js for playback
          const sound = new Howl({
            src: [audioUrl],
            format: ['wav'], // Specify the format
            autoplay: true, // Automatically play when loaded
            onend: () => {
              URL.revokeObjectURL(audioUrl); // Cleanup URL after playback ends
            },
            onplayerror: (error: unknown) => {
              if (error instanceof Error) {
                console.error('Audio playback failed:', error.message);
              } else {
                console.error('Audio playback failed with an unknown error.');
              }
              setMessages((prev) => [
                ...prev,
                { type: 'error', text: 'Unable to play audio. User interaction required.' },
              ]);
            },
          });

          sound.play();
        }

      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          type: 'error',
          text: 'Sorry, there was an error processing your message.',
        },
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`transition-all duration-500 ease-in-out transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}>
        {isOpen && (
          <div className="chat-container w-96 max-h-[600px] rounded-2xl flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-t-2xl flex items-center justify-between relative overflow-hidden" style={{ minHeight: '5rem' }}>
              <div className="flex items-center space-x-3 z-10">
                <CosmicRing />
                {/* <Bot className="w-6 h-6 text-white wave-animation" /> */}
                <h3 className="font-bold text-white text-lg">AEGIS Vigil AI</h3>
              </div>
              <button
                onClick={handleClose}
                className="hover:bg-white/20 rounded-full p-2 transition-all duration-300 text-white z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 animate-pulse"></div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px] bg-gradient-to-b from-gray-900 to-gray-800">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] message-glow ${message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'
                      : message.type === 'error'
                        ? 'bg-gradient-to-r from-red-500 to-red-700 text-white'
                        : message.type === 'system'
                          ? 'bg-gray-700/80 text-gray-200'
                          : 'bg-gradient-to-r from-gray-700/90 to-gray-800/90 text-white'
                      }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800/90 text-white p-4 rounded-2xl flex items-center space-x-3 message-glow">
                    <Bot className="w-5 h-5 animate-spin" />
                    <span>Processing</span>
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          style={{ animation: 'pulse 1s ease-in-out infinite', animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Predefined options */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex justify-between items-center">
                <h4 className="text-gray-300 text-sm font-medium">  {showPredefinedMessages ? "Suggestions" : "Need Suggestions?"}</h4>
                <button
                  onClick={() => setShowPredefinedMessages(!showPredefinedMessages)}
                  className="text-blue-500 hover:text-blue-400 text-xs transition-all duration-300"
                >
                  {showPredefinedMessages ? "Hide" : "Show"}
                </button>
              </div>
              {showPredefinedMessages && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {predefinedMessages.map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => handlePredefinedMessageClick(msg)}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 transition-all duration-300"
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              )}
            </div>


            {/* Input Area */}
            <div className="p-4 bg-gray-800 rounded-b-2xl border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-900 text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-gray-400 input-glow"
                />
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-3 rounded-full transition-all duration-300 ${isRecording
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                  {isRecording ? (
                    <StopCircle className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Mic className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-blue-500 hover:bg-blue-600 rounded-full p-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
              {isRecording && (
                <div className="text-red-400 text-sm mt-2 text-center animate-pulse">
                  Recording in progress...
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating Chat Button */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          role="button"
          tabIndex={0}
          className="relative group"
          aria-label="Open Chat"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsOpen(true);
            }
          }}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl transition-all duration-500" />

          {/* CosmicRingComponent */}
          <div className="relative rounded-full cursor-pointer transform transition-transform duration-300 group-hover:scale-105">
            <CosmicRingComponent />
          </div>
        </div>
      )}

    </div>
  );
};

export default FloatingChatWindow;
