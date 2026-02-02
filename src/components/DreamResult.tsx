'use client'

import { useState } from 'react'

interface DreamResultProps {
  result: string
  dream: string
  onReset: () => void
}

export default function DreamResult({ result, dream, onReset }: DreamResultProps) {
  const [premiumResult, setPremiumResult] = useState<string | null>(null)
  const [premiumLoading, setPremiumLoading] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'DreamTeller - AI 꿈해몽',
        text: '나의 꿈 해몽 결과를 확인해보세요!',
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('링크가 복사되었습니다!')
    }
  }

  const handlePremium = async () => {
    setPremiumLoading(true)
    try {
      const res = await fetch('/api/interpret-premium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dream, paymentVerified: true }), // 테스트용
      })
      const data = await res.json()
      setPremiumResult(data.interpretation)
    } catch (error) {
      console.error('Premium Error:', error)
      alert('프리미엄 해몽 중 오류가 발생했습니다.')
    } finally {
      setPremiumLoading(false)
    }
  }

  // 프리미엄 결과 보여주기
  if (premiumResult) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-yellow-400 text-sm tracking-widest mb-2">PREMIUM REPORT</p>
          <h2 className="text-2xl text-white font-light">프리미엄 꿈 해석</h2>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-2xl" />
          <div className="relative bg-black/20 rounded-2xl p-8 border border-yellow-500/30">
            <div className="text-gray-200 leading-loose whitespace-pre-wrap prose prose-invert max-w-none">
              {premiumResult}
            </div>
          </div>
        </div>

        <button
          onClick={onReset}
          className="w-full py-4 rounded-xl text-white/70 border border-white/20
                     hover:bg-white/5 transition-colors"
        >
          새로운 꿈 해몽하기
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* 결과 헤더 */}
      <div className="text-center">
        <p className="text-purple-400 text-sm tracking-widest mb-2">INTERPRETATION</p>
        <h2 className="text-2xl text-white font-light">당신의 꿈이 말하는 것</h2>
      </div>

      {/* 무료 결과 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-2xl" />
        <div className="relative bg-black/20 rounded-2xl p-8 border border-white/10">
          <p className="text-gray-200 text-lg leading-loose whitespace-pre-wrap">
            {result}
          </p>
        </div>
      </div>

      {/* 프리미엄 유도 */}
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <p className="text-white font-medium mb-3">더 깊은 해석이 궁금하신가요?</p>
        <p className="text-gray-400 text-sm mb-5 leading-relaxed">
          심리 분석, 행운의 숫자, 오늘의 조언까지<br/>
          프리미엄 리포트로 확인하세요.
        </p>
        <button
          onClick={handlePremium}
          disabled={premiumLoading}
          className="w-full py-4 bg-white text-black font-medium
                     rounded-xl hover:bg-gray-100 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {premiumLoading ? '해석 중...' : '프리미엄 해몽 받기 — 테스트'}
        </button>
      </div>

      {/* 버튼들 */}
      <div className="flex gap-3">
        <button
          onClick={onReset}
          className="flex-1 py-4 rounded-xl text-white/70 border border-white/20
                     hover:bg-white/5 transition-colors"
        >
          다시 해몽하기
        </button>
        <button
          onClick={handleShare}
          className="flex-1 py-4 rounded-xl text-white/70 border border-white/20
                     hover:bg-white/5 transition-colors"
        >
          공유하기
        </button>
      </div>
    </div>
  )
}
