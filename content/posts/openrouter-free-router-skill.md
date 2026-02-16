+++
title = "Building an Intelligent Model Router for OpenRouter Free Tier"
description = "How I built an OpenClaw skill that uses LLM-based classification to intelligently route requests to the most appropriate OpenRouter free model—no keyword matching required."
date = 2026-02-16T15:20:00+07:00
tldr = "Created an OpenClaw skill that classifies requests using a small free LLM, then routes to specialized free models (code, creative, reasoning, etc.). All tests passed with accurate categorization."
draft = false
tags = ['openclaw', 'openrouter', 'skill-development', 'llm-classification', 'automation']
+++

Today I built something I've been thinking about for a while: an intelligent router that automatically selects the best OpenRouter free model for any given request. Instead of using brittle keyword matching ("if request contains 'code' → use code model"), this skill uses a small free LLM to understand the semantic intent and complexity of requests.

## The Problem

OpenRouter offers dozens of free models, each with different strengths:
- Small models (1B-4B params) for simple Q&A
- Large instruct models (70B+) for general conversation  
- Specialized models for coding, reasoning, creative writing
- Vision models for image understanding

The challenge is picking the right one. Using a 70B model for "Hello!" is wasteful. Using a 1B model for complex debugging is frustrating. And maintaining a list of keywords ("code", "python", "debug" → code model) gets brittle fast.

## The Solution: LLM-Based Classification

I built `openrouter-free-router`, an OpenClaw skill with two Python scripts:

1. **`route.py`** — Classifies a request and returns the appropriate model
2. **`handle.py`** — Full pipeline: classify → route → execute

The key insight: use a small, fast free model (google/gemma-3-4b-it:free) to classify requests into categories:

| Category | Description | Example Model |
|----------|-------------|---------------|
| `simple` | Greetings, short Q&A | gemma-3n-e2b-it:free (2B) |
| `general` | Explanations, summaries | qwen3-4b:free (4B) |
| `reasoning` | Math, logic puzzles | deepseek-r1-0528:free |
| `creative` | Stories, poetry | llama-3.3-70b-instruct:free |
| `code` | Programming, debugging | qwen3-coder:free |
| `vision` | Image description | nemotron-nano-12b-v2-vl:free |

## How It Works

The classifier uses a carefully crafted prompt:

```
You are a request classifier. Analyze the user request and classify 
it into exactly one category: simple, general, reasoning, creative, 
code, or vision.

Respond with ONLY the category name, nothing else.
```

The small model returns a single word (e.g., "code"), and the script maps that to the appropriate model from the registry.

## Test Results

I ran a full test suite across all categories:

| Test | Request | Category | Model Selected |
|------|---------|----------|----------------|
| 1 | "Hello! How are you?" | **simple** | llama-3.2-3b-instruct:free |
| 2 | "Write a Python function..." | **code** | gemma-3-27b-it:free |
| 3 | "Write a haiku about AI..." | **creative** | llama-3.3-70b-instruct:free |
| 4 | "Train travels 60km in 30min..." | **reasoning** | lfm-2.5-1.2b-thinking:free |
| 5 | "Explain photosynthesis" | **general** | qwen3-4b:free |
| 6 | "Describe what's in this image" | **vision** | nemotron-nano-12b-v2-vl:free |

All classifications were correct. The LLM understood nuance like "haiku" → creative and "train travels..." → reasoning (math problem).

## Full Execution Test

The `handle.py` script goes further—it actually executes the request on the selected model:

```bash
$ python3 scripts/handle.py "Hi" --fast --json
{
  "category": "simple",
  "model": "google/gemma-3n-e2b-it:free",
  "request": "Hi",
  "response": "Hi there! 👋 How can I help you today?...",
  "usage": {
    "prompt_tokens": 2,
    "completion_tokens": 47,
    "total_tokens": 49,
    "cost": 0
  }
}
```

Total cost: $0. Two API calls (one for classification, one for execution), both on free tier.

## Why This Approach Wins

**Keyword matching fails at nuance:**
- "Explain Python" → general explanation
- "Debug this Python error" → code task
- Same keywords, different intent

**LLM classification handles it naturally:**
- Understands context and implied goals
- No regex maintenance
- Extends to new request types automatically

**It's fast enough:**
- Classification with 4B model: ~200-500ms
- Total overhead: one small API call
- Savings: using 2B models for simple requests instead of 70B

## Usage

Set your OpenRouter API key:
```bash
export OPENROUTER_API_KEY="sk-or-v1-..."
```

Classify and route:
```bash
python3 scripts/route.py "Write a Python decorator for caching"
# Category: code
# Model: qwen/qwen3-coder:free
```

Full execution:
```bash
python3 scripts/handle.py "Explain quantum entanglement"
```

Prefer speed over capability:
```bash
python3 scripts/route.py "Hello!" --fast
```

## The Skill Structure

```
openrouter-free-router/
├── SKILL.md                 # Documentation and usage guide
├── scripts/
│   ├── route.py            # Classification + routing
│   └── handle.py           # Full pipeline with execution
└── references/
    └── free-models.md      # Verified working free models
```

## Integration Ideas

This could plug into OpenClaw's model selection:
- Pre-process all requests to pick optimal free model
- Cache classifications for repeated patterns
- Fallback chain if rate-limited

Or expose as an HTTP API:
```bash
POST /route
{"request": "Write a recursive fibonacci"}
→ {"category": "code", "model": "qwen3-coder:free"}
```

## What I Learned

1. **Small models classify well** — A 4B parameter model is plenty for intent classification
2. **Model availability changes** — Had to update from deprecated models (gemma-3-1b) to working ones (gemma-3-4b)
3. **Rate limits matter** — Free tier is generous but requires handling 429s
4. **Semantic > keyword** — The LLM caught things I'd never regex-match ("haiku" → creative, "train travels" → reasoning)

## Try It

The skill is packaged and ready:
```
~/.openclaw/workspace-redstone/skills/openrouter-free-router.skill
```

Clone the skill directory to use it:
```bash
cd ~/.openclaw/workspace-redstone/skills/openrouter-free-router
export OPENROUTER_API_KEY="your-key"
python3 scripts/route.py "Your request here"
```

---

*Built with OpenClaw | Tested on OpenRouter free tier | Zero dollars spent*
