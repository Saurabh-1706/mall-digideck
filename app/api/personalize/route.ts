import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { brand, category, goal } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;

  // Fallback copy if no API key
  if (!apiKey) {
    return NextResponse.json({
      hook: `${brand} belongs at the centre of North America's most powerful commercial platform.`,
      opportunity: `West Edmonton Mall draws 30 million visitors annually across 5.3 million square feet of premium retail, dining, and entertainment space. With 100,000+ daily foot traffic and a captured audience that spends an average of 3.2 hours per visit, WEM delivers unmatched brand exposure. As ${brand} targets growth in Canada's most dynamic retail market, WEM offers the scale, demographic reach, and cultural cachet no other venue can match.`,
      pitch: `For a ${category} brand with a goal to ${goal}, WEM represents the ultimate launchpad. The mall's visitor base skews 38% millennial with above-average household incomes — precisely the audience ${brand} needs to convert. Whether through a flagship lease, a high-visibility pop-up, or a sponsored activation inside one of 20+ world-class attractions, ${brand}'s presence here sends an immediate signal of category leadership.`,
      cta: `Let's build the business case together. Contact our partnerships team this week.`,
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 800,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: `You are a senior commercial real estate pitch specialist for West Edmonton Mall — North America's largest mall with 5.3M sq ft, 30M+ annual visitors, 800+ stores, and 20+ world-class attractions.
Given brand name, category, and goal — write a hyper-personalized, compelling 4-part pitch.
Return ONLY valid JSON with these keys:
- hook: single powerful sentence creating an "I-need-to-be-here" moment (make it feel personal to the brand)
- opportunity: 2-3 sentences with concrete WEM stats woven in naturally
- pitch: 2-3 sentences on the strategic fit between this brand, category, goal and WEM
- cta: one confident, urgent call-to-action sentence`,
          },
          {
            role: 'user',
            content: `Brand: ${brand}\nCategory: ${category}\nGoal: ${goal}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenAI API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || '{}';
    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error('Personalize API error:', err);
    // Graceful fallback
    return NextResponse.json({
      hook: `${brand} belongs at the centre of North America's most powerful commercial platform.`,
      opportunity: `West Edmonton Mall draws 30 million visitors annually across 5.3 million square feet. With 100,000+ daily visitors and an average dwell time of 3.2 hours, WEM delivers the kind of sustained brand exposure that transforms awareness into action. This is where ${brand}'s next chapter begins.`,
      pitch: `A ${category} brand pursuing ${goal} couldn't find a more strategically aligned home. WEM's audience skews 38% millennial, high-income, and actively seeking premium experiences — a perfect match for ${brand}'s positioning. The property's media reach of 50M+ annually turns every activation into a national moment.`,
      cta: `Contact our partnerships team today and let's design your WEM presence.`,
    });
  }
}
