'use client'

import { useState } from 'react'

interface CheckItem {
  id: string
  question: string
  note?: string
  yes: string
  no: string
}

const CHECKS: CheckItem[] = [
  {
    id: 'age', question: '만 19세 이상이신가요?', yes: '✓', no: '✗',
    note: '청약 신청은 만 19세 이상부터 가능합니다.',
  },
  {
    id: 'householder', question: '세대주(또는 예비세대주)이신가요?', yes: '✓', no: '✗',
    note: '일반공급 1순위는 세대주 또는 예비세대주여야 합니다. 단, 일부 특별공급은 세대원도 가능합니다.',
  },
  {
    id: 'homeless', question: '무주택 세대구성원이신가요?', yes: '✓', no: '✗',
    note: '본인 및 세대원 전체가 주택을 소유하지 않아야 합니다. 분양권·입주권도 주택으로 간주합니다.',
  },
  {
    id: 'savings', question: '청약통장 가입 후 1년 이상 경과했나요?', yes: '✓', no: '✗',
    note: '수도권 1순위는 1년 이상(투기과열지구·청약과열지역은 2년), 비수도권은 6개월 이상 필요합니다.',
  },
  {
    id: 'married', question: '결혼한 지 7년 이내이거나 미혼 청년인가요?', yes: '특별공급 가능', no: '일반공급만',
    note: '신혼부부 특별공급은 혼인신고 후 7년 이내, 생애최초 특별공급은 혼인 여부 무관하게 신청 가능합니다.',
  },
  {
    id: 'income', question: '월평균 소득이 도시근로자 기준 120% 이하인가요?', yes: '특별공급 가능', no: '일반공급만',
    note: '2025년 기준 3인 가구 기준 약 712만원 이하. 생애최초는 160%, 신혼부부는 130%(맞벌이 140%) 이하.',
  },
  {
    id: 'asset', question: '부동산 자산이 3.31억원 이하인가요?', yes: '특별공급 가능', no: '일반공급만',
    note: '특별공급 신청 시 부동산 자산 기준(3억 3,100만원) 충족 필요. 일반공급은 자산 기준 없음.',
  },
]

type Answer = 'yes' | 'no' | null

export default function EligibilityChecker() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({})

  const setAnswer = (id: string, val: Answer) => {
    setAnswers(prev => ({ ...prev, [id]: val }))
  }

  const allAnswered = CHECKS.every(c => answers[c.id])
  const basicEligible = ['age', 'householder', 'homeless', 'savings'].every(id => answers[id] === 'yes')
  const specialEligible = basicEligible && ['married', 'income', 'asset'].every(id => answers[id] === 'yes')

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-3">
        {CHECKS.map((check, idx) => {
          const ans = answers[check.id]
          return (
            <div key={check.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{check.question}</span>
                  </div>
                  {check.note && <p className="text-xs mt-1.5 ml-7" style={{ color: 'var(--text-muted)' }}>{check.note}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setAnswer(check.id, 'yes')}
                    className={`pill-btn text-xs ${ans === 'yes' ? 'active' : ''}`}
                    style={ans === 'yes' ? { background: 'var(--green)', borderColor: 'var(--green)' } : {}}>
                    예
                  </button>
                  <button onClick={() => setAnswer(check.id, 'no')}
                    className={`pill-btn text-xs ${ans === 'no' ? '' : ''}`}
                    style={ans === 'no' ? { background: 'var(--red)', borderColor: 'var(--red)', color: '#fff' } : {}}>
                    아니오
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 결과 */}
      {allAnswered && (
        <div className="mt-6 fade-up space-y-3">
          <div className="card" style={{ borderColor: basicEligible ? 'var(--green)' : 'var(--red)', borderWidth: 2 }}>
            <div className="flex items-center gap-3">
              <span className={basicEligible ? 'badge-green' : 'badge-red'} style={{ fontSize: '1rem' }}>
                {basicEligible ? '✓' : '✗'}
              </span>
              <div>
                <div className="font-bold" style={{ color: 'var(--text)' }}>
                  일반공급 1순위 {basicEligible ? '자격 있음' : '자격 없음'}
                </div>
                <div className="text-sm mt-0.5" style={{ color: 'var(--text-sub)' }}>
                  {basicEligible
                    ? '나이, 세대주, 무주택, 통장 기간 조건을 모두 충족합니다.'
                    : '기본 조건 중 하나 이상을 충족하지 않습니다. 미달 항목을 확인하세요.'}
                </div>
              </div>
            </div>
          </div>

          {basicEligible && (
            <div className="card" style={{ borderColor: specialEligible ? 'var(--primary)' : 'var(--amber)', borderWidth: 2 }}>
              <div className="flex items-center gap-3">
                <span className={specialEligible ? 'badge-blue' : 'badge-amber'}>
                  {specialEligible ? '✓' : '△'}
                </span>
                <div>
                  <div className="font-bold" style={{ color: 'var(--text)' }}>
                    특별공급 {specialEligible ? '신청 가능' : '일부 조건 미달'}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: 'var(--text-sub)' }}>
                    {specialEligible
                      ? '신혼부부, 생애최초, 다자녀 특별공급 신청 자격을 갖추고 있습니다.'
                      : '소득·자산·혼인 조건 중 일부를 충족하지 않아 특정 특별공급 신청이 제한될 수 있습니다.'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="note-box mt-4">
        <strong>참고:</strong> 이 체크리스트는 일반적인 기준을 안내하는 참고용입니다.
        실제 청약 자격은 청약홈(apply.lh.or.kr) 또는 주택도시기금 콜센터(1566-9009)에서 정확히 확인하세요.
      </div>
    </div>
  )
}
