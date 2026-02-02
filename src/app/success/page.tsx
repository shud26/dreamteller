'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const dream = searchParams.get('dream') || ''
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (dream) {
      fetchPremiumInterpretation()
    }
  }, [dream])

  const fetchPremiumInterpretation = async () => {
    try {
      const res = await fetch('/api/interpret-premium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dream, paymentVerified: true }),
      })
      const data = await res.json()
      setResult(data.interpretation)
    } catch (error) {
      console.error('Error:', error)
      setResult('해몽 결과를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-6" />
          <h1 className="text-2xl text-white font-light mb-2">결제 완료!</h1>
          <p className="text-gray-400">프리미엄 해몽을 준비하고 있어요...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <p className="text-yellow-400 text-sm tracking-widest mb-2">PREMIUM REPORT</p>
          <h1 className="text-3xl text-white font-light">프리미엄 꿈 해석</h1>
        </div>

        {/* 결과 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-2xl" />
            <div className="relative bg-black/20 rounded-2xl p-8 border border-yellow-500/30">
              <div className="text-gray-200 leading-loose whitespace-pre-wrap">
                {result}
              </div>
            </div>
          </div>

          <a
            href="/"
            className="block w-full mt-8 py-4 text-center rounded-xl text-white/70 border border-white/20 hover:bg-white/5 transition-colors"
          >
            새로운 꿈 해몽하기
          </a>
        </div>

        {/* 푸터 */}
        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>Made by shud</p>
        </footer>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
