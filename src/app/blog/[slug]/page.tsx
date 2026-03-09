import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/blog"

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} – Olinka Kancirová`,
    description: post.excerpt,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <div className="pt-28 pb-20">
      <div className="container-default max-w-3xl">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-600 transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Späť na blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {post.readingTime} min čítania
            </span>
          </div>
          <h1 className="heading-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-lg text-neutral-500 leading-relaxed">{post.excerpt}</p>
          )}
        </header>

        {/* Featured image */}
        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-12 shadow-soft aspect-video">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={900}
              height={506}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}

        {/* Content — render markdown paragraphs */}
        <article className="prose prose-neutral prose-lg max-w-none prose-headings:font-heading prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline">
          {post.content.split(/\n\n+/).map((block, i) => {
            const trimmed = block.trim()
            if (!trimmed) return null
            if (trimmed.startsWith("# ")) return <h2 key={i} className="heading-display text-2xl mt-10 mb-4">{trimmed.slice(2)}</h2>
            if (trimmed.startsWith("## ")) return <h3 key={i} className="font-heading font-bold text-xl mt-8 mb-3">{trimmed.slice(3)}</h3>
            return <p key={i} className="text-neutral-700 leading-relaxed mb-4">{trimmed}</p>
          })}
        </article>

        {/* Author card */}
        <div className="mt-16 pt-10 border-t border-neutral-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
              <Image
                src="https://www.olinkakancirova.sk/wp-content/uploads/2024/10/V-ordinacii-16-scaled.webp"
                alt="Olinka Kancirová"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Olinka Kancirová</p>
              <p className="text-sm text-neutral-500">Koučka, lektorka, autorka komunikačnej metódy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
