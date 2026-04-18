import sharp from "sharp"
import fs from "node:fs"
import path from "node:path"

const dir = path.resolve("public/images/gallery")
const backup = path.join(dir, "_originals")
if (!fs.existsSync(backup)) fs.mkdirSync(backup, { recursive: true })

const TARGET = 2400
const files = fs.readdirSync(dir).filter(f => /^rest-\d+\.(webp|jpe?g|png)$/i.test(f))

for (const f of files) {
  const src = path.join(dir, f)
  const bak = path.join(backup, f)
  if (!fs.existsSync(bak)) fs.copyFileSync(src, bak)

  const meta = await sharp(bak).metadata()
  const longest = Math.max(meta.width, meta.height)
  const scale = TARGET / longest
  const w = Math.round(meta.width * scale)
  const h = Math.round(meta.height * scale)

  const base = sharp(bak).resize(w, h, { kernel: "lanczos3", fit: "fill" }).sharpen({ sigma: 0.7, m1: 0.5, m2: 2 })

  const ext = path.extname(f).toLowerCase()
  const buf = ext === ".png"
    ? await base.png({ quality: 95, compressionLevel: 9 }).toBuffer()
    : ext === ".webp"
    ? await base.webp({ quality: 92, effort: 6 }).toBuffer()
    : await base.jpeg({ quality: 92, mozjpeg: true }).toBuffer()

  fs.writeFileSync(src, buf)
  console.log(`${f}  ${meta.width}x${meta.height} -> ${w}x${h}  ${(buf.length / 1024).toFixed(0)}KB`)
}
console.log("Done.")
