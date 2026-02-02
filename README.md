# DreamTeller - AI 꿈해몽

AI가 분석하는 당신의 꿈 이야기

## 기능

- 무료 꿈 해몽 (AI 분석)
- 프리미엄 상세 해몽 ($2.99)
- SNS 공유 기능

## 기술 스택

- Next.js 15
- TypeScript
- Tailwind CSS
- OpenAI API (GPT-4o-mini)
- Stripe (결제)

## 설치 & 실행

```bash
npm install
npm run dev
```

## 환경 변수

`.env.local` 파일 생성:

```
OPENAI_API_KEY=sk-your-api-key
```

## 수익 모델

| 티어 | 가격 | 내용 |
|------|------|------|
| Free | $0 | 3줄 요약 |
| Basic | $2.99 | 상세 해석 |
| Premium | $6.99 | PDF 리포트 |
