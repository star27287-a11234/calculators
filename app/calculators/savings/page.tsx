import SavingsCalc from '@/components/SavingsCalc'
import FAQ from '@/components/FAQ'
import FaqSchema from '@/components/FaqSchema'
import RelatedTools from '@/components/RelatedTools'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '청약통장 납입 시뮬레이션 — 가입기간 가점 계산기',
  description: '청약통장 가입일을 입력하면 현재 통장기간 가점(최대 17점)을 계산하고, 목표 가점까지 남은 기간을 알려드립니다.',
  keywords: ['청약통장 가점', '청약통장 가입기간', '통장 가점 계산', '청약 통장 점수'],
}

const faq = [
  {
    q: '청약통장 만점(17점)을 받으려면 얼마나 걸리나요?',
    a: '청약통장 가입 후 15년이 지나야 만점 17점을 받을 수 있습니다. 만점을 서두르기보다는 꾸준한 납입과 무주택 기간 유지, 부양가족 확대가 전체 가점 향상에 더 효과적입니다.',
  },
  {
    q: '통장을 해지하고 다시 만들면 가입기간이 초기화되나요?',
    a: '네, 청약통장을 해지하면 가입기간이 초기화됩니다. 따라서 기존 통장을 유지하는 것이 중요합니다. 부득이한 경우를 제외하고 해지는 하지 않는 것이 좋습니다.',
  },
  {
    q: '월 납입액을 늘리면 가점이 올라가나요?',
    a: '통장기간 가점 자체는 납입액이 아닌 가입기간에만 연동됩니다. 다만 국민주택 청약 시 납입 횟수와 금액이 순위에 영향을 미칠 수 있으며, 주택청약종합저축은 매월 2만원 이상 납입해야 합니다.',
  },
]

export default function SavingsPage() {
  return (
    <>
      <FaqSchema items={faq} />
      <section style={{ background: 'var(--bg-sub)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-2xl mx-auto px-4 py-10 text-center">
          <div className="badge-blue mb-3">통장기간 가점</div>
          <h1 className="text-3xl font-black mt-2 mb-3" style={{ color: 'var(--text)' }}>통장 납입 시뮬레이션</h1>
          <p className="text-base" style={{ color: 'var(--text-sub)' }}>가입일을 입력하면 현재 가점과 만점까지 남은 기간을 알려드립니다</p>
        </div>
      </section>
      <SavingsCalc />
      <FAQ items={faq} />
      <RelatedTools current="/calculators/savings" />
    </>
  )
}
