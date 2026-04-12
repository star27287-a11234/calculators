import CutlineViewer from '@/components/CutlineViewer'
import FAQ from '@/components/FAQ'
import FaqSchema from '@/components/FaqSchema'
import RelatedTools from '@/components/RelatedTools'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '청약 당첨 커트라인 조회 — 지역별 최근 당첨 가점 확인',
  description: '서울, 경기, 인천 등 지역별 청약 당첨 커트라인을 조회하세요. 최근 2년 실제 당첨 가점 데이터를 기반으로 내 가점의 당첨 가능성을 확인할 수 있습니다.',
  keywords: ['청약 커트라인', '청약 당첨 가점', '서울 청약 커트라인', '경기 청약 커트라인', '청약 경쟁률'],
}

const faq = [
  {
    q: '커트라인이란 무엇인가요?',
    a: '커트라인은 해당 단지·평형에서 가점제로 청약할 때 최종 당첨된 사람의 최저 가점을 의미합니다. 커트라인이 60점이라면, 60점 이상인 사람들 중에서 당첨자가 결정됐다는 뜻입니다.',
  },
  {
    q: '커트라인은 매번 다른가요?',
    a: '네, 단지마다, 청약 시기마다 다릅니다. 공급 세대수, 경쟁률, 해당 지역 무주택자 수 등에 따라 커트라인이 달라집니다. 과거 데이터는 참고용이며 미래 커트라인을 보장하지 않습니다.',
  },
  {
    q: '가점이 커트라인보다 높으면 반드시 당첨되나요?',
    a: '아닙니다. 가점이 커트라인보다 높더라도 공급 세대수보다 높은 가점자가 많으면 탈락할 수 있습니다. 또한 공급 세대 중 특별공급 비율에 따라 일반공급 세대수가 달라집니다.',
  },
  {
    q: '특별공급은 커트라인이 따로 있나요?',
    a: '특별공급(신혼부부, 생애최초, 다자녀 등)은 자격 요건 충족 후 별도 추첨이나 소득 순위로 결정됩니다. 가점 커트라인이 아닌 별도 기준이 적용됩니다.',
  },
]

export default function CutlinePage() {
  return (
    <>
      <FaqSchema items={faq} />
      <section style={{ background: 'var(--bg-sub)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-2xl mx-auto px-4 py-10 text-center">
          <div className="badge-blue mb-3">2024~2025 실데이터</div>
          <h1 className="text-3xl font-black mt-2 mb-3" style={{ color: 'var(--text)' }}>당첨 커트라인 조회</h1>
          <p className="text-base" style={{ color: 'var(--text-sub)' }}>지역과 평형을 선택하면 최근 당첨 커트라인을 확인할 수 있습니다</p>
        </div>
      </section>
      <CutlineViewer />
      <FAQ items={faq} />
      <RelatedTools current="/calculators/cutline" />
    </>
  )
}
