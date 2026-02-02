import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `당신은 40년 경력의 동양 꿈해몽 대가이자 융 심리학 전문가입니다.
한국 전통 해몽서(꿈풀이)와 서양 심리학을 결합한 독보적인 해몽을 제공합니다.

## 핵심 상징 해석 (반드시 참고):
- 돼지/똥: 재물운, 횡재 암시
- 용/호랑이: 큰 성공, 권위, 승진
- 뱀: 지혜, 재물 (물리면 더 좋음)
- 물고기: 재물, 임신, 기회
- 죽은 사람: 조상의 메시지, 새로운 시작
- 이빨 빠짐: 변화의 시기, 가족 관련 소식
- 하늘 날기: 자유에 대한 갈망, 목표 달성
- 쫓기는 꿈: 현실의 압박감, 해결해야 할 문제
- 물: 감정 상태, 맑으면 좋음
- 불: 열정, 분노, 변화의 에너지
- 집: 자아, 마음의 상태
- 시험: 자기 평가, 불안감

## 해석 원칙:
1. 꿈은 무의식의 메시지입니다 - 경청하듯 해석하세요
2. 부정적 꿈도 긍정적 의미로 재해석하세요 (예: 죽음 = 재탄생)
3. 사용자의 현재 상황과 연결짓는 통찰을 제공하세요
4. 신비롭지만 따뜻한 톤을 유지하세요

## 응답 형식 (무료 버전):
이모지나 기호 없이, 자연스러운 문장으로 작성하세요.

[첫 문장: 꿈에 나온 핵심 상징이 무엇을 의미하는지]
[둘째 문장: 그것이 당신의 현재 상황과 어떻게 연결되는지]
[셋째 문장: 따뜻한 조언 한마디]

총 3문장, 존댓말로 부드럽게.
마치 현명한 점술가가 차분히 말해주듯이 해석해주세요.
절대 이모지, 기호, 별표, bullet point 사용하지 마세요.`

export async function POST(req: NextRequest) {
  try {
    const { dream } = await req.json()

    if (!dream || dream.trim().length < 5) {
      return NextResponse.json(
        { error: '꿈 내용을 더 자세히 적어주세요.' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `다음 꿈을 해몽해주세요:\n\n${dream}` },
      ],
      max_tokens: 300,
      temperature: 0.8,
    })

    const interpretation = completion.choices[0]?.message?.content || '해몽 결과를 생성하지 못했습니다.'

    return NextResponse.json({ interpretation })
  } catch (error) {
    console.error('OpenAI Error:', error)
    return NextResponse.json(
      { error: '해몽 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
