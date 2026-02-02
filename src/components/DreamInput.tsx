'use client'

interface DreamInputProps {
  dream: string
  setDream: (dream: string) => void
  onSubmit: () => void
  loading: boolean
}

export default function DreamInput({ dream, setDream, onSubmit, loading }: DreamInputProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-purple-400 text-sm tracking-widest mb-2">DREAM INTERPRETATION</p>
        <h2 className="text-2xl text-white font-light">어젯밤 무슨 꿈을 꾸셨나요?</h2>
      </div>

      <textarea
        value={dream}
        onChange={(e) => setDream(e.target.value)}
        placeholder="꿈의 내용을 자유롭게 적어주세요..."
        className="w-full h-44 bg-black/20 border border-white/10 rounded-2xl p-5
                   text-white placeholder-gray-500 resize-none focus:outline-none
                   focus:border-purple-500/50 transition-colors text-lg leading-relaxed"
        disabled={loading}
      />

      <button
        onClick={onSubmit}
        disabled={loading || !dream.trim()}
        className="w-full py-4 bg-white text-black font-medium text-lg
                   rounded-xl hover:bg-gray-100 transition-colors
                   disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            해석 중...
          </span>
        ) : (
          '해몽하기'
        )}
      </button>

      <p className="text-center text-gray-500 text-sm">
        무료 · AI 분석 · 3초 안에 결과
      </p>
    </div>
  )
}
