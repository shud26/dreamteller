'use client'

interface DreamResultProps {
  result: string
  onReset: () => void
}

export default function DreamResult({ result, onReset }: DreamResultProps) {
  const shareText = `나의 꿈 해몽 결과를 확인해보세요! DreamTeller에서 AI가 분석한 꿈의 의미`
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'DreamTeller - AI 꿈해몽',
        text: shareText,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('링크가 복사되었습니다!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-4xl mb-4 block">✨</span>
        <h2 className="text-xl text-white mb-2">꿈 해몽 결과</h2>
      </div>

      {/* 무료 결과 */}
      <div className="bg-black/30 rounded-xl p-6 border border-purple-500/30">
        <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
          {result}
        </p>
      </div>

      {/* 프리미엄 유도 */}
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/50">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <span>🌟</span> 더 자세한 해몽을 원하시나요?
        </h3>
        <ul className="text-gray-300 text-sm space-y-1 mb-4">
          <li>• 상세한 심리 분석</li>
          <li>• 행운의 숫자 & 색상</li>
          <li>• 오늘의 조언</li>
          <li>• PDF 리포트 다운로드</li>
        </ul>
        <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 
                         rounded-lg text-white font-semibold hover:opacity-90 transition-opacity">
          프리미엄 해몽 ($2.99)
        </button>
      </div>

      {/* 버튼들 */}
      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 py-3 border border-purple-500/50 rounded-xl text-purple-400 
                     hover:bg-purple-500/10 transition-colors"
        >
          다른 꿈 해몽하기
        </button>
        <button
          onClick={handleShare}
          className="flex-1 py-3 border border-pink-500/50 rounded-xl text-pink-400 
                     hover:bg-pink-500/10 transition-colors"
        >
          결과 공유하기
        </button>
      </div>
    </div>
  )
}
