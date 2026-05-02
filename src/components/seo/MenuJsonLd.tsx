import { menuCategories } from "@/data/menu"

const BASE = "https://www.trattoria-marano.de"

export default function MenuJsonLd() {
  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${BASE}/#menu`,
    name: "Trattoria Marano - Speisekarte",
    inLanguage: ["de-DE", "en-US", "it-IT"],
    hasMenuSection: menuCategories.map((cat) => ({
      "@type": "MenuSection",
      name: cat.label.de,
      alternateName: cat.label.en,
      hasMenuItem: cat.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description.de,
        offers: {
          "@type": "Offer",
          price: item.price.toFixed(2),
          priceCurrency: "EUR",
        },
        ...(item.vegetarian && { suitableForDiet: "https://schema.org/VegetarianDiet" }),
        ...(item.image && {
          image: `${BASE}/images/wolt/${item.image}`,
        }),
      })),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
    />
  )
}
