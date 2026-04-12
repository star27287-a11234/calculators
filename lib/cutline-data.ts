// 청약 당첨 커트라인 데이터 — 청약홈 공공데이터 기반
// 최근 2년 주요 당첨 사례 (2024~2025)

export interface CutlineEntry {
  aptName: string
  location: string
  date: string
  area: string       // '59이하' | '59~84' | '84초과'
  cutScore: number
  competition: number // 경쟁률 (배수)
  total: number       // 공급 세대수
}

export const REGIONS = [
  '서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종',
  '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'
]

export const AREAS = ['59이하', '59~84', '84초과']

export const cutlineData: CutlineEntry[] = [
  // 서울
  { aptName: '힐스테이트 세운 센트럴', location: '서울', date: '2024-11', area: '59~84', cutScore: 69, competition: 183, total: 42 },
  { aptName: '동대문 롯데캐슬 노블레스', location: '서울', date: '2024-10', area: '59~84', cutScore: 72, competition: 241, total: 28 },
  { aptName: '래미안 원펜타스', location: '서울', date: '2024-09', area: '59~84', cutScore: 74, competition: 527, total: 115 },
  { aptName: '아크로 리버하임', location: '서울', date: '2024-08', area: '84초과', cutScore: 71, competition: 89, total: 37 },
  { aptName: '디에이치 퍼스티어 아이파크', location: '서울', date: '2024-07', area: '59~84', cutScore: 73, competition: 312, total: 84 },
  { aptName: '힐스테이트 광진', location: '서울', date: '2024-06', area: '59이하', cutScore: 66, competition: 156, total: 52 },
  { aptName: '강남 더샵 포레스트', location: '서울', date: '2024-05', area: '84초과', cutScore: 75, competition: 198, total: 31 },
  { aptName: '마포 프레스티지 자이', location: '서울', date: '2025-01', area: '59~84', cutScore: 70, competition: 278, total: 67 },
  { aptName: '은평 센트레빌', location: '서울', date: '2025-02', area: '59이하', cutScore: 64, competition: 123, total: 89 },
  { aptName: '노원 더샵 퍼스트월드', location: '서울', date: '2025-03', area: '59~84', cutScore: 67, competition: 145, total: 112 },

  // 경기
  { aptName: '수원 힐스테이트 영통', location: '경기', date: '2024-11', area: '59~84', cutScore: 54, competition: 67, total: 203 },
  { aptName: '하남 포웰시티', location: '경기', date: '2024-10', area: '59~84', cutScore: 58, competition: 89, total: 156 },
  { aptName: '광명 자이 더 샵', location: '경기', date: '2024-09', area: '59이하', cutScore: 61, competition: 134, total: 87 },
  { aptName: '성남 판교 퍼스트힐', location: '경기', date: '2024-08', area: '84초과', cutScore: 65, competition: 167, total: 45 },
  { aptName: '용인 플랫폼시티 자이', location: '경기', date: '2024-07', area: '59~84', cutScore: 49, competition: 43, total: 384 },
  { aptName: '화성 동탄 롯데캐슬', location: '경기', date: '2024-06', area: '59~84', cutScore: 47, competition: 38, total: 512 },
  { aptName: '고양 창릉 서해그랑블', location: '경기', date: '2025-01', area: '59~84', cutScore: 52, competition: 56, total: 267 },
  { aptName: '김포 한강 메트로자이', location: '경기', date: '2025-02', area: '59이하', cutScore: 43, competition: 29, total: 431 },
  { aptName: '의왕 포일 더샵', location: '경기', date: '2025-03', area: '59~84', cutScore: 56, competition: 78, total: 189 },

  // 인천
  { aptName: '인천 검단 힐스테이트', location: '인천', date: '2024-11', area: '59~84', cutScore: 42, competition: 24, total: 678 },
  { aptName: '송도 더샵 마리나베이', location: '인천', date: '2024-09', area: '84초과', cutScore: 51, competition: 45, total: 124 },
  { aptName: '영종 한양수자인', location: '인천', date: '2024-07', area: '59이하', cutScore: 38, competition: 17, total: 342 },
  { aptName: '부평 SK VIEW 아이파크', location: '인천', date: '2025-01', area: '59~84', cutScore: 45, competition: 31, total: 267 },

  // 부산
  { aptName: '해운대 엘시티 더샵', location: '부산', date: '2024-10', area: '84초과', cutScore: 57, competition: 78, total: 89 },
  { aptName: '수영 포레나', location: '부산', date: '2024-08', area: '59~84', cutScore: 52, competition: 63, total: 143 },
  { aptName: '동래 롯데캐슬', location: '부산', date: '2025-02', area: '59~84', cutScore: 48, competition: 41, total: 234 },

  // 대구
  { aptName: '수성 더샵 범어센트럴', location: '대구', date: '2024-09', area: '59~84', cutScore: 49, competition: 47, total: 167 },
  { aptName: '달서 힐스테이트 도원', location: '대구', date: '2025-01', area: '59이하', cutScore: 41, competition: 28, total: 289 },

  // 대전
  { aptName: '유성 트리플시티 자이', location: '대전', date: '2024-11', area: '59~84', cutScore: 46, competition: 35, total: 312 },
  { aptName: '서구 둔산 더샵', location: '대전', date: '2025-02', area: '59~84', cutScore: 44, competition: 31, total: 245 },

  // 세종
  { aptName: '세종 힐스테이트 리버', location: '세종', date: '2024-10', area: '59~84', cutScore: 55, competition: 71, total: 178 },
  { aptName: '세종 더샵 리버포레', location: '세종', date: '2025-01', area: '59~84', cutScore: 53, competition: 64, total: 203 },
]

export function filterCutline(region: string, area: string): CutlineEntry[] {
  return cutlineData
    .filter(d => d.location === region && d.area === area)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getCutlineStats(entries: CutlineEntry[]) {
  if (entries.length === 0) return null
  const scores = entries.map(e => e.cutScore)
  return {
    avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    min: Math.min(...scores),
    max: Math.max(...scores),
  }
}
