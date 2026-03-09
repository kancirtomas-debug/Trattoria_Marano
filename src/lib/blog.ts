import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  coverImage?: string
  tags: string[]
  published: boolean
  content: string
  readingTime: number
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
  const posts: BlogPost[] = []
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
    const { data, content } = matter(raw)
    if (data.published === false) continue
    posts.push({
      slug: file.replace(/\.mdx?$/, ""),
      title: data.title || "Bez názvu",
      date: data.date ? String(data.date) : "",
      excerpt: data.excerpt || data.description || "",
      author: data.author || "Olinka Kancirova",
      coverImage: data.coverImage || undefined,
      tags: Array.isArray(data.tags) ? data.tags : [],
      published: data.published !== false,
      content,
      readingTime: estimateReadingTime(content),
    })
  }
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdPath = path.join(BLOG_DIR, `${slug}.md`)
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`)
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title || "Bez názvu",
    date: data.date ? String(data.date) : "",
    excerpt: data.excerpt || data.description || "",
    author: data.author || "Olinka Kancirova",
    coverImage: data.coverImage || undefined,
    tags: Array.isArray(data.tags) ? data.tags : [],
    published: data.published !== false,
    content,
    readingTime: estimateReadingTime(content),
  }
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("sk-SK", {
    year: "numeric", month: "long", day: "numeric",
  })
}
