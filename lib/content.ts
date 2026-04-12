import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
}

export interface Post extends PostMeta {
  contentHtml: string
}

function getDir(type: 'guides' | 'blog') {
  return path.join(process.cwd(), 'content', type)
}

export function getAllPosts(type: 'guides' | 'blog'): PostMeta[] {
  const dir = getDir(type)
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))
  return files.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(dir, fileName), 'utf8')
    const { data } = matter(raw)
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      category: data.category || '',
    }
  }).sort((a, b) => b.date.localeCompare(a.date))
}

export async function getPost(type: 'guides' | 'blog', slug: string): Promise<Post | null> {
  const filePath = path.join(getDir(type), `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || '',
    category: data.category || '',
    contentHtml: processed.toString(),
  }
}

export function getAllSlugs(type: 'guides' | 'blog'): string[] {
  const dir = getDir(type)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}
