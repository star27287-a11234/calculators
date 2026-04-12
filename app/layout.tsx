import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

const GA_ID = 'G-XXXXXXXXXX'         // TODO: 실제 GA ID로 교체
const ADSENSE_ID = 'ca-pub-1867480436223927'

export const metadata: Metadata = {
  metadataBase: new URL('https://cheongyak-calc.vercel.app'),
  other: {
    'google-adsense-account': ADSENSE_ID,
  },
  title: {
    default: '청약 가점 계산기 | 당첨 커트라인 · DSR · 자격 확인',
    template: '%s | 청약계산기.com',
  },
  description: '2026년 최신 기준 청약 가점 계산기. 당첨 커트라인 조회, 청약 자격 확인, DSR 계산까지 무료로 이용하세요.',
  keywords: ['청약 가점 계산기', '청약 당첨 커트라인', 'DSR 계산기', '청약 자격 확인', '청약통장 가점', '무주택 기간 계산'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '청약계산기',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

const NAV = [
  { href: '/calculators/score', label: '가점 계산기' },
  { href: '/calculators/cutline', label: '커트라인 조회' },
  { href: '/guides', label: '가이드' },
  { href: '/blog', label: '블로그' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.className}>
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer=window.dataLayer||[];
          function gtag(){dataLayer.push(arguments);}
          gtag('js',new Date());gtag('config','${GA_ID}');
        ` }} />
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`} crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* 헤더 */}
        <header className="sticky top-0 z-50 bg-white" style={{ borderBottom: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <span className="text-white text-xs font-black px-2 py-1 rounded-md" style={{ background: 'var(--primary)', letterSpacing: '-0.01em' }}>청약</span>
              <span className="font-bold text-base hidden sm:block" style={{ color: 'var(--text)' }}>계산기</span>
            </Link>

            <nav className="flex items-center gap-1 flex-1 justify-center">
              {NAV.map(({ href, label }) => (
                <Link key={href} href={href}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[#f1f3f4]"
                  style={{ color: 'var(--text-sub)' }}>
                  {label}
                </Link>
              ))}
            </nav>

            <Link href="/calculators/score"
              className="flex-shrink-0 text-sm font-bold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
              style={{ background: 'var(--primary)' }}>
              가점 계산
            </Link>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* 푸터 */}
        <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-sub)', padding: '40px 20px 32px' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-white text-xs font-black px-2 py-1 rounded-md" style={{ background: 'var(--primary)' }}>청약</span>
                  <span className="font-bold text-sm" style={{ color: 'var(--text)' }}>계산기</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  국토교통부 기준 · 참고용 계산기 · 최종 청약 결과는 청약홈(apply.lh.or.kr)에서 확인하세요
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--text-sub)' }}>
                {[
                  { href: '/calculators/score', label: '가점 계산기' },
                  { href: '/calculators/cutline', label: '커트라인 조회' },
                  { href: '/guides', label: '가이드' },
                  { href: '/blog', label: '블로그' },
                  { href: '/about', label: '소개' },
                  { href: '/privacy', label: '개인정보처리방침' },
                  { href: '/terms', label: '이용약관' },
                ].map(({ href, label }) => (
                  <Link key={href} href={href} className="hover:text-[#1a73e8] transition-colors">{label}</Link>
                ))}
              </div>
            </div>
            <p className="text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
              © 2026 청약계산기. 본 사이트의 계산 결과는 참고용이며 실제 청약 당첨과 차이가 있을 수 있습니다.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
