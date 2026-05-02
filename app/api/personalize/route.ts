import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a senior commercial real estate pitch specialist for West Edmonton Mall (WEM), North America's largest mall with 32M annual visitors, 5.3M sq ft, 800+ stores, and 20+ world-class attractions.
Given a brand name, category, and goal — write a personalized 4-part pitch.
Return ONLY valid JSON, no markdown:
{ "hook", "opportunity", "pitch", "cta" }
hook: one powerful sentence (15–20 words) creating an I-need-to-be-here moment
opportunity: 2–3 sentences with WEM stats specific to this brand/category
pitch: 2–3 sentences on strategic fit between this brand, category, goal and WEM
cta: one confident next-step sentence`;

function fallback(brand: string, category: string, goal: string) {
  return {
    hook: `${brand} belongs at the centre of North America's most visited commercial destination.`,
    opportunity: `West Edmonton Mall draws 32 million annual visitors across 5.3 million square feet of premium retail, dining, and entertainment. With 100,000+ daily visitors and an average dwell time of 3.2 hours, WEM delivers sustained brand exposure no other Canadian venue can match.`,
    pitch: `For a ${category} brand pursuing ${goal}, WEM is the definitive launchpad. The mall's audience skews 38% millennial with above-average household incomes — precisely the demographic ${brand} needs. Whether through a flagship lease, pop-up, or sponsored activation, a presence here signals immediate category leadership.`,
    cta: `Contact our partnerships team this week and let's design your WEM presence.`,
  };
}

export async function POST(req: NextRequest) {
  const { brand, category, goal } = await req.json();

  if (!brand) {
    return NextResponse.json({ error: 'brand is required' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Graceful fallback if no key configured
  if (!apiKey) {
    return NextResponse.json(fallback(brand, category, goal));
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `Brand: ${brand}\nCategory: ${category}\nGoal: ${goal}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`Anthropic API error ${response.status}:`, err);
      return NextResponse.json(fallback(brand, category, goal));
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '{}';

    // Strip any accidental markdown fences
    const cleaned = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('Personalize API error:', err);
    return NextResponse.json(fallback(brand, category, goal));
  }
}
