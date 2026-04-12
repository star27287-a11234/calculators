'use client'

import { useState, useMemo } from 'react'
import { calcDsr } from '@/lib/calculators'

function fmt(n: number) { return n.toLocaleString('ko-KR') }

export default function DsrCalc() {
  const [income, setIncome] = useState('')
  const [existingMonthly, setExistingMonthly] = useState('')
  const [loanAmount, setLoanAmount] = useState('')
  const [loanYears, setLoanYears] = useState('30')
  const [rate, setRate] = useState('4.0')

  const result = useMemo(() => {
    const inc = parseFloat(income)
    const exist = parseFloat(existingMonthly) || 0
    const loan = parseFloat(loanAmount)
    const months = parseInt(loanYears) * 12
    const r = parseFloat(rate)
    if (!inc || !loan || isNaN(r)) return null
    return calcDsr({ annualIncome: inc, existingMonthly: exist, loanAmount: loan, loanMonths: months, annualRate: r })
  }, [income, existingMonthly, loanAmount, loanYears, rate])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="card space-y-5 mb-5">
        <h2 className="text-base font-bold" style={{ color: 'var(--text)' }}>대출 정보 입력</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-sub)' }}>
              연소득 <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(만원)</span>
            </label>
            <input type="number" className="calc-input" placeholder="예: 5000"
              value={income} onChange={e => setIncome(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-sub)' }}>
              기존 대출 월 상환액 <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(만원, 없으면 0)</span>
            </label>
            <input type="number" className="calc-input" placeholder="예: 50"
              value={existingMonthly} onChange={e => setExistingMonthly(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-sub)' }}>
            희망 대출 금액 <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(만원)</span>
          </label>
          <input type="number" className="calc-input" placeholder="예: 30000 (3억)"
            value={loanAmount} onChange={e => setLoanAmount(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-sub)' }}>대출 기간</label>
            <div className="flex gap-2 flex-wrap">
              {['10', '15', '20', '30', '40'].map(y => (
                <button key={y} className={`pill-btn ${loanYears === y ? 'active' : ''}`}
                  onClick={() => setLoanYears(y)}>{y}년</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-sub)' }}>
              예상 금리 <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(%)</span>
            </label>
            <input type="number" className="calc-input" placeholder="예: 4.0" step="0.1" min="0" max="20"
              value={rate} onChange={e => setRate(e.target.value)} />
          </div>
        </div>
      </div>

      {result && (
        <div className="space-y-3 fade-up">
          {/* DSR 시각화 */}
          <div className="card">
            <div className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>DSR 분석</div>
            <div className="space-y-4">
              {[
                { label: '현재 DSR (기존 대출)', value: result.currentDsr, color: result.currentDsr > 40 ? 'var(--red)' : 'var(--green)' },
                { label: '대출 후 DSR', value: result.afterDsr, color: result.afterDsr > 40 ? 'var(--red)' : result.afterDsr > 30 ? 'var(--amber)' : 'var(--green)' },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1.5 text-sm">
                    <span style={{ color: 'var(--text-sub)' }}>{label}</span>
                    <span className="font-bold num" style={{ color }}>{value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full" style={{ background: 'var(--surface2)' }}>
                    <div className="h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(value, 100)}%`, background: color }} />
                  </div>
                </div>
              ))}
              <div className="pt-1">
                <div className="h-px" style={{ background: `linear-gradient(to right, var(--green) 0%, var(--green) 40%, var(--border) 40%)` }} />
                <div className="text-xs mt-1 text-right" style={{ color: 'var(--text-muted)' }}>DSR 40% 기준선</div>
              </div>
            </div>
          </div>

          {/* 결과 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="card text-center">
              <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>월 상환액</div>
              <div className="text-xl font-black num" style={{ color: 'var(--text)' }}>
                {fmt(Math.round(result.monthlyPayment))}
                <span className="text-sm font-medium ml-0.5">만원</span>
              </div>
            </div>
            <div className="card text-center" style={{ borderColor: result.eligible ? 'var(--green)' : 'var(--red)', borderWidth: 2 }}>
              <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>대출 가능 여부</div>
              <span className={result.eligible ? 'badge-green' : 'badge-red'}>
                {result.eligible ? 'DSR 적격' : 'DSR 초과'}
              </span>
            </div>
            <div className="card text-center">
              <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>최대 추가 대출 가능</div>
              <div className="text-xl font-black num" style={{ color: result.maxLoan > 0 ? 'var(--primary)' : 'var(--red)' }}>
                {result.maxLoan > 0 ? `${fmt(result.maxLoan)}만원` : '불가'}
              </div>
            </div>
          </div>

          {!result.eligible && (
            <div className="p-4 rounded-xl text-sm" style={{ background: 'var(--red-light)', color: 'var(--red)' }}>
              희망 대출 금액이 DSR 40% 기준을 초과합니다. 대출 금액을 {fmt(result.maxLoan)}만원 이하로 줄이거나, 대출 기간을 늘리거나, 기존 대출을 상환해주세요.
            </div>
          )}
        </div>
      )}

      <div className="note-box mt-4">
        <strong>계산 기준:</strong> DSR(총부채원리금상환비율) = 연간 원리금 상환액 ÷ 연소득 × 100 ·
        2024년 기준 DSR 40% 규제 적용 (스트레스 DSR 2단계) ·
        원리금균등상환 방식 기준 · 실제 대출 가능 금액은 금융기관에 문의하세요
      </div>
    </div>
  )
}
