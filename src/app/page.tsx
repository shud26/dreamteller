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
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* 헤더 */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-tight mb-3">
          Dream<span className="text-purple-400">Teller</span>
        </h1>
        <p className="text-gray-500">
          AI가 읽어주는 꿈의 의미
        </p>
      </div>

      {/* 메인 카드 */}
      <div className="w-full max-w-xl">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
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
              dream={dream}
              onReset={() => {
                setResult(null)
                setDream('')
              }}
            />
          )}
        </div>
      </div>

      {/* 푸터 */}
      <footer className="mt-16 text-gray-600 text-sm">
        <p>Made by shud</p>
      </footer>
    </div>
  )
}
