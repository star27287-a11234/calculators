import EligibilityChecker from '@/components/EligibilityChecker'
import FAQ from '@/components/FAQ'
import FaqSchema from '@/components/FaqSchema'
import RelatedTools from '@/components/RelatedTools'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '청약 자격 확인기 — 일반공급·특별공급 자격 체크리스트',
  description: '청약 일반공급 1순위 자격과 특별공급(신혼부부, 생애최초, 다자녀) 자격을 간단히 확인하세요. 나이, 세대주, 무주택, 소득, 자산 조건을 한번에 체크.',
  keywords: ['청약 자격 확인', '청약 1순위 조건', '신혼부부 특별공급', '생애최초 특별공급', '청약 조건'],
}

const faq = [
  {
    q: '무주택 세대구성원이란 무엇인가요?',
    a: '세대주 및 세대원 전원이 주택(분양권, 입주권 포함)을 소유하지 않은 세대를 말합니다. 배우자, 직계존속(부모·조부모), 직계비속(자녀)이 세대원에 포함됩니다.',
  },
  {
    q: '세대주가 아니면 청약을 못 하나요?',
    a: '일반공급 1순위는 세대주 또는 예비세대주여야 합니다. 다만 신혼부부 특별공급, 생애최초 특별공급 등 일부 특별공급은 세대원도 신청 가능합니다.',
  },
  {
    q: '생애최초 특별공급 소득 기준은 얼마인가요?',
    a: '2025년 기준 도시근로자 월평균 소득의 160% 이하입니다. 3인 가구 기준 약 951만원 이하입니다. 맞벌이 가구는 배우자 소득을 합산해 각각 160% 이내여야 합니다.',
  },
  {
    q: '예비세대주도 청약 신청이 가능한가요?',
    a: '네, 청약 당첨 후 입주 전까지 세대주가 될 예정인 경우 예비세대주로 신청 가능합니다. 단, 실제 입주 시점에 세대주 요건을 충족해야 합니다.',
  },
]

export default function EligibilityPage() {
  return (
    <>
      <FaqSchema items={faq} />
      <section style={{ background: 'var(--bg-sub)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-2xl mx-auto px-4 py-10 text-center">
          <div className="badge-blue mb-3">2026년 기준</div>
          <h1 className="text-3xl font-black mt-2 mb-3" style={{ color: 'var(--text)' }}>청약 자격 확인기</h1>
          <p className="text-base" style={{ color: 'var(--text-sub)' }}>질문에 예/아니오로 답하면 나의 청약 자격을 확인합니다</p>
        </div>
      </section>
      <EligibilityChecker />
      <FAQ items={faq} />
      <RelatedTools current="/calculators/eligibility" />
    </>
  )
}
