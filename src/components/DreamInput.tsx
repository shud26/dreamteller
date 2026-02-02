'use client'

interface DreamInputProps {
  dream: string
  setDream: (dream: string) => void
  onSubmit: () => void
  loading: boolean
}

export default function DreamInput({ dream, setDream, onSubmit, loading }: DreamInputProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-4xl mb-4 block">🔮</span>
        <h2 className="text-xl text-white mb-2">어떤 꿈을 꾸셨나요?</h2>
        <p className="text-gray-400 text-sm">
          꿈의 내용을 자세히 적어주세요
        </p>
      </div>

      <textarea
        value={dream}
        onChange={(e) => setDream(e.target.value)}
        placeholder="예: 하늘을 나는 꿈을 꿨어요. 구름 위를 자유롭게 날아다니다가..."
        className="w-full h-40 bg-black/30 border border-purple-500/30 rounded-xl p-4 
                   text-white placeholder-gray-500 resize-none focus:outline-none 
                   focus:border-purple-500 transition-colors"
        disabled={loading}
      />

      <button
        onClick={onSubmit}
        disabled={loading || !dream.trim()}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 
                   rounded-xl text-white font-semibold text-lg
                   glow-button disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:hover:transform-none"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            꿈을 해석하고 있어요...
          </span>
        ) : (
          '꿈 해몽하기'
        )}
      </button>

      <div className="flex justify-center gap-4 text-sm text-gray-500">
        <span>무료 해몽</span>
        <span>|</span>
        <span>AI 분석</span>
        <span>|</span>
        <span>즉시 결과</span>
      </div>
    </div>
  )
}
