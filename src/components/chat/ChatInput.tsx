import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Send } from 'lucide-react';
import { useChatStore, Message } from '@/store/chat';
import { getAIResponse, AIResponse } from '@/lib/ai';

export default function ChatInput() {
    const [message, setMessage] = useState('');
    const { addMessage, setIsTyping } = useChatStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMessage: Message = { role: 'user', content: message, id: 'temp-id' }; // temp-id will be replaced by uuid in store
        addMessage(userMessage);
        setMessage('');
        setIsTyping(true);

        const aiResponse = await getAIResponse(userMessage);
        addMessage({
            role: 'assistant',
            content: aiResponse.text,
            recommendations: aiResponse.recommendations,
            isConsentPrompt: aiResponse.isConsentPrompt,
            supportOptions: aiResponse.supportOptions,
            detectedCategories: aiResponse.detectedCategories,
            id: '' // Will be replaced by uuid in store
        } as Message);
        setIsTyping(false);
    };
    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!message.trim()}>
                <Send className="h-4 w-4" />
            </Button>
            <Button type="button" variant="outline" size="icon">
                <Mic className="h-4 w-4" />
            </Button>
        </form>
    );
}