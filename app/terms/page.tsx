import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '이용약관 | 청약계산기',
  description: '청약계산기 이용약관',
}

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--text)' }}>이용약관</h1>
      <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>최종 수정일: 2026년 4월 12일</p>

      <div className="space-y-8 text-sm" style={{ color: 'var(--text-sub)', lineHeight: 1.9 }}>
        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text)' }}>1. 서비스 이용</h2>
          <p>청약계산기(이하 "서비스")는 주택청약과 관련한 계산 도구와 정보를 제공합니다. 본 서비스는 정보 제공 목적이며, 계산 결과는 참고용으로만 활용해야 합니다.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text)' }}>2. 면책조항</h2>
          <p>본 서비스의 계산 결과는 국토교통부 기준을 참고하여 제공하나, 실제 청약 결과와 다를 수 있습니다. 서비스 운영자는 계산 결과를 기반으로 한 청약 신청, 대출 결정, 투자 등에 대해 책임을 지지 않습니다.</p>
          <p className="mt-3">청약 신청 전 반드시 청약홈(apply.lh.or.kr)에서 공식 자격 요건을 확인하시기 바랍니다.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text)' }}>3. 지적재산권</h2>
          <p>본 사이트의 콘텐츠(텍스트, 디자인, 코드 등)에 대한 저작권은 청약계산기에 귀속됩니다. 무단 복제, 배포, 변형을 금지합니다. 단, 공공데이터(국토교통부, 청약홈 등)는 각 기관의 이용약관을 따릅니다.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text)' }}>4. 약관 변경</h2>
          <p>서비스 운영자는 필요에 따라 약관을 변경할 수 있으며, 변경 시 본 페이지에 게시합니다.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text)' }}>5. 문의</h2>
          <p><a href="mailto:contact@cheongyak-calc.com" style={{ color: 'var(--primary)' }}>contact@cheongyak-calc.com</a></p>
        </section>
      </div>
    </div>
  )
}
