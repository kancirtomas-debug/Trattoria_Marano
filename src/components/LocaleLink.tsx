"use client"
import NextLink, { type LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { localeFromPath, withLocale } from "@/context/LanguageContext"
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react"

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }

const LocaleLink = forwardRef<HTMLAnchorElement, Props>(function LocaleLink(
  { href, ...rest },
  ref
) {
  const pathname = usePathname() || "/"
  const lang = localeFromPath(pathname)

  let resolved: LinkProps["href"] = href
  if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//")) {
    resolved = withLocale(href, lang)
  }

  return <NextLink ref={ref} href={resolved} {...rest} />
})

export default LocaleLink
