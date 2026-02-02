import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DreamTeller - AI 꿈해몽',
  description: 'AI가 분석하는 당신의 꿈 이야기. 무료로 꿈의 의미를 알아보세요.',
  keywords: ['꿈해몽', '꿈풀이', 'AI', '꿈 해석', 'dream interpretation'],
  openGraph: {
    title: 'DreamTeller - AI 꿈해몽',
    description: 'AI가 분석하는 당신의 꿈 이야기',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        <div className="stars fixed inset-0 pointer-events-none" />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
