import { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/content'

const BASE = 'https://cheongyak-calc.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const guideSlugs = getAllSlugs('guides')
  const blogSlugs = getAllSlugs('blog')

  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE}/calculators/score`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE}/calculators/cutline`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${BASE}/calculators/eligibility`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/calculators/savings`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/calculators/dsr`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/guides`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/blog`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${BASE}/about`, priority: 0.5, changeFrequency: 'yearly' as const },
    { url: `${BASE}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${BASE}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const guidePages = guideSlugs.map(slug => ({
    url: `${BASE}/guides/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  const blogPages = blogSlugs.map(slug => ({
    url: `${BASE}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...guidePages, ...blogPages]
}
