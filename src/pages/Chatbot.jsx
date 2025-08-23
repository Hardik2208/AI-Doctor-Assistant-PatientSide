import React, { useState } from 'react';
import Header from '../assets/component/Header';
import Footer from '../assets/component/Footer';
import { Bot } from 'lucide-react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer=()=> setIsOpen(!isOpen);
    

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/Chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input })
            });

            const data = await response.json();
            
            // Handle structured response
            let botResponseText = data.response;
if (data.response) {
   botResponseText = data.response;
}
            
            const botMessage = { text: botResponseText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { text: 'Sorry, something went wrong!', sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        }
        setLoading(false);
    };

return (
    <>
        {/* Floating Chat Button with Glow Effect */}
        <button 
            className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 ${isOpen ? 'rotate-180' : ''} group z-50`}
            onClick={toggleDrawer}
            style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
            }}
        >
            {isOpen ? (
                <svg className="w-8 h-8 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <Bot className="w-8 h-8 group-hover:animate-pulse" />
            )}
            
            {/* Pulse Ring Animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 animate-ping"></div>
        </button>

        {/* Chat Drawer with Backdrop */}
        {isOpen && (
            <div className="fixed  inset-0 z-40 flex items-end justify-end bottom-15 ">
                {/* Animated Backdrop */}
                <div 
                    className="absolute inset-0 *:backdrop-blur-sm"
                    onClick={toggleDrawer}
                />
                
{/* Main Chat Container */}
<div
  className={`relative w-80 h-[500px] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden transform transition-transform duration-500`}
>

                    
                    {/* Header with Gradient */}
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white p-4 flex justify-between items-center relative overflow-hidden">
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-20"></div>
                        
                        <div className="flex items-center space-x-3 relative z-10">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">SANCTUA</h3>
                                <p className="text-blue-100 text-xs">AI Health Assistant</p>
                            </div>
                        </div>
                        
                        <button 
                            onClick={toggleDrawer} 
                            className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 relative z-10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area with Glass Effect */}
                    <div className="h-80 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/80 to-white/80 backdrop-blur-sm">
                        {messages.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                                    <Bot className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-gray-500 text-sm">
                                    👋 Hello! I'm SANCTUA, your AI health assistant.<br/>
                                    How can I help you today?
                                </p>
                            </div>
                        )}
                        
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs px-4 py-3 rounded-2xl backdrop-blur-md transition-all duration-200 hover:scale-105 ${
                                    msg.sender === 'user' 
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                                        : 'bg-white/80 text-gray-800 shadow-md border border-white/40'
                                }`}>
                                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md border border-white/40 flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                    <span className="text-sm text-gray-500">SANCTUA is typing...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area with Modern Design */}
                    <div className="p-4 bg-white/90 backdrop-blur-md border-t border-white/20">
                        <div className="flex gap-3 items-end">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    placeholder="Type your message..."
                                    className="w-full px-4 py-3 bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-400"
                                />
                            </div>
                            
                            <button 
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center transform hover:scale-105 shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
);

}

export default Chatbot;