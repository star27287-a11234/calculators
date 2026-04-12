import DsrCalc from '@/components/DsrCalc'
import FAQ from '@/components/FAQ'
import FaqSchema from '@/components/FaqSchema'
import RelatedTools from '@/components/RelatedTools'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DSR 계산기 — 대출 가능 금액 역산 · DSR 40% 기준 확인',
  description: '연소득과 기존 대출 정보를 입력하면 DSR(총부채원리금상환비율)과 최대 대출 가능 금액을 계산합니다. 2024년 DSR 40% 규제 기준 적용.',
  keywords: ['DSR 계산기', 'DSR 40%', '대출 가능 금액', '총부채원리금상환비율', '주택담보대출 한도'],
}

const faq = [
  {
    q: 'DSR이란 무엇인가요?',
    a: 'DSR(Debt Service Ratio, 총부채원리금상환비율)은 연소득 대비 전체 대출의 연간 원리금 상환액 비율입니다. 2024년부터 주택담보대출 등 총대출액 1억원 초과 시 DSR 40% 규제가 적용됩니다.',
  },
  {
    q: 'DSR 40%가 넘으면 대출이 불가한가요?',
    a: '원칙적으로 DSR 40%를 초과하면 추가 대출이 어렵습니다. 다만 서민금융상품(보금자리론, 적격대출 등)이나 정책금융상품은 DSR 예외 또는 별도 기준이 적용될 수 있습니다.',
  },
  {
    q: '스트레스 DSR이란 무엇인가요?',
    a: '스트레스 DSR은 금리 인상 위험에 대비해 실제 금리보다 높은 가산 금리(스트레스 금리)를 적용해 DSR을 계산하는 방식입니다. 2024년 2단계 시행으로 수도권 주담대에 0.75%p의 스트레스 금리가 추가 적용됩니다.',
  },
  {
    q: '신용대출도 DSR에 포함되나요?',
    a: '네, 신용대출, 자동차 할부, 카드론 등 모든 대출의 원리금이 DSR 계산에 포함됩니다. 기존 대출이 많을수록 주택담보대출 한도가 줄어듭니다.',
  },
]

export default function DsrPage() {
  return (
    <>
      <FaqSchema items={faq} />
      <section style={{ background: 'var(--bg-sub)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-2xl mx-auto px-4 py-10 text-center">
          <div className="badge-blue mb-3">DSR 40% 기준</div>
          <h1 className="text-3xl font-black mt-2 mb-3" style={{ color: 'var(--text)' }}>DSR 계산기</h1>
          <p className="text-base" style={{ color: 'var(--text-sub)' }}>연소득과 대출 정보를 입력하면 DSR과 최대 대출 가능 금액을 계산합니다</p>
        </div>
      </section>
      <DsrCalc />
      <FAQ items={faq} />
      <RelatedTools current="/calculators/dsr" />
    </>
  )
}
