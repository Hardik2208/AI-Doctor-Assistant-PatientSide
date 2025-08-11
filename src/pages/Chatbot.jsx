import React, { useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input })
            });

            const data = await response.json();
            const botMessage = { text: data.response, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { text: 'Sorry, something went wrong!', sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                <h3 className="font-semibold">AI Doctor Assistant</h3>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50 space-y-3">
                {messages.length === 0 && (
                    <div className="text-gray-500 text-center">
                        Start a conversation with your AI doctor assistant
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.sender === 'user' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-800 shadow-sm border'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border text-gray-500 italic">
                            Bot is typing...
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-white rounded-b-lg">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Ask about symptoms, treatments..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button 
                        onClick={sendMessage}
                        disabled={loading || !input.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;