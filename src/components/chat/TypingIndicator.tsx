export default function TypingIndicator() {
    return (
        <div className="flex items-center space-x-1 p-2">
            <span className="h-2 w-2 rounded-full bg-foreground animate-bounce [animation-delay:-0.3s]" />
            <span className="h-2 w-2 rounded-full bg-foreground animate-bounce [animation-delay:-0.15s]" />
            <span className="h-2 w-2 rounded-full bg-foreground animate-bounce" />
            <span className="sr-only">Typing...</span>
        </div>
    );
}