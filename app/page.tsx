import Link from 'next/link'
import { getAllPosts } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '청약 가점 계산기 · 당첨 커트라인 · DSR 계산 | 청약계산기',
  description: '2026년 국토교통부 기준 청약 가점 계산기. 무주택기간·부양가족·통장기간 자동 계산. 지역별 당첨 커트라인 조회, DSR 계산기, 청약 자격 확인까지 무료.',
  openGraph: {
    title: '청약 계산기 — 가점·커트라인·DSR 한번에',
    description: '청약 당첨에 필요한 모든 계산을 무료로',
    url: 'https://cheongyak-calc.vercel.app',
  },
}

const TOOLS = [
  {
    href: '/calculators/score',
    icon: '🏆',
    label: '청약 가점 계산기',
    desc: '무주택기간·부양가족·통장기간 입력으로 가점 즉시 계산',
    badge: '가장 많이 사용',
    badgeType: 'blue',
  },
  {
    href: '/calculators/cutline',
    icon: '📊',
    label: '당첨 커트라인 조회',
    desc: '지역·평형별 최근 2년 실제 당첨 커트라인 데이터',
    badge: '실데이터',
    badgeType: 'green',
  },
  {
    href: '/calculators/eligibility',
    icon: '✅',
    label: '청약 자격 확인기',
    desc: '일반공급·특별공급 자격을 체크리스트로 간단히 확인',
    badge: null,
    badgeType: null,
  },
  {
    href: '/calculators/savings',
    icon: '📅',
    label: '통장 납입 시뮬레이션',
    desc: '청약통장 가입일 기준 현재 가점과 만점까지 남은 기간',
    badge: null,
    badgeType: null,
  },
  {
    href: '/calculators/dsr',
    icon: '🏦',
    label: 'DSR 계산기',
    desc: '연소득 대비 최대 대출 가능 금액을 DSR 40% 기준으로 계산',
    badge: null,
    badgeType: null,
  },
]

export default async function HomePage() {
  const guides = getAllPosts('guides').slice(0, 3)
  const blogs = getAllPosts('blog').slice(0, 4)

  return (
    <>
      {/* 히어로 */}
      <section style={{ background: 'linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)' }}>
        <div className="max-w-6xl mx-auto px-5 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5">
              2026년 최신 기준 반영
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              청약 당첨을 위한<br />모든 계산, 한곳에서
            </h1>
            <p className="text-white/80 text-lg mb-8">
              가점 계산부터 당첨 커트라인 조회, 자격 확인, DSR 계산까지.<br className="hidden sm:block" />
              국토교통부 공식 기준으로 정확하게 계산합니다.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/calculators/score"
                className="inline-flex items-center gap-2 bg-white text-[#1a73e8] font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5">
                가점 계산하기 →
              </Link>
              <Link href="/calculators/cutline"
                className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-all border border-white/30">
                커트라인 조회
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 도구 그리드 */}
      <section className="max-w-6xl mx-auto px-5 py-14">
        <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--text)' }}>청약 도구 모음</h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-sub)' }}>공공데이터와 정부 정책 기반 — 광고 없이 무료 이용</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map(tool => (
            <Link key={tool.href} href={tool.href}
              className="group flex flex-col p-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{tool.icon}</span>
                {tool.badge && (
                  <span className={tool.badgeType === 'blue' ? 'badge-blue' : 'badge-green'} style={{ fontSize: '0.7rem' }}>
                    {tool.badge}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold mb-1.5 group-hover:text-[#1a73e8] transition-colors" style={{ color: 'var(--text)' }}>
                {tool.label}
              </h3>
              <p className="text-sm flex-1" style={{ color: 'var(--text-sub)' }}>{tool.desc}</p>
              <div className="mt-4 text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                계산하기 →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 청약 가이드 */}
      {guides.length > 0 && (
        <section style={{ background: 'var(--bg-sub)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-6xl mx-auto px-5 py-14">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black" style={{ color: 'var(--text)' }}>청약 가이드</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--text-sub)' }}>정부 정책 기반 팩트로만 작성한 청약 완벽 가이드</p>
              </div>
              <Link href="/guides" className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>전체 보기 →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {guides.map(guide => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`}
                  className="p-5 rounded-xl bg-white hover:-translate-y-0.5 transition-all"
                  style={{ border: '1px solid var(--border)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div className="badge-blue mb-3" style={{ fontSize: '0.72rem' }}>{guide.category}</div>
                  <h3 className="text-sm font-bold leading-snug mb-2" style={{ color: 'var(--text)' }}>{guide.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-sub)' }}>{guide.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 최신 블로그 */}
      {blogs.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 py-14">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black" style={{ color: 'var(--text)' }}>최신 글</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-sub)' }}>청약 실전 정보와 분석</p>
            </div>
            <Link href="/blog" className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>전체 보기 →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {blogs.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="flex gap-4 p-5 rounded-xl hover:-translate-y-0.5 transition-all"
                style={{ border: '1px solid var(--border)' }}>
                <div className="flex-1">
                  <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{post.date} · {post.category}</div>
                  <h3 className="text-sm font-bold leading-snug mb-1.5" style={{ color: 'var(--text)' }}>{post.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-sub)' }}>
                    {post.description.length > 80 ? post.description.slice(0, 80) + '...' : post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 신뢰 섹션 */}
      <section style={{ background: 'var(--bg-sub)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-5 py-12 text-center">
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>왜 청약계산기인가요?</h2>
          <p className="text-sm mb-10" style={{ color: 'var(--text-sub)' }}>신뢰할 수 있는 데이터로 만든 청약 종합 도구</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '📋', title: '정부 공식 기준', desc: '국토교통부 기준표와 청약홈 공공데이터를 기반으로 계산합니다.' },
              { icon: '🔒', title: '개인정보 수집 없음', desc: '입력한 정보는 계산에만 사용되며 서버에 저장되지 않습니다.' },
              { icon: '💯', title: '완전 무료', desc: '모든 계산기와 가이드를 비용 없이 무제한 이용할 수 있습니다.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>{title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-sub)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
