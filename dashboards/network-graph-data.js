/* ─────────────────────────────────────────────────────────────────────────────
   FIA Financial Network Data — Sam Obongo
   Edit this file to add/remove nodes and edges; the graph reloads on refresh.

   Node types: person | bank_account | mobile_money | crypto_wallet | exchange_account | company
   ───────────────────────────────────────────────────────────────────────────── */
window.NETWORK_GRAPH_DATA = {
  "meta": {
    "subject": "Sam Obongo",
    "case_ref": "FIA-2026-0047",
    "generated": "2026-05-06",
    "analyst": "FIA Intelligence Unit",
    "risk_level": "High"
  },
  "nodes": [

    /* ── Subject ─────────────────────────────────────────────────── */
    {
      "id": "sam",
      "label": "Sam Obongo",
      "type": "person",
      "details": {
        "role": "Senior Civil Servant, MoF",
        "dob": "12 Mar 1978",
        "nationality": "Ugandan",
        "source_of_funds": "Salary + directorships",
        "risk_level": "High"
      },
      "suspicious": false
    },

    /* ── Sam's bank accounts ─────────────────────────────────────── */
    {
      "id": "stanbic",
      "label": "Stanbic Bank · UG0123456789",
      "type": "bank_account",
      "details": {
        "bank": "Stanbic Bank Uganda",
        "account": "UG0123456789",
        "currency": "UGX",
        "balance": "UGX 287,400,000",
        "opened": "Jan 2015",
        "account_type": "Corporate",
        "holder": "Sam Obongo"
      },
      "suspicious": false
    },
    {
      "id": "absa",
      "label": "Absa Bank · UG9876543210",
      "type": "bank_account",
      "details": {
        "bank": "Absa Bank Uganda",
        "account": "UG9876543210",
        "currency": "UGX",
        "balance": "UGX 94,200,000",
        "opened": "Mar 2019",
        "account_type": "Personal",
        "holder": "Sam Obongo"
      },
      "suspicious": false
    },

    /* ── Sam's mobile money ──────────────────────────────────────── */
    {
      "id": "airtel",
      "label": "Airtel Money · +256701234567",
      "type": "mobile_money",
      "details": {
        "provider": "Airtel Uganda",
        "phone": "+256 701 234 567",
        "registered_name": "Sam Obongo",
        "account_age": "4 years",
        "monthly_avg_tx": "UGX 22.5M"
      },
      "suspicious": false
    },
    {
      "id": "mtn",
      "label": "MTN MoMo · +256781234567",
      "type": "mobile_money",
      "details": {
        "provider": "MTN Uganda",
        "phone": "+256 781 234 567",
        "registered_name": "Sam Obongo",
        "account_age": "6 years",
        "monthly_avg_tx": "UGX 18.2M"
      },
      "suspicious": false
    },

    /* ── Sam's crypto / exchange ─────────────────────────────────── */
    {
      "id": "usdt_wallet",
      "label": "USDT TRC20 · TFBa1M9a…",
      "type": "crypto_wallet",
      "details": {
        "blockchain": "TRON (TRC-20)",
        "address": "TFBa1M9a7rqXpz2K…",
        "estimated_balance": "USD 142,000",
        "first_seen": "Nov 2022",
        "total_received": "USD 412,000"
      },
      "suspicious": true
    },
    {
      "id": "binance",
      "label": "Binance · samobongo@gmail.com",
      "type": "exchange_account",
      "details": {
        "platform": "Binance",
        "email": "samobongo@gmail.com",
        "kyc_status": "Verified (Tier 2)",
        "country": "Uganda",
        "total_volume": "USD 890,000",
        "account_created": "Oct 2022"
      },
      "suspicious": true
    },

    /* ── Sam's companies ─────────────────────────────────────────── */
    {
      "id": "company_a",
      "label": "Obongo Holdings Ltd (100%)",
      "type": "company",
      "details": {
        "registration": "UG-REG-2018-047821",
        "incorporated": "Feb 2018",
        "ownership": "Sam Obongo 100%",
        "director": "Sam Obongo",
        "industry": "General Trade & Consulting",
        "annual_turnover": "UGX 1.2B"
      },
      "suspicious": false
    },
    {
      "id": "company_b",
      "label": "Nile Ventures Ltd (25%)",
      "type": "company",
      "details": {
        "registration": "UG-REG-2020-094512",
        "incorporated": "Jun 2020",
        "ownership": "Sam Obongo 25%",
        "director": "Grace Obongo",
        "industry": "Real Estate",
        "annual_turnover": "UGX 640M"
      },
      "suspicious": false
    },

    /* ── Wife: Grace Obongo ───────────────────────────────────────── */
    {
      "id": "wife",
      "label": "Grace Obongo (Wife)",
      "type": "person",
      "details": {
        "relation": "Spouse",
        "occupation": "Business owner",
        "risk_level": "High"
      },
      "suspicious": false
    },
    {
      "id": "wife_stanbic",
      "label": "Stanbic Bank · UG1122334455",
      "type": "bank_account",
      "details": {
        "bank": "Stanbic Bank Uganda",
        "account": "UG1122334455",
        "currency": "UGX",
        "balance": "UGX 156,800,000",
        "opened": "Jun 2016",
        "account_type": "Personal",
        "holder": "Grace Obongo"
      },
      "suspicious": false
    },
    {
      "id": "wife_equity",
      "label": "Equity Bank · UG5566778899",
      "type": "bank_account",
      "details": {
        "bank": "Equity Bank Uganda",
        "account": "UG5566778899",
        "currency": "UGX",
        "balance": "UGX 89,300,000",
        "opened": "Feb 2021",
        "account_type": "Business",
        "holder": "Grace Obongo"
      },
      "suspicious": false
    },
    {
      "id": "wife_airtel",
      "label": "Airtel Money · +256702345678",
      "type": "mobile_money",
      "details": {
        "provider": "Airtel Uganda",
        "phone": "+256 702 345 678",
        "registered_name": "Grace Obongo",
        "account_age": "5 years",
        "monthly_avg_tx": "UGX 14.8M"
      },
      "suspicious": false
    },
    {
      "id": "wife_mtn",
      "label": "MTN MoMo · +256782345678",
      "type": "mobile_money",
      "details": {
        "provider": "MTN Uganda",
        "phone": "+256 782 345 678",
        "registered_name": "Grace Obongo",
        "account_age": "7 years",
        "monthly_avg_tx": "UGX 9.2M"
      },
      "suspicious": false
    },

    /* ── Father: Robert Obongo ───────────────────────────────────── */
    {
      "id": "father",
      "label": "Robert Obongo (Father)",
      "type": "person",
      "details": {
        "relation": "Father",
        "occupation": "Farmer / Company Director",
        "risk_level": "Low"
      },
      "suspicious": false
    },
    {
      "id": "father_centenary",
      "label": "Centenary Bank · UG9988112233",
      "type": "bank_account",
      "details": {
        "bank": "Centenary Bank Uganda",
        "account": "UG9988112233",
        "currency": "UGX",
        "balance": "UGX 43,600,000",
        "opened": "Mar 2010",
        "account_type": "Business",
        "holder": "Robert Obongo"
      },
      "suspicious": false
    },
    {
      "id": "father_postbank",
      "label": "Post Bank · UG3344556677",
      "type": "bank_account",
      "details": {
        "bank": "Post Bank Uganda",
        "account": "UG3344556677",
        "currency": "UGX",
        "balance": "UGX 18,200,000",
        "opened": "Jan 2008",
        "account_type": "Savings",
        "holder": "Robert Obongo"
      },
      "suspicious": false
    },
    {
      "id": "father_airtel",
      "label": "Airtel Money · +256703456789",
      "type": "mobile_money",
      "details": {
        "provider": "Airtel Uganda",
        "phone": "+256 703 456 789",
        "registered_name": "Robert Obongo",
        "account_age": "3 years",
        "monthly_avg_tx": "UGX 4.1M"
      },
      "suspicious": false
    },
    {
      "id": "father_mtn",
      "label": "MTN MoMo · +256783456789",
      "type": "mobile_money",
      "details": {
        "provider": "MTN Uganda",
        "phone": "+256 783 456 789",
        "registered_name": "Robert Obongo",
        "account_age": "5 years",
        "monthly_avg_tx": "UGX 6.7M"
      },
      "suspicious": false
    },
    {
      "id": "father_company",
      "label": "Obongo Farms Ltd (100%)",
      "type": "company",
      "details": {
        "registration": "UG-REG-2005-012344",
        "incorporated": "Apr 2005",
        "ownership": "Robert Obongo 100%",
        "director": "Robert Obongo",
        "industry": "Agriculture & Livestock",
        "annual_turnover": "UGX 280M"
      },
      "suspicious": false
    },

    /* ── Mother: Esther Obongo ───────────────────────────────────── */
    {
      "id": "mother",
      "label": "Esther Obongo (Mother)",
      "type": "person",
      "details": {
        "relation": "Mother",
        "occupation": "Retired",
        "risk_level": "Low"
      },
      "suspicious": false
    },
    {
      "id": "mother_centenary",
      "label": "Centenary Bank · UG7766554433",
      "type": "bank_account",
      "details": {
        "bank": "Centenary Bank Uganda",
        "account": "UG7766554433",
        "currency": "UGX",
        "balance": "UGX 22,400,000",
        "opened": "Sep 2012",
        "account_type": "Personal",
        "holder": "Esther Obongo"
      },
      "suspicious": false
    },
    {
      "id": "mother_dfcu",
      "label": "DFCU Bank · UG3322114455",
      "type": "bank_account",
      "details": {
        "bank": "DFCU Bank Uganda",
        "account": "UG3322114455",
        "currency": "UGX",
        "balance": "UGX 11,750,000",
        "opened": "Jul 2017",
        "account_type": "Savings",
        "holder": "Esther Obongo"
      },
      "suspicious": false
    },
    {
      "id": "mother_airtel",
      "label": "Airtel Money · +256704567890",
      "type": "mobile_money",
      "details": {
        "provider": "Airtel Uganda",
        "phone": "+256 704 567 890",
        "registered_name": "Esther Obongo",
        "account_age": "2 years",
        "monthly_avg_tx": "UGX 2.3M"
      },
      "suspicious": false
    },
    {
      "id": "mother_mtn",
      "label": "MTN MoMo · +256784567890",
      "type": "mobile_money",
      "details": {
        "provider": "MTN Uganda",
        "phone": "+256 784 567 890",
        "registered_name": "Esther Obongo",
        "account_age": "4 years",
        "monthly_avg_tx": "UGX 3.8M"
      },
      "suspicious": false
    }

  ],
  "edges": [

    /* ── Sam ↔ his accounts ──────────────────────────────────────── */
    { "id": "e_sam_stanbic",       "from": "sam",        "to": "stanbic",        "amountUGX": 45000000,  "label": "Salary credit",       "suspicious": false, "bidirectional": false },
    { "id": "e_stanbic_sam",       "from": "stanbic",    "to": "sam",            "amountUGX": 38000000,  "label": "Cash withdrawal",      "suspicious": false, "bidirectional": false },
    { "id": "e_sam_absa",          "from": "sam",        "to": "absa",           "amountUGX": 23400000,  "label": "Transfer",             "suspicious": false, "bidirectional": false },
    { "id": "e_sam_airtel",        "from": "sam",        "to": "airtel",         "amountUGX": 12500000,  "label": "Monthly top-up",       "suspicious": false, "bidirectional": false },
    { "id": "e_sam_mtn",           "from": "sam",        "to": "mtn",            "amountUGX": 8750000,   "label": "Outgoing transfers",   "suspicious": false, "bidirectional": false },

    /* ── Sam's suspicious crypto chain ──────────────────────────── */
    { "id": "e_stanbic_usdt",      "from": "stanbic",    "to": "usdt_wallet",    "amountUGX": 67000000,  "label": "Crypto purchase",      "suspicious": true,  "bidirectional": false },
    { "id": "e_usdt_binance",      "from": "usdt_wallet","to": "binance",        "amountUGX": 95000000,  "label": "USDT deposit",         "suspicious": true,  "bidirectional": false },
    { "id": "e_binance_wife",      "from": "binance",    "to": "wife",           "amountUGX": 42000000,  "label": "Crypto withdrawal",    "suspicious": true,  "bidirectional": false },

    /* ── Sam's companies ─────────────────────────────────────────── */
    { "id": "e_sam_company_a",     "from": "sam",        "to": "company_a",      "amountUGX": null,      "label": "100% beneficiary",     "suspicious": false, "bidirectional": false },
    { "id": "e_sam_company_b",     "from": "sam",        "to": "company_b",      "amountUGX": null,      "label": "25% shareholder",      "suspicious": false, "bidirectional": false },
    { "id": "e_company_a_stanbic", "from": "company_a",  "to": "stanbic",        "amountUGX": 34500000,  "label": "Business revenue",     "suspicious": false, "bidirectional": false },
    { "id": "e_company_b_absa",    "from": "company_b",  "to": "absa",           "amountUGX": 18750000,  "label": "Dividend payment",     "suspicious": false, "bidirectional": false },

    /* ── Sam ↔ wife (person-level) ───────────────────────────────── */
    { "id": "e_sam_wife",          "from": "sam",        "to": "wife",           "amountUGX": 15000000,  "label": "Family transfer",      "suspicious": false, "bidirectional": false },
    { "id": "e_wife_sam",          "from": "wife",       "to": "sam",            "amountUGX": 12000000,  "label": "Business income",      "suspicious": false, "bidirectional": false },

    /* ── Wife ↔ her accounts ─────────────────────────────────────── */
    { "id": "e_wife_wife_stanbic", "from": "wife",       "to": "wife_stanbic",   "amountUGX": 32000000,  "label": "Personal banking",     "suspicious": false, "bidirectional": false },
    { "id": "e_wife_wife_equity",  "from": "wife",       "to": "wife_equity",    "amountUGX": 28500000,  "label": "Business account",     "suspicious": false, "bidirectional": false },
    { "id": "e_wife_wife_airtel",  "from": "wife",       "to": "wife_airtel",    "amountUGX": 7200000,   "label": "Mobile top-up",        "suspicious": false, "bidirectional": false },
    { "id": "e_wife_wife_mtn",     "from": "wife",       "to": "wife_mtn",       "amountUGX": 4600000,   "label": "Mobile top-up",        "suspicious": false, "bidirectional": false },
    { "id": "e_wife_equity_compb", "from": "wife_equity","to": "company_b",      "amountUGX": 22000000,  "label": "Director payments",    "suspicious": false, "bidirectional": false },
    { "id": "e_wife_stanbic_sam",  "from": "wife_stanbic","to": "stanbic",       "amountUGX": 18400000,  "label": "Spousal transfer",     "suspicious": false, "bidirectional": false },

    /* ── Sam ↔ father (person-level) ────────────────────────────── */
    { "id": "e_father_sam",        "from": "father",     "to": "sam",            "amountUGX": 11000000,  "label": "Family support",       "suspicious": false, "bidirectional": false },

    /* ── Father ↔ his accounts & company ────────────────────────── */
    { "id": "e_father_fcompany",   "from": "father",     "to": "father_company", "amountUGX": null,      "label": "100% owner",           "suspicious": false, "bidirectional": false },
    { "id": "e_father_fcentenary", "from": "father",     "to": "father_centenary","amountUGX": 19500000, "label": "Main banking",         "suspicious": false, "bidirectional": false },
    { "id": "e_father_fpostbank",  "from": "father",     "to": "father_postbank","amountUGX": 6800000,   "label": "Savings deposit",      "suspicious": false, "bidirectional": false },
    { "id": "e_father_fairtel",    "from": "father",     "to": "father_airtel",  "amountUGX": 2100000,   "label": "Mobile top-up",        "suspicious": false, "bidirectional": false },
    { "id": "e_father_fmtn",       "from": "father",     "to": "father_mtn",     "amountUGX": 3400000,   "label": "Mobile top-up",        "suspicious": false, "bidirectional": false },
    { "id": "e_fcompany_fcentenary","from": "father_company","to": "father_centenary","amountUGX": 24000000,"label": "Farm revenue",       "suspicious": false, "bidirectional": false },
    { "id": "e_fcentenary_stanbic","from": "father_centenary","to": "stanbic",   "amountUGX": 11000000,  "label": "Family support",       "suspicious": false, "bidirectional": false },

    /* ── Sam ↔ mother (person-level) ────────────────────────────── */
    { "id": "e_mother_sam",        "from": "mother",     "to": "sam",            "amountUGX": 8000000,   "label": "Gift transfer",        "suspicious": false, "bidirectional": false },

    /* ── Mother ↔ her accounts ───────────────────────────────────── */
    { "id": "e_mother_mcentenary", "from": "mother",     "to": "mother_centenary","amountUGX": 14500000, "label": "Main banking",         "suspicious": false, "bidirectional": false },
    { "id": "e_mother_mdfcu",      "from": "mother",     "to": "mother_dfcu",    "amountUGX": 5200000,   "label": "Savings deposit",      "suspicious": false, "bidirectional": false },
    { "id": "e_mother_mairtel",    "from": "mother",     "to": "mother_airtel",  "amountUGX": 1800000,   "label": "Mobile top-up",        "suspicious": false, "bidirectional": false },
    { "id": "e_mother_mmtn",       "from": "mother",     "to": "mother_mtn",     "amountUGX": 2400000,   "label": "Mobile top-up",        "suspicious": false, "bidirectional": false },
    { "id": "e_mcentenary_stanbic","from": "mother_centenary","to": "stanbic",   "amountUGX": 8000000,   "label": "Gift to son",          "suspicious": false, "bidirectional": false }

  ]
};
