import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { dream } = await req.json()

    const response = await fetch('https://api.polar.sh/v1/checkouts/custom/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.POLAR_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: process.env.POLAR_PRODUCT_ID,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://dreamteller26.com'}/success?dream=${encodeURIComponent(dream)}`,
        metadata: {
          dream: dream.substring(0, 500), // 꿈 내용 저장 (500자 제한)
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Polar Error:', error)
      return NextResponse.json({ error: 'Checkout 생성 실패' }, { status: 500 })
    }

    const checkout = await response.json()

    return NextResponse.json({
      checkoutUrl: checkout.url
    })
  } catch (error) {
    console.error('Checkout Error:', error)
    return NextResponse.json({ error: '결제 처리 중 오류' }, { status: 500 })
  }
}
