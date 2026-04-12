'use client'

import { useState, useMemo } from 'react'
import { calcSavingsSim, getSavingsScore } from '@/lib/calculators'

const today = new Date().toISOString().split('T')[0]

export default function SavingsCalc() {
  const [savingsStart, setSavingsStart] = useState('')
  const [targetScore, setTargetScore] = useState(17)

  const result = useMemo(() => {
    if (!savingsStart) return null
    return calcSavingsSim({ savingsStart, targetScore })
  }, [savingsStart, targetScore])

  const scoreLabels: Record<number, string> = {
    1: '1점 (6개월 미만)', 2: '2점 (6개월)', 3: '3점 (1년)',
    4: '4점 (2년)', 5: '5점 (3년)', 6: '6점 (4년)',
    7: '7점 (5년)', 8: '8점 (6년)', 9: '9점 (7년)',
    10: '10점 (8년)', 11: '11점 (9년)', 12: '12점 (10년)',
    13: '13점 (11년)', 14: '14점 (12년)', 15: '15점 (13년)',
    16: '16점 (14년)', 17: '17점 (15년 — 만점)',
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="card space-y-5 mb-5">
        <h2 className="text-base font-bold" style={{ color: 'var(--text)' }}>통장 정보 입력</h2>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-sub)' }}>청약통장 가입일</label>
          <input type="date" className="calc-input" value={savingsStart} max={today}
            onChange={e => setSavingsStart(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-sub)' }}>
            목표 가점 <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(통장기간 가점 기준)</span>
          </label>
          <select className="calc-input"
            value={targetScore} onChange={e => setTargetScore(Number(e.target.value))}>
            {Object.entries(scoreLabels).map(([score, label]) => (
              <option key={score} value={score}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-3 fade-up">
          {/* 현재 점수 */}
          <div className="card text-center">
            <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-sub)' }}>현재 통장기간 가점</div>
            <div className="text-5xl font-black num" style={{ color: 'var(--primary)' }}>
              {result.currentScore}
              <span className="text-xl font-medium ml-1" style={{ color: 'var(--text-muted)' }}>/ 17점</span>
            </div>
            <div className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              가입 기간 {result.currentYears}년
            </div>
            {/* 진행 바 */}
            <div className="mt-4 h-2.5 rounded-full" style={{ background: 'var(--surface2)' }}>
              <div className="h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${(result.currentScore / 17) * 100}%`, background: 'var(--primary)' }} />
            </div>
          </div>

          {/* 목표/만점까지 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="card text-center">
              <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                목표 {targetScore}점까지
              </div>
              {result.monthsToTarget === -1 ? (
                <div className="badge-green text-base">이미 달성!</div>
              ) : (
                <>
                  <div className="text-2xl font-black num" style={{ color: 'var(--green)' }}>
                    {result.monthsToTarget}
                    <span className="text-sm ml-1 font-medium">개월</span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    약 {Math.ceil(result.monthsToTarget / 12)}년 후
                  </div>
                </>
              )}
            </div>
            <div className="card text-center">
              <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>만점(17점)까지</div>
              {result.monthsToMax === 0 ? (
                <div className="badge-green text-base">만점 달성!</div>
              ) : (
                <>
                  <div className="text-2xl font-black num" style={{ color: 'var(--amber)' }}>
                    {result.monthsToMax}
                    <span className="text-sm ml-1 font-medium">개월</span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    약 {Math.ceil(result.monthsToMax / 12)}년 후
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 점수 구간 표 */}
          <div className="card overflow-hidden p-0">
            <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
              <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>청약통장 가입기간 점수표</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'var(--bg-sub)' }}>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold" style={{ color: 'var(--text-sub)' }}>가입기간</th>
                    <th className="text-center px-4 py-2.5 text-xs font-semibold" style={{ color: 'var(--text-sub)' }}>점수</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['6개월 미만', 1], ['6개월~1년', 2], ['1~2년', 3], ['2~3년', 4],
                    ['3~4년', 5], ['4~5년', 6], ['5~6년', 7], ['6~7년', 8],
                    ['7~8년', 9], ['8~9년', 10], ['9~10년', 11], ['10~11년', 12],
                    ['11~12년', 13], ['12~13년', 14], ['13~14년', 15], ['14~15년', 16], ['15년 이상', 17],
                  ].map(([period, score]) => (
                    <tr key={String(score)}
                      style={{
                        borderBottom: '1px solid var(--border-light)',
                        background: result.currentScore === score ? 'var(--primary-light)' : undefined,
                      }}>
                      <td className="px-4 py-2.5" style={{ color: 'var(--text-sub)' }}>{period}</td>
                      <td className="px-4 py-2.5 text-center font-bold num"
                        style={{ color: result.currentScore === score ? 'var(--primary)' : 'var(--text)' }}>
                        {score}점 {result.currentScore === score ? '← 현재' : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="note-box mt-4">
        <strong>계산 기준:</strong> 국토교통부 청약 가점제 통장기간 점수표 ·
        청약저축, 주택청약종합저축, 청약예금, 청약부금 모두 포함 ·
        통장 해지 후 재가입 시 재가입일 기준으로 재산정
      </div>
    </div>
  )
}
