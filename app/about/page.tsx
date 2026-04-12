import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '서비스 소개 | 청약계산기',
  description: '청약계산기는 국토교통부 기준으로 청약 가점 계산, 당첨 커트라인 조회, DSR 계산을 무료로 제공하는 서비스입니다.',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--text)' }}>서비스 소개</h1>
      <p className="mb-10" style={{ color: 'var(--text-sub)' }}>청약계산기를 만든 이유와 운영 원칙을 설명합니다.</p>

      <div className="space-y-8" style={{ color: 'var(--text-sub)', lineHeight: 1.8 }}>
        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>청약계산기란?</h2>
          <p>청약계산기는 주택청약을 준비하는 분들이 국토교통부 공식 기준에 따라 가점을 계산하고, 지역별 당첨 커트라인을 확인하며, 대출 한도를 파악할 수 있도록 만든 무료 도구 모음입니다.</p>
          <p className="mt-3">복잡한 청약 계산을 쉽고 빠르게, 광고나 회원가입 없이 이용할 수 있습니다.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>데이터 신뢰성</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>가점 계산: 국토교통부 주택청약 가점제 기준표 (2026년 현행 기준)</li>
            <li>당첨 커트라인: 청약홈(apply.lh.or.kr) 당첨자 발표 공개 데이터</li>
            <li>DSR 계산: 금융위원회 DSR 규제 기준 (2024년 2단계)</li>
            <li>청약 자격 기준: 국토교통부 주택공급에 관한 규칙</li>
          </ul>
          <p className="mt-3 text-sm p-3 rounded-lg" style={{ background: 'var(--amber-light)', color: 'var(--amber)' }}>
            본 사이트의 계산 결과는 참고용입니다. 실제 청약 신청 전 청약홈에서 공식 자격을 반드시 확인하세요.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>운영 원칙</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>개인정보 수집 없음 — 입력한 정보는 계산에만 사용되며 서버에 저장되지 않습니다</li>
            <li>광고 수익 — 구글 애드센스 광고를 통해 운영 비용을 충당합니다</li>
            <li>팩트 기반 — 추측이나 예측이 아닌 정부 공식 기준만 기재합니다</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>문의</h2>
          <p>서비스 관련 문의는 이메일로 연락해주세요.</p>
          <p className="mt-1"><a href="mailto:starroad0717@gmail.com" style={{ color: 'var(--primary)' }}>starroad0717@gmail.com</a></p>
        </section>
      </div>

      <div className="mt-12 flex gap-3">
        <Link href="/calculators/score" className="text-sm font-bold px-5 py-2.5 rounded-lg text-white" style={{ background: 'var(--primary)' }}>
          가점 계산하기
        </Link>
        <Link href="/privacy" className="text-sm font-semibold px-5 py-2.5 rounded-lg" style={{ border: '1px solid var(--border)', color: 'var(--text-sub)' }}>
          개인정보처리방침
        </Link>
      </div>
    </div>
  )
}
