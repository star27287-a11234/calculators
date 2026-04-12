import Link from 'next/link'
import { getAllPosts } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '청약 가이드 — 청약 제도 완벽 설명',
  description: '청약 가점제, 특별공급, 청약통장 활용법 등 청약 관련 모든 것을 정부 공식 기준으로 정리한 가이드입니다.',
}

export default function GuidesPage() {
  const guides = getAllPosts('guides')
  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--text)' }}>청약 가이드</h1>
        <p style={{ color: 'var(--text-sub)' }}>국토교통부 정책 기반 정확한 청약 정보</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {guides.map(guide => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`}
            className="p-6 rounded-xl hover:-translate-y-0.5 transition-all"
            style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
            <div className="badge-blue mb-3" style={{ fontSize: '0.72rem' }}>{guide.category}</div>
            <h2 className="text-base font-bold mb-2" style={{ color: 'var(--text)' }}>{guide.title}</h2>
            <p className="text-sm" style={{ color: 'var(--text-sub)' }}>{guide.description}</p>
            <div className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>{guide.date}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
