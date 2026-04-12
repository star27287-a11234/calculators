import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보처리방침 | 청약계산기',
  description: '청약계산기 개인정보처리방침',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--text)' }}>개인정보처리방침</h1>
      <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>최종 수정일: 2026년 4월 12일</p>

      <div className="space-y-8 text-sm" style={{ color: 'var(--text-sub)', lineHeight: 1.9 }}>
        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text)' }}>1. 수집하는 개인정보</h2>
          <p>청약계산기는 사용자로부터 개인정보를 수집하지 않습니다. 계산기에 입력하는 생년월일, 날짜 등의 정보는 브라우저 내에서만 처리되며 서버로 전송되거나 저장되지 않습니다.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text)' }}>2. 자동 수집 정보</h2>
          <p>서비스 이용 통계를 위해 Google Analytics를 사용합니다. 이를 통해 방문자 수, 페이지 조회수 등의 통계 정보가 수집될 수 있습니다. 수집되는 정보에는 IP 주소(익명화), 브라우저 종류, 방문 페이지, 체류 시간 등이 포함됩니다.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text)' }}>3. 광고 및 쿠키</h2>
          <p>본 사이트는 Google AdSense를 통해 광고를 제공합니다. Google은 쿠키를 사용하여 사용자의 관심사에 맞는 광고를 표시할 수 있습니다. Google의 광고 쿠키 사용에 대한 자세한 내용은 <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener" style={{ color: 'var(--primary)' }}>Google 광고 정책</a>을 확인하세요.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text)' }}>4. 제3자 정보 제공</h2>
          <p>청약계산기는 사용자 정보를 제3자에게 제공, 공유, 판매하지 않습니다.</p>
        </section>

        <section>
          <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text)' }}>5. 문의</h2>
          <p>개인정보 관련 문의는 <a href="mailto:contact@cheongyak-calc.com" style={{ color: 'var(--primary)' }}>contact@cheongyak-calc.com</a>으로 연락해주세요.</p>
        </section>
      </div>
    </div>
  )
}
