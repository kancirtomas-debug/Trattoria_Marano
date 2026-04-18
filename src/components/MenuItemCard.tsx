"use client"
import Image from "next/image"
import { useState } from "react"
import { Leaf, Flame } from "lucide-react"
import type { MenuItem } from "@/data/menu"
import type { Lang } from "@/context/LanguageContext"
import MenuItemModal from "./MenuItemModal"

// Warm cream placeholder — shown instantly while image loads
const BLUR_URL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI2IiBoZWlnaHQ9IjQiIGZpbGw9IiNmMGRmZDAiLz48L3N2Zz4="

type Props = { item: MenuItem; lang: Lang; priority?: boolean }

export default function MenuItemCard({ item, lang, priority = false }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="card-warm rounded-xl overflow-hidden cursor-pointer"
        onClick={() => setOpen(true)}
        style={{
          height: 160,
          transition: "box-shadow 200ms ease, transform 200ms ease",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = "0 8px 28px rgba(0,0,0,0.13)"
          el.style.transform = "translateY(-2px)"
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = ""
          el.style.transform = ""
        }}
      >
        <div className="flex h-full">
          {/* Photo — left side, fixed width */}
          <div
            className="relative shrink-0 overflow-hidden"
            style={{
              width: "42%",
              background: item.image ? "#f0dfd0" : "linear-gradient(155deg,#6b1535 0%,#3d0e1f 100%)",
            }}
          >
            {item.image && (
              <Image
                src={`/images/wolt/${item.image}`}
                alt={item.name}
                fill
                className="object-cover"
                style={{ objectPosition: "center center" }}
                sizes="(max-width: 640px) 42vw, 320px"
                quality={85}
                priority={priority}
                placeholder="blur"
                blurDataURL={BLUR_URL}
              />
            )}
          </div>

          {/* Text — right side */}
          <div className="flex-1 px-4 py-3 flex flex-col justify-center min-w-0 overflow-hidden">
            <div className="flex justify-between items-start gap-2 mb-1">
              <span
                className="font-heading font-semibold text-ink text-sm leading-snug"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.name}
              </span>
              <span className="font-heading font-semibold text-terracotta text-sm whitespace-nowrap shrink-0 ml-1">
                {item.price.toFixed(2)} €
              </span>
            </div>
            <p
              className="text-xs text-ink-muted leading-relaxed mb-1.5"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {item.description[lang]}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {item.vegetarian && <Leaf size={11} className="text-sage shrink-0" />}
              {item.spicy && <Flame size={11} className="text-terracotta shrink-0" />}
              {item.allergens && (
                <span className="text-[10px] text-warmgray-400 truncate">{item.allergens}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <MenuItemModal item={item} lang={lang} onClose={() => setOpen(false)} />
      )}
    </>
  )
}
