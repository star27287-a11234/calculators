'use client'

import { useState, useMemo } from 'react'
import { calcCheongyakScore } from '@/lib/calculators'

const today = new Date().toISOString().split('T')[0]

function ScoreBar({ label, score, max, color }: { label: string; score: number; max: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm" style={{ color: 'var(--text-sub)' }}>{label}</span>
        <span className="text-sm font-bold num" style={{ color }}>{score}점 <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ {max}점</span></span>
      </div>
      <div className="h-2 rounded-full" style={{ background: 'var(--surface2)' }}>
        <div className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${(score / max) * 100}%`, background: color }} />
      </div>
    </div>
  )
}

export default function ScoreCalc() {
  const [birthDate, setBirthDate] = useState('')
  const [married, setMarried] = useState(true)
  const [homelessStart, setHomelessStart] = useState('')
  const [dependents, setDependents] = useState(0)
  const [savingsStart, setSavingsStart] = useState('')
  const [calc, setCalc] = useState(false)

  const result = useMemo(() => {
    if (!calc || !birthDate || !homelessStart || !savingsStart) return null
    return calcCheongyakScore({ birthDate, married, homelessStart, dependents, savingsStart })
  }, [calc, birthDate, married, homelessStart, dependents, savingsStart])

  const gradeInfo = result
    ? result.grade === 'high'
      ? { label: '상위권', badge: 'badge-green', desc: '60점 이상 — 서울 외곽·경기권 당첨 가능성 있음' }
      : result.grade === 'mid'
      ? { label: '중간', badge: 'badge-amber', desc: '40~59점 — 경기·지방 일부 단지 도전 가능' }
      : { label: '낮음', badge: 'badge-red', desc: '39점 이하 — 가점 쌓기가 우선' }
    : null

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* 입력 섹션 */}
      <div className="card space-y-5">
        <h2 className="text-base font-bold" style={{ color: 'var(--text)' }}>정보 입력</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-sub)' }}>생년월일</label>
            <input type="date" className="calc-input" value={birthDate} max={today}
              onChange={e => { setBirthDate(e.target.value); setCalc(false) }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-sub)' }}>혼인 여부</label>
            <div className="flex gap-2">
              {[{ v: true, l: '기혼' }, { v: false, l: '미혼' }].map(({ v, l }) => (
                <button key={l} className={`pill-btn flex-1 ${married === v ? 'active' : ''}`}
                  onClick={() => { setMarried(v); setCalc(false) }}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-sub)' }}>
            무주택 시작일 <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(본인 또는 세대원 최초 무주택 된 날)</span>
          </label>
          <input type="date" className="calc-input" value={homelessStart} max={today}
            onChange={e => { setHomelessStart(e.target.value); setCalc(false) }} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-sub)' }}>
            부양가족 수 <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(무주택 직계존비속, 본인 제외)</span>
          </label>
          <div className="flex gap-2 flex-wrap">
            {[0, 1, 2, 3, 4, 5, 6].map(n => (
              <button key={n} className={`pill-btn ${dependents === n ? 'active' : ''}`}
                onClick={() => { setDependents(n); setCalc(false) }}>
                {n === 6 ? '6명+' : `${n}명`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-sub)' }}>청약통장 가입일</label>
          <input type="date" className="calc-input" value={savingsStart} max={today}
            onChange={e => { setSavingsStart(e.target.value); setCalc(false) }} />
        </div>

        <button
          className="w-full py-3.5 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 active:scale-[0.99]"
          style={{ background: 'var(--primary)' }}
          onClick={() => setCalc(true)}>
          가점 계산하기
        </button>
      </div>

      {/* 결과 */}
      {calc && !result && (
        <div className="mt-4 p-4 rounded-xl text-sm text-center" style={{ background: 'var(--amber-light)', color: 'var(--amber)' }}>
          미혼인 경우 만 30세 이상부터 가점제 청약 신청이 가능합니다. 생년월일과 날짜를 다시 확인해주세요.
        </div>
      )}

      {result && (
        <div className="mt-5 fade-up">
          {/* 총점 */}
          <div className="card text-center mb-4" style={{ borderColor: 'var(--primary)', borderWidth: 2 }}>
            <div className="text-sm font-medium mb-2" style={{ color: 'var(--primary)' }}>나의 청약 가점</div>
            <div className="text-6xl font-black num score-anim" style={{ color: 'var(--text)' }}>
              {result.total}
              <span className="text-2xl font-medium ml-1" style={{ color: 'var(--text-muted)' }}>/ 84</span>
            </div>
            <div className="mt-3">
              <span className={gradeInfo!.badge}>{gradeInfo!.label}</span>
            </div>
            <p className="text-sm mt-2" style={{ color: 'var(--text-sub)' }}>{gradeInfo!.desc}</p>
          </div>

          {/* 항목별 점수 */}
          <div className="card space-y-4 mb-4">
            <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>항목별 점수</h3>
            <ScoreBar label={`무주택 기간 (${result.homelessYears.toFixed(1)}년)`}
              score={result.homelessScore} max={32} color="#1a73e8" />
            <ScoreBar label={`부양가족 수 (${dependents === 6 ? '6명+' : dependents + '명'})`}
              score={result.dependentScore} max={35} color="#34a853" />
            <ScoreBar label={`청약통장 가입기간 (${result.savingsYears.toFixed(1)}년)`}
              score={result.savingsScore} max={17} color="#f9ab00" />
          </div>

          <div className="note-box">
            <strong>계산 기준:</strong> 국토교통부 주택청약 가점제 기준표 (2026년 현행 기준) ·
            미혼자는 만 30세 이후 무주택 기간만 인정 ·
            부양가족은 세대원 중 무주택인 직계존비속 ·
            실제 당첨가점은 청약홈(apply.lh.or.kr)에서 공식 확인
          </div>
        </div>
      )}
    </div>
  )
}
