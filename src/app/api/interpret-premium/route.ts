import { NextRequest, NextResponse } from 'next/server'
import { openai, PREMIUM_PROMPT } from '@/lib/openai'

export async function POST(req: NextRequest) {
  try {
    const { dream, paymentVerified } = await req.json()

    // 결제 검증 (나중에 Stripe webhook으로 대체)
    if (!paymentVerified) {
      return NextResponse.json(
        { error: '프리미엄 서비스 결제가 필요합니다.' },
        { status: 402 }
      )
    }

    if (!dream || dream.trim().length < 5) {
      return NextResponse.json(
        { error: '꿈 내용을 더 자세히 적어주세요.' },
        { status: 400 }
      )
    }

    if (dream.length > 2000) {
      return NextResponse.json(
        { error: '꿈 내용은 2000자 이내로 작성해주세요.' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: PREMIUM_PROMPT },
        {
          role: 'user',
          content: `다음 꿈을 최대한 상세하고 깊이 있게 해몽해주세요:\n\n${dream}`
        },
      ],
      max_tokens: 1500,
      temperature: 0.85,
    })

    const interpretation = completion.choices[0]?.message?.content || '해몽 결과를 생성하지 못했습니다.'

    return NextResponse.json({
      interpretation,
      tier: 'premium',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('OpenAI Premium Error:', error)
    return NextResponse.json(
      { error: '프리미엄 해몽 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
