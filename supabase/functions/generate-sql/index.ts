import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { prompt, dateFrom, dateTo } = await req.json();

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 500,
        messages: [
          {
            role: "system",
            content: `You are a PostgreSQL expert. You generate SQL SELECT queries for a financial transactions database in Uganda.

Table name: transactions1
Columns:
- id: uuid
- created_at: timestamptz
- tx_date: timestamptz (always use this for date filtering, not created_at)
- sender_bank: text (name of the sending bank or mobile operator)
- receiver_bank: text (name of the receiving bank or mobile operator)
- sender_name: text (name of the person or company sending the payment)
- receiver_name: text (name of the person or company receiving the payment)
- amount: numeric (in UGX — Ugandan Shillings)
- currency: text (always 'UGX')
- channel: text — values: 'mobile_money', 'bank', 'card', 'crypto'
- region: text — values: 'Central', 'Eastern', 'Western', 'Northern', 'West Nile', 'Karamoja'
- flag: text[] (PostgreSQL array) — possible values: 'AML', 'Fraud', 'CFT', 'Tax'. Empty array means no flag.
- status: text — values: 'cleared', 'blocked', 'pending'
- reference: text (transaction reference number, format REF-XXXXXXXXXX)
- payment_purpose: text — values: 'Airtime top-up', 'Data bundle', 'Utility bill', 'School fees', 'Medical bill', 'Rent payment', 'Salary', 'Goods purchase', 'Service payment', 'Tax payment', 'Loan repayment', 'Insurance premium', 'Savings deposit', 'Food & groceries', 'Transport', 'Construction materials', 'Agricultural inputs', 'Church offering', 'Government levy', 'Money transfer'
- tx_type: text — values: 'P2P', 'C2B', 'B2B'

Common bank and operator names in the data:
- Mobile operators: 'MTN Uganda', 'Airtel Uganda' (together ~80% of transactions)
- Banks: 'Centenary Bank', 'Stanbic Bank', 'DFCU Bank', 'Equity Bank', 'PostBank Uganda', 'Cairo Bank', 'Absa Uganda', 'Pride Microfinance', 'Finance Trust Bank', 'Opportunity Bank', 'ABC Capital Bank', 'GT Bank Uganda', 'Bank of Africa Uganda', 'Tropical Bank', 'Exim Bank Uganda', 'NC Bank Uganda', 'Ecobank Uganda', 'KCB Bank Uganda'

Rules you must always follow:
- Always generate a valid PostgreSQL SELECT query only
- Always filter by tx_date >= dateFrom AND tx_date <= dateTo using proper timestamptz casting: tx_date >= '{dateFrom}'::timestamptz AND tx_date <= '{dateTo}'::timestamptz + interval '1 day'
- Never generate INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE or any mutating SQL
- For flag filtering always use array overlap operator: flag && ARRAY['AML']
- For empty flag (no flags) use: flag = '{}'
- Always end query with ORDER BY tx_date DESC
- Always add LIMIT 10000
- Return ONLY the raw SQL query — no explanation, no markdown, no backticks, no comments
- Amount is always in UGX — if user mentions millions, multiply accordingly (e.g. 5 million = 5000000)
- For text search use ILIKE for case-insensitive matching: sender_name ILIKE '%James%'
- tx_type values are uppercase: 'P2P', 'C2B', 'B2B'`,
          },
          {
            role: "user",
            content: `Generate a SQL query for the transactions table.
Date range: ${dateFrom} to ${dateTo}
User request: ${prompt}`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(`OpenAI error: ${data.error?.message || JSON.stringify(data)}`);
    }

    const sql = data.choices?.[0]?.message?.content?.trim();

    if (!sql) throw new Error("No SQL returned from OpenAI");

    return new Response(JSON.stringify({ sql }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
