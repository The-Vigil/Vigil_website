import React, { useEffect, useRef, useState } from 'react';
import { Send, X, Mic, StopCircle } from 'lucide-react';

const CosmicRingChat = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

  // Handle mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 640);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Voice recording handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setMessages(prev => [...prev, {
          type: 'audio',
          url: audioUrl,
          sender: 'user'
        }]);

        // Simulate AI response
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: "I received your voice message and I'm processing it.",
            sender: 'ai'
          }]);
        }, 1000);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  // Canvas animation code remains the same as before
  useEffect(() => {
    let ctx = null;
    let particles = [];
    let time = 0;

    const initCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return false;

      ctx = canvas.getContext('2d');
      if (!ctx) return false;

      const size = isOpen ? 50 : 200;
      canvas.width = size * 2;
      canvas.height = size * 2;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.scale(2, 2);

      return true;
    };

    // Create particle systems
    const createParticles = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const size = canvas.width / 2;
      particles = [];
      
      // Ring particles
      for (let i = 0; i < 200; i++) {
        const angle = (Math.PI * 2 * i) / 200;
        const radius = size * 0.35;
        particles.push({
          x: size/2 + Math.cos(angle) * radius,
          y: size/2 + Math.sin(angle) * radius,
          angle,
          radius,
          baseRadius: radius,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.02 + 0.01,
          hue: Math.random() < 0.5 ? 170 + Math.random() * 40 : 280 + Math.random() * 40,
          offset: Math.random() * Math.PI * 2,
          energy: Math.random()
        });
      }

      // Nebula particles
      for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * size * 0.4 + size * 0.2;
        particles.push({
          x: size/2 + Math.cos(angle) * radius,
          y: size/2 + Math.sin(angle) * radius,
          angle,
          radius,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.005 + 0.002,
          hue: Math.random() < 0.5 ? 180 + Math.random() * 40 : 290 + Math.random() * 40,
          alpha: Math.random() * 0.5,
          type: 'nebula'
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvasRef.current) return;
      
      const size = canvasRef.current.width / 2;
      
      ctx.fillStyle = 'rgba(0, 0, 10, 0.1)';
      ctx.fillRect(0, 0, size, size);

      // Draw background glow
      const bgGradient = ctx.createRadialGradient(
        size/2, size/2, size * 0.2,
        size/2, size/2, size * 0.5
      );
      bgGradient.addColorStop(0, 'rgba(20, 0, 50, 0)');
      bgGradient.addColorStop(0.5, 'rgba(30, 0, 60, 0.1)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 20, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, size, size);

      // Update and draw particles
      particles.forEach(particle => {
        if (particle.type === 'nebula') {
          // Nebula particle movement
          particle.angle += particle.speed;
          particle.x = size/2 + Math.cos(particle.angle) * particle.radius;
          particle.y = size/2 + Math.sin(particle.angle) * particle.radius;
          
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${particle.alpha})`);
          gradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Ring particle movement
          const wave = Math.sin(time * 0.05 + particle.offset) * 5;
          const wave2 = Math.cos(time * 0.03 + particle.offset) * 3;
          
          particle.energy += (isActive ? 1 : 0.5 - particle.energy) * 0.1;
          
          const currentRadius = particle.baseRadius + wave + 
                              (isActive ? Math.sin(time * 0.1 + particle.offset) * 8 : 0);
          
          particle.x = size/2 + Math.cos(particle.angle) * (currentRadius + wave2);
          particle.y = size/2 + Math.sin(particle.angle) * (currentRadius + wave);

          // Draw ring particle with plasma effect
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * (2 + particle.energy)
          );
          
          const alpha = 0.6 + particle.energy * 0.4;
          gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${alpha})`);
          gradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(
            particle.x, 
            particle.y, 
            particle.size * (1 + particle.energy), 
            0, 
            Math.PI * 2
          );
          ctx.fill();
        }
      });

      // Draw outer glow ring
      const ringGradient = ctx.createRadialGradient(
        size/2, size/2, size * 0.3,
        size/2, size/2, size * 0.4
      );
      ringGradient.addColorStop(0, `hsla(200, 100%, 70%, ${0.1 + Math.sin(time * 0.05) * 0.05})`);
      ringGradient.addColorStop(0.5, `hsla(280, 100%, 70%, ${0.2 + Math.sin(time * 0.03) * 0.05})`);
      ringGradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
      
      ctx.fillStyle = ringGradient;
      ctx.beginPath();
      ctx.arc(size/2, size/2, size * 0.4, 0, Math.PI * 2);
      ctx.fill();

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (initCanvas()) {
      createParticles();
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen, isActive]);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages(prev => [...prev, { text: inputText, sender: 'user' }]);
      setInputText('');
      setIsActive(true);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "I'm here to help you. This is a demo response.",
          sender: 'ai'
        }]);
        setIsActive(false);
      }, 1500);
    }
  };

  return (
    <div className={`fixed ${isMobileView ? 'inset-0' : 'bottom-4 right-4'} font-sans`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
          className={`relative group ${isMobileView ? 'fixed bottom-4 right-4' : ''}`}
        >
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all duration-500" />
          <canvas
            ref={canvasRef}
            className="rounded-full cursor-pointer transform transition-transform duration-300 group-hover:scale-105"
          />
        </button>
      ) : (
        <div className={`bg-gray-900/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden border border-gray-800
          ${isMobileView ? 'w-full h-full' : 'w-96 rounded-2xl'}`}>
          <div className="p-4 flex justify-between items-center border-b border-gray-800/50">
            <div className="flex items-center gap-3">
              <canvas
                ref={canvasRef}
                className="rounded-full"
              />
              <span className="text-gray-200 font-medium">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-800/80 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {message.type === 'audio' ? (
                    <audio controls className="w-full max-w-xs">
                      <source src={message.url} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-800/50">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 p-3 rounded-xl bg-gray-800/50 text-gray-200 placeholder-gray-500 border border-gray-700/50 focus:outline-none focus:border-blue-500/50"
              />
              {isRecording ? (
                <button
                  onClick={stopRecording}
                  className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <StopCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">{recordingTime}s</span>
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  className="p-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
                >
                  <Mic className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={handleSend}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CosmicRingChat;