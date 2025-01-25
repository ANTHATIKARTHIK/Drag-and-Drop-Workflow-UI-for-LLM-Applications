import { useState, useCallback } from 'react';
import { Message, Conversation } from '../types';
import { callOpenAI } from '../utils/openai';

export function useChat(apiKey: string | undefined) {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 'new', title: 'New Conversation', messages: [] }
  ]);
  const [currentConversation, setCurrentConversation] = useState('new');
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback(async (content: string) => {
    if (!apiKey) return;

    const userMessage: Message = { role: 'user', content };
    
    setConversations(convs => convs.map(conv => 
      conv.id === currentConversation
        ? { ...conv, messages: [...conv.messages, userMessage] }
        : conv
    ));

    setIsTyping(true);

    try {
      const response = await callOpenAI(
        apiKey,
        [...conversations.find(c => c.id === currentConversation)?.messages || [], userMessage]
      );

      const assistantMessage: Message = {
        role: 'assistant',
        content: response
      };

      setConversations(convs => convs.map(conv => 
        conv.id === currentConversation
          ? { ...conv, messages: [...conv.messages, assistantMessage] }
          : conv
      ));
    } catch (error) {
      const errorMessage: Message = {
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
  }, [apiKey, conversations, currentConversation]);

  const newConversation = useCallback(() => {
    const newId = Date.now().toString();
    setConversations(convs => [
      ...convs,
      { id: newId, title: 'New Conversation', messages: [] }
    ]);
    setCurrentConversation(newId);
  }, []);

  return {
    conversations,
    currentConversation,
    isTyping,
    addMessage,
    newConversation,
    setCurrentConversation
  };
}