// Resize all menu images to 600×400 WebP — run once with: node scripts/optimize-menu-images.mjs
import sharp from "sharp"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir  = path.join(__dirname, "../public/images/wolt")
const destDir = path.join(__dirname, "../public/images/wolt")

const files = fs.readdirSync(srcDir).filter(f => f.endsWith(".jpg") || f.endsWith(".jpeg"))

console.log(`Optimizing ${files.length} images...`)

for (const file of files) {
  const src  = path.join(srcDir, file)
  const dest = path.join(destDir, file.replace(/\.(jpg|jpeg)$/, ".webp"))

  // Skip if already processed and newer than source
  if (fs.existsSync(dest)) {
    const srcMtime  = fs.statSync(src).mtimeMs
    const destMtime = fs.statSync(dest).mtimeMs
    if (destMtime > srcMtime) { process.stdout.write(`  skip  ${file}\n`); continue }
  }

  await sharp(src)
    .resize(600, 400, { fit: "cover", position: "centre" })
    .webp({ quality: 75 })
    .toFile(dest)

  process.stdout.write(`  ✓ ${file} → ${path.basename(dest)}\n`)
}

console.log("Done.")
