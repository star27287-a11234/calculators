import ScoreCalc from '@/components/ScoreCalc'
import FAQ from '@/components/FAQ'
import FaqSchema from '@/components/FaqSchema'
import RelatedTools from '@/components/RelatedTools'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '청약 가점 계산기 2026 — 무주택기간·부양가족·통장기간 자동 계산',
  description: '2026년 국토교통부 기준 청약 가점 계산기. 무주택 기간, 부양가족 수, 청약통장 가입기간을 입력하면 84점 만점 기준 내 가점을 즉시 계산합니다.',
  keywords: ['청약 가점 계산기', '청약 가점', '무주택 기간 계산', '부양가족 가점', '청약 점수 계산'],
  openGraph: {
    title: '청약 가점 계산기 — 내 가점은 몇 점?',
    description: '무주택기간·부양가족·통장기간 입력만으로 청약 가점 즉시 계산',
  },
}

const faq = [
  {
    q: '청약 가점 만점은 몇 점인가요?',
    a: '청약 가점 만점은 84점입니다. 무주택 기간 최대 32점, 부양가족 수 최대 35점, 청약통장 가입기간 최대 17점으로 구성됩니다.',
  },
  {
    q: '미혼이면 무주택 기간이 어떻게 계산되나요?',
    a: '미혼인 경우 만 30세가 된 날부터 무주택 기간을 인정합니다. 만 30세 이전에 무주택이었더라도 만 30세 이후 기간만 가점에 반영됩니다. 만 30세 미만 미혼은 가점제 청약 자체가 불가합니다.',
  },
  {
    q: '부양가족은 누가 포함되나요?',
    a: '세대주와 세대원 전원이 무주택이어야 하며, 직계존속(부모, 조부모)은 3년 이상 같은 세대를 구성해야 인정됩니다. 형제·자매는 부양가족에서 제외됩니다. 배우자는 본인이 아니므로 1명으로 카운트됩니다.',
  },
  {
    q: '청약통장은 어떤 종류든 가점이 인정되나요?',
    a: '주택청약종합저축, 청약저축, 청약예금, 청약부금 모두 가입기간 가점이 인정됩니다. 단, 민영주택 청약은 주택청약종합저축이나 청약예금·청약부금이 유효하며, 국민주택은 주택청약종합저축이나 청약저축이 필요합니다.',
  },
  {
    q: '가점이 같으면 어떻게 당첨자를 정하나요?',
    a: '가점이 동일한 경우 추첨으로 당첨자를 결정합니다. 예외적으로 일부 단지에서는 통장 납입 횟수나 청약통장 가입일 등을 추가 기준으로 활용하기도 합니다.',
  },
]

export default function ScorePage() {
  return (
    <>
      <FaqSchema items={faq} />

      {/* 상단 헤드라인 */}
      <section style={{ background: 'var(--bg-sub)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-2xl mx-auto px-4 py-10 text-center">
          <div className="badge-blue mb-3">2026년 기준</div>
          <h1 className="text-3xl font-black mt-2 mb-3" style={{ color: 'var(--text)' }}>청약 가점 계산기</h1>
          <p className="text-base" style={{ color: 'var(--text-sub)' }}>
            무주택기간 · 부양가족 · 통장기간을 입력하면<br className="sm:hidden" /> 가점을 즉시 계산합니다
          </p>
        </div>
      </section>

      <ScoreCalc />
      <FAQ items={faq} />
      <RelatedTools current="/calculators/score" />
    </>
  )
}
