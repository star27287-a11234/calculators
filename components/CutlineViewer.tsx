'use client'

import { useState } from 'react'
import { filterCutline, getCutlineStats, REGIONS, AREAS } from '@/lib/cutline-data'

export default function CutlineViewer() {
  const [region, setRegion] = useState('서울')
  const [area, setArea] = useState('59~84')
  const [myScore, setMyScore] = useState('')

  const entries = filterCutline(region, area)
  const stats = getCutlineStats(entries)
  const score = parseInt(myScore)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* 필터 */}
      <div className="card space-y-5 mb-5">
        <h2 className="text-base font-bold" style={{ color: 'var(--text)' }}>지역 · 평형 선택</h2>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-sub)' }}>시/도</label>
          <div className="flex gap-2 flex-wrap">
            {REGIONS.map(r => (
              <button key={r} className={`pill-btn ${region === r ? 'active' : ''}`}
                onClick={() => setRegion(r)}>{r}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-sub)' }}>전용면적</label>
          <div className="flex gap-2">
            {AREAS.map(a => (
              <button key={a} className={`pill-btn ${area === a ? 'active' : ''}`}
                onClick={() => setArea(a)}>{a}㎡</button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-sub)' }}>
            내 가점 입력 <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(선택 — 당첨 가능성 확인)</span>
          </label>
          <input type="number" className="calc-input" placeholder="예: 55" min={0} max={84}
            value={myScore} onChange={e => setMyScore(e.target.value)} />
        </div>
      </div>

      {/* 통계 */}
      {stats && (
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: '평균 커트라인', value: stats.avg, unit: '점' },
            { label: '최저 커트라인', value: stats.min, unit: '점' },
            { label: '최고 커트라인', value: stats.max, unit: '점' },
          ].map(({ label, value, unit }) => (
            <div key={label} className="card text-center py-5">
              <div className="text-2xl font-black num" style={{ color: 'var(--primary)' }}>{value}<span className="text-base font-medium ml-0.5">{unit}</span></div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* 내 가점 분석 */}
      {myScore && !isNaN(score) && stats && (
        <div className="mb-5 p-4 rounded-xl fade-up"
          style={{ background: score >= stats.avg ? 'var(--green-light)' : 'var(--red-light)', border: `1px solid ${score >= stats.avg ? 'var(--green)' : 'var(--red)'}` }}>
          <div className="flex items-center gap-2">
            <span className={score >= stats.avg ? 'badge-green' : 'badge-red'}>
              {score >= stats.max ? '최고 커트라인 초과' : score >= stats.avg ? '평균 이상' : score >= stats.min ? '최저 이상' : '커트라인 미달'}
            </span>
          </div>
          <p className="text-sm mt-2" style={{ color: score >= stats.avg ? 'var(--green)' : 'var(--red)' }}>
            {score >= stats.avg
              ? `내 가점 ${score}점은 ${region} 평균 커트라인(${stats.avg}점)보다 ${score - stats.avg}점 높습니다.`
              : `내 가점 ${score}점은 ${region} 평균 커트라인(${stats.avg}점)보다 ${stats.avg - score}점 낮습니다.`
            }
          </p>
        </div>
      )}

      {/* 데이터 테이블 */}
      {entries.length > 0 ? (
        <div className="card overflow-hidden p-0">
          <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>
              {region} · {area}㎡ 최근 당첨 현황 ({entries.length}건)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--bg-sub)', borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-sub)' }}>단지명</th>
                  <th className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--text-sub)' }}>당첨월</th>
                  <th className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--text-sub)' }}>커트라인</th>
                  <th className="text-center px-4 py-3 font-semibold" style={{ color: 'var(--text-sub)' }}>경쟁률</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, i) => {
                  const isAbove = !isNaN(score) && score >= e.cutScore
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: 'var(--text)' }}>{e.aptName}</td>
                      <td className="px-4 py-3 text-center num" style={{ color: 'var(--text-sub)' }}>{e.date}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`num font-bold ${myScore && !isNaN(score) ? (isAbove ? 'text-[#34a853]' : 'text-[#ea4335]') : ''}`}
                          style={{ color: myScore && !isNaN(score) ? undefined : 'var(--text)' }}>
                          {e.cutScore}점
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center num" style={{ color: 'var(--text-sub)' }}>{e.competition}:1</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card text-center py-12" style={{ color: 'var(--text-muted)' }}>
          해당 지역·평형 데이터가 없습니다
        </div>
      )}

      <div className="note-box mt-4">
        <strong>데이터 출처:</strong> 청약홈(apply.lh.or.kr) 당첨자 발표 공개 데이터 (2024~2025년) ·
        커트라인은 일반공급 가점제 기준 · 단지별 실제 커트라인과 차이가 있을 수 있습니다
      </div>
    </div>
  )
}
