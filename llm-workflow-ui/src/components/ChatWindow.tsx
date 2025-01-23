import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Plus, MessageSquare } from 'lucide-react';
import useStore from '../store';
import OpenAI from 'openai';

function ChatWindow({ onClose }) {
  const [conversations, setConversations] = useState([
    { id: 'new', title: 'New Conversation', messages: [] }
  ]);
  const [currentConversation, setCurrentConversation] = useState('new');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { nodes } = useStore();
  
  const llmNode = nodes.find(n => n.type === 'llm');
  const apiKey = llmNode?.data?.apiKey;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const handleNewConversation = () => {
    const newId = Date.now().toString();
    setConversations([
      ...conversations,
      { id: newId, title: 'New Conversation', messages: [] }
    ]);
    setCurrentConversation(newId);
  };

  const getCurrentMessages = () => {
    return conversations.find(c => c.id === currentConversation)?.messages || [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !apiKey) return;

    const userMessage = { role: 'user', content: input };
    
    // Update UI immediately with user message
    setConversations(convs => convs.map(conv => 
      conv.id === currentConversation
        ? { ...conv, messages: [...conv.messages, userMessage] }
        : conv
    ));
    setInput('');
    setIsTyping(true);

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      const completion = await openai.chat.completions.create({
        model: llmNode?.data?.model === 'gpt-4' ? 'gpt-4' : 'gpt-3.5-turbo',
        messages: [...getCurrentMessages(), userMessage],
        max_tokens: llmNode?.data?.maxTokens || 2000,
        temperature: llmNode?.data?.temperature || 0.5,
      });

      const assistantMessage = {
        role: 'assistant',
        content: completion.choices[0]?.message?.content || 'No response generated'
      };

      setConversations(convs => convs.map(conv => 
        conv.id === currentConversation
          ? { ...conv, messages: [...conv.messages, assistantMessage] }
          : conv
      ));
    } catch (error) {
      // Add error message to conversation
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.'
      };
      setConversations(convs => convs.map(conv => 
        conv.id === currentConversation
          ? { ...conv, messages: [...conv.messages, errorMessage] }
          : conv
      ));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[1000px] h-[700px] rounded-lg flex">
        {/* Sidebar */}
        <div className="w-64 border-r flex flex-col">
          <div className="p-4 border-b">
            <button
              onClick={handleNewConversation}
              className="w-full px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setCurrentConversation(conv.id)}
                className={`w-full px-3 py-2 rounded-md text-left flex items-center space-x-2 ${
                  currentConversation === conv.id
                    ? 'bg-gray-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="truncate">{conv.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-blue-500" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {getCurrentMessages().map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  AI is typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!apiKey}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
            {!apiKey && (
              <p className="mt-2 text-sm text-red-500">
                Please add your OpenAI API key in the LLM Engine node first
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;