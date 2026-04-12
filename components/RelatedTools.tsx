import Link from 'next/link'

const TOOLS = [
  { href: '/calculators/score', label: '청약 가점 계산기', desc: '가점 총점 계산', icon: '🏆' },
  { href: '/calculators/cutline', label: '당첨 커트라인 조회', desc: '지역별 당첨선 확인', icon: '📊' },
  { href: '/calculators/eligibility', label: '청약 자격 확인', desc: '내 청약 자격 체크', icon: '✅' },
  { href: '/calculators/savings', label: '통장 납입 시뮬레이션', desc: '가입기간 가점 확인', icon: '📅' },
  { href: '/calculators/dsr', label: 'DSR 계산기', desc: '대출 가능 금액 계산', icon: '🏦' },
]

export default function RelatedTools({ current }: { current: string }) {
  const others = TOOLS.filter(t => t.href !== current)
  return (
    <section className="max-w-2xl mx-auto px-4 pb-14">
      <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--text-muted)' }}>관련 도구</h2>
      <div className="grid grid-cols-2 gap-3">
        {others.map(tool => (
          <Link key={tool.href} href={tool.href}
            className="flex items-start gap-3 p-4 rounded-xl transition-all hover:-translate-y-0.5"
            style={{ border: '1px solid var(--border)', background: 'var(--bg-sub)' }}>
            <span className="text-xl">{tool.icon}</span>
            <div>
              <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{tool.label}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{tool.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
