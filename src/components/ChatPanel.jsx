import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

export default function ChatPanel({ messages, onSend, suggestions = [] }) {
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const submit = (text) => {
    const value = (text ?? input).trim();
    if (!value) return;
    onSend(value);
    setInput("");
  };

  return (
    <section className="flex h-full w-full flex-col rounded-xl border bg-white">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Sparkles className="size-4 text-blue-600" />
          AI Assistant
        </div>
        <div className="text-xs text-gray-500">For clinical decision support only</div>
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 border-b bg-gray-50">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => submit(s)}
              className="rounded-full border bg-white px-3 py-1.5 text-xs hover:border-blue-400 hover:bg-blue-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} text={m.text} time={m.time} />
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="border-t p-3"
      >
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Send className="size-4" />
            Send
          </button>
        </div>
      </form>
    </section>
  );
}

function MessageBubble({ role, text, time }) {
  const isUser = role === "user";
  return (
    <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
          <Bot className="size-4" />
        </div>
      )}
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${isUser ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
        <p className="whitespace-pre-line">{text}</p>
        {time && <div className={`mt-1 text-[10px] ${isUser ? "text-blue-100" : "text-gray-500"}`}>{time}</div>}
      </div>
      {isUser && (
        <div className="size-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
          <User className="size-4" />
        </div>
      )}
    </div>
  );
}
