// 청약 가점 계산 로직 — 국토교통부 기준표 기반

export interface ScoreResult {
  total: number
  homelessScore: number
  dependentScore: number
  savingsScore: number
  homelessYears: number
  savingsYears: number
  grade: 'high' | 'mid' | 'low'
}

// 무주택 기간 점수 (최대 32점)
export function getHomelessScore(years: number): number {
  if (years < 1) return 2
  if (years < 2) return 4
  if (years < 3) return 6
  if (years < 4) return 8
  if (years < 5) return 10
  if (years < 6) return 12
  if (years < 7) return 14
  if (years < 8) return 16
  if (years < 9) return 18
  if (years < 10) return 20
  if (years < 11) return 22
  if (years < 12) return 24
  if (years < 13) return 26
  if (years < 14) return 28
  if (years < 15) return 30
  return 32
}

// 부양가족 점수 (최대 35점)
export function getDependentScore(count: number): number {
  if (count <= 0) return 5
  if (count === 1) return 10
  if (count === 2) return 15
  if (count === 3) return 20
  if (count === 4) return 25
  if (count === 5) return 30
  return 35 // 6명 이상
}

// 청약통장 가입 기간 점수 (최대 17점)
export function getSavingsScore(years: number): number {
  if (years < 0.5) return 1
  if (years < 1) return 2
  if (years < 2) return 3
  if (years < 3) return 4
  if (years < 4) return 5
  if (years < 5) return 6
  if (years < 6) return 7
  if (years < 7) return 8
  if (years < 8) return 9
  if (years < 9) return 10
  if (years < 10) return 11
  if (years < 11) return 12
  if (years < 12) return 13
  if (years < 13) return 14
  if (years < 14) return 15
  if (years < 15) return 16
  return 17
}

// 두 날짜 사이 경과 년수 (소수점)
export function yearsBetween(from: Date, to: Date): number {
  const ms = to.getTime() - from.getTime()
  return ms / (1000 * 60 * 60 * 24 * 365.25)
}

// 전체 가점 계산
export function calcCheongyakScore(params: {
  birthDate: string       // YYYY-MM-DD
  married: boolean
  homelessStart: string   // YYYY-MM-DD
  dependents: number      // 0~6+
  savingsStart: string    // YYYY-MM-DD
}): ScoreResult | null {
  const { birthDate, married, homelessStart, dependents, savingsStart } = params
  if (!birthDate || !homelessStart || !savingsStart) return null

  const today = new Date()
  const birth = new Date(birthDate)
  const homeless = new Date(homelessStart)
  const savings = new Date(savingsStart)

  // 만 나이 계산
  const ageYears = yearsBetween(birth, today)

  // 미혼인 경우 만 30세 이전 무주택 기간 제외
  let effectiveHomeless = homeless
  if (!married && ageYears < 30) {
    return null // 만 30세 미만 미혼은 가점제 적용 안됨
  }
  if (!married) {
    const age30 = new Date(birth)
    age30.setFullYear(age30.getFullYear() + 30)
    if (homeless < age30) effectiveHomeless = age30
  }

  const homelessYears = Math.max(0, yearsBetween(effectiveHomeless, today))
  const savingsYears = Math.max(0, yearsBetween(savings, today))

  const homelessScore = getHomelessScore(homelessYears)
  const dependentScore = getDependentScore(dependents)
  const savingsScore = getSavingsScore(savingsYears)
  const total = homelessScore + dependentScore + savingsScore

  const grade: 'high' | 'mid' | 'low' = total >= 60 ? 'high' : total >= 40 ? 'mid' : 'low'

  return { total, homelessScore, dependentScore, savingsScore, homelessYears, savingsYears, grade }
}

// DSR 계산
export interface DsrResult {
  currentDsr: number
  afterDsr: number
  monthlyPayment: number
  maxLoan: number
  eligible: boolean
}

export function calcDsr(params: {
  annualIncome: number    // 만원
  existingMonthly: number // 기존 대출 월 상환액 (만원)
  loanAmount: number      // 희망 대출 금액 (만원)
  loanMonths: number      // 대출 기간 (개월)
  annualRate: number      // 연이율 (%)
}): DsrResult {
  const { annualIncome, existingMonthly, loanAmount, loanMonths, annualRate } = params
  const monthlyIncome = annualIncome / 12
  const r = annualRate / 100 / 12

  const monthlyPayment = r === 0
    ? loanAmount / loanMonths
    : loanAmount * r * Math.pow(1 + r, loanMonths) / (Math.pow(1 + r, loanMonths) - 1)

  const currentDsr = monthlyIncome > 0 ? (existingMonthly / monthlyIncome) * 100 : 0
  const afterDsr = monthlyIncome > 0 ? ((existingMonthly + monthlyPayment) / monthlyIncome) * 100 : 0

  // DSR 40% 기준 최대 추가 대출 가능 금액
  const maxMonthly = monthlyIncome * 0.4 - existingMonthly
  const maxLoan = maxMonthly > 0 && r > 0
    ? maxMonthly * (Math.pow(1 + r, loanMonths) - 1) / (r * Math.pow(1 + r, loanMonths))
    : maxMonthly > 0 ? maxMonthly * loanMonths : 0

  return {
    currentDsr: Math.round(currentDsr * 10) / 10,
    afterDsr: Math.round(afterDsr * 10) / 10,
    monthlyPayment: Math.round(monthlyPayment * 10) / 10,
    maxLoan: Math.max(0, Math.round(maxLoan)),
    eligible: afterDsr <= 40,
  }
}

// 통장 납입 시뮬레이션
export interface SavingsSimResult {
  currentScore: number
  currentYears: number
  monthsToMax: number    // 만점(17점)까지 남은 개월
  monthsToTarget: number // 목표 점수까지 남은 개월 (-1이면 이미 달성)
}

export function calcSavingsSim(params: {
  savingsStart: string  // YYYY-MM-DD
  targetScore: number   // 목표 가점 (1~17)
}): SavingsSimResult {
  const { savingsStart, targetScore } = params
  const today = new Date()
  const savings = new Date(savingsStart)
  const currentYears = Math.max(0, yearsBetween(savings, today))
  const currentScore = getSavingsScore(currentYears)

  // 만점(17점) → 15년 = 180개월
  const maxYears = 15
  const maxMonths = Math.max(0, Math.ceil((maxYears - currentYears) * 12))

  // 목표 점수까지 필요한 기간 계산
  const scoreToYears: Record<number, number> = {
    1: 0, 2: 0.5, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6,
    9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: 12, 15: 13, 16: 14, 17: 15
  }
  const targetYears = scoreToYears[targetScore] ?? 15
  const monthsToTarget = currentScore >= targetScore
    ? -1
    : Math.max(0, Math.ceil((targetYears - currentYears) * 12))

  return { currentScore, currentYears: Math.round(currentYears * 10) / 10, monthsToMax: maxMonths, monthsToTarget }
}
