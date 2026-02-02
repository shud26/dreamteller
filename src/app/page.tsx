'use client'

import { useState } from 'react'
import DreamInput from '@/components/DreamInput'
import DreamResult from '@/components/DreamResult'

export default function Home() {
  const [dream, setDream] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!dream.trim()) return
    
    setLoading(true)
    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dream }),
      })
      const data = await res.json()
      setResult(data.interpretation)
    } catch (error) {
      console.error('Error:', error)
      setResult('해몽 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* 헤더 */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
          DreamTeller
        </h1>
        <p className="text-gray-400 text-lg">
          AI가 분석하는 당신의 꿈 이야기
        </p>
      </div>

      {/* 메인 카드 */}
      <div className="w-full max-w-2xl card-glow rounded-2xl p-8">
        {!result ? (
          <DreamInput 
            dream={dream}
            setDream={setDream}
            onSubmit={handleSubmit}
            loading={loading}
          />
        ) : (
          <DreamResult 
            result={result}
            onReset={() => {
              setResult(null)
              setDream('')
            }}
          />
        )}
      </div>

      {/* 푸터 */}
      <footer className="mt-12 text-gray-500 text-sm">
        <p>Powered by AI | Made by shud</p>
      </footer>
    </div>
  )
}
