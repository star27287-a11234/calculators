import { getPost, getAllSlugs } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getAllSlugs('blog').map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost('blog', slug)
  if (!post) return {}
  return {
    title: post.title + ' | 청약계산기 블로그',
    description: post.description,
    openGraph: { title: post.title, description: post.description },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost('blog', slug)
  if (!post) notFound()

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <div className="mb-2">
        <Link href="/blog" className="text-sm" style={{ color: 'var(--primary)' }}>← 블로그 목록</Link>
      </div>
      <div className="mt-6 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="badge-blue" style={{ fontSize: '0.72rem' }}>{post.category}</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{post.date}</span>
        </div>
        <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--text)' }}>{post.title}</h1>
        <p className="text-base" style={{ color: 'var(--text-sub)' }}>{post.description}</p>
      </div>
      <hr style={{ borderColor: 'var(--border)' }} />
      <div className="guide-content mt-8"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      <div className="mt-12 p-5 rounded-xl" style={{ background: 'var(--bg-sub)', border: '1px solid var(--border)' }}>
        <div className="font-bold mb-2 text-sm" style={{ color: 'var(--text)' }}>청약 계산기로 바로 확인하세요</div>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculators/score" className="text-sm font-semibold hover:underline" style={{ color: 'var(--primary)' }}>내 가점 계산 →</Link>
          <Link href="/calculators/cutline" className="text-sm font-semibold hover:underline" style={{ color: 'var(--primary)' }}>커트라인 조회 →</Link>
          <Link href="/calculators/dsr" className="text-sm font-semibold hover:underline" style={{ color: 'var(--primary)' }}>DSR 계산 →</Link>
        </div>
      </div>
    </div>
  )
}
