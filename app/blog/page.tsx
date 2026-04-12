import Link from 'next/link'
import { getAllPosts } from '@/lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '청약 블로그 — 청약 실전 정보와 분석',
  description: '청약 가점 높이는 방법, 지역별 당첨 분석, 특별공급 전략 등 청약 당첨을 위한 실전 정보를 모았습니다.',
}

export default function BlogPage() {
  const posts = getAllPosts('blog')
  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--text)' }}>블로그</h1>
        <p style={{ color: 'var(--text-sub)' }}>청약 실전 정보와 최신 분석</p>
      </div>
      <div className="space-y-4">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`}
            className="flex gap-5 p-5 rounded-xl hover:-translate-y-0.5 transition-all"
            style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-blue" style={{ fontSize: '0.68rem' }}>{post.category}</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{post.date}</span>
              </div>
              <h2 className="text-base font-bold mb-1.5" style={{ color: 'var(--text)' }}>{post.title}</h2>
              <p className="text-sm" style={{ color: 'var(--text-sub)' }}>{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
