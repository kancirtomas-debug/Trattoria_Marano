import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { getAllPosts, formatDate } from "@/lib/blog"
import Reveal from "@/components/ui/reveal"

export const metadata: Metadata = {
  title: "Blog - Olinka Kancirová",
  description: "Články o komunikácii, emóciách, vzťahoch a sebarozvoji od Olinky Kancirowej.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="pt-28 pb-20">
      <div className="container-default">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-3">Blog</p>
            <h1 className="heading-display text-4xl sm:text-5xl mb-4">Myšlienky a inšpirácie</h1>
            <p className="text-neutral-500 text-lg leading-relaxed">
              Články o komunikácii, emóciách, vzťahoch a ceste k sebe samej.
            </p>
          </div>
        </Reveal>

        {posts.length === 0 ? (
          <Reveal>
            <div className="text-center py-24 bg-cream-50 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-neutral-800 mb-2">Čoskoro prvý článok</h2>
              <p className="text-neutral-500 max-w-sm mx-auto">
                Blog sa pripravuje. Vráťte sa čoskoro pre prvé inšpiratívne čítanie.
              </p>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 mt-6 text-primary-600 font-medium hover:underline"
              >
                Kontaktujte ma <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.07}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-soft border border-neutral-100 hover:shadow-warm transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    {post.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          width={600}
                          height={338}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readingTime} min čítania
                        </span>
                      </div>
                      <h2 className="font-heading font-bold text-xl text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors leading-snug">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-neutral-500 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                      )}
                      <span className="inline-flex items-center gap-1 text-primary-600 text-sm font-medium mt-auto">
                        Čítať viac <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
