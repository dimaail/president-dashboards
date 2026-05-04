import { buildSystemPrompt } from './prompt.js';

const SUPABASE_URL = 'https://qiygegopwiarqdzgldpa.supabase.co';

let systemPrompt = null;
let conversationHistory = [];

// Вызови при загрузке страницы
export async function initChat() {
  systemPrompt = await buildSystemPrompt();
}

export async function sendMessage(userText) {
  conversationHistory.push({
    role: 'user',
    content: userText
  });

  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/ai-proxy`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: systemPrompt,
        messages: conversationHistory
      })
    }
  );

  const data = await response.json();
  const reply = data.choices[0].message.content;

  conversationHistory.push({
    role: 'assistant',
    content: reply
  });

  return reply;
}

export function clearHistory() {
  conversationHistory = [];
}