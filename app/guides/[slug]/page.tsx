import { getPost, getAllSlugs } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getAllSlugs('guides').map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost('guides', slug)
  if (!post) return {}
  return {
    title: post.title + ' | 청약 가이드',
    description: post.description,
    openGraph: { title: post.title, description: post.description },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost('guides', slug)
  if (!post) notFound()

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <div className="mb-2">
        <Link href="/guides" className="text-sm" style={{ color: 'var(--primary)' }}>← 가이드 목록</Link>
      </div>
      <div className="mt-6 mb-8">
        <div className="badge-blue mb-3" style={{ fontSize: '0.72rem' }}>{post.category}</div>
        <h1 className="text-3xl font-black mt-2 mb-3" style={{ color: 'var(--text)' }}>{post.title}</h1>
        <p className="text-base" style={{ color: 'var(--text-sub)' }}>{post.description}</p>
        <div className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>{post.date} · 청약계산기 편집팀</div>
      </div>
      <hr style={{ borderColor: 'var(--border)' }} />
      <div className="guide-content mt-8"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      <div className="mt-12 p-5 rounded-xl" style={{ background: 'var(--primary-light)', border: '1px solid #c5d8fb' }}>
        <div className="font-bold mb-2" style={{ color: 'var(--primary-dark)' }}>관련 계산기 바로가기</div>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculators/score" className="text-sm font-semibold hover:underline" style={{ color: 'var(--primary)' }}>가점 계산기 →</Link>
          <Link href="/calculators/cutline" className="text-sm font-semibold hover:underline" style={{ color: 'var(--primary)' }}>커트라인 조회 →</Link>
          <Link href="/calculators/eligibility" className="text-sm font-semibold hover:underline" style={{ color: 'var(--primary)' }}>자격 확인 →</Link>
        </div>
      </div>
    </div>
  )
}
