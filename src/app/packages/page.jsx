import Packages from "@/components/Packages/package";
import Banner from "@/components/ui/Banner";
import getPackages from "@/lib/getPackages";
import { buildGraph, webPageNode, breadcrumbNode, SITE_URL } from "@/lib/schema";

export const metadata = {
  title: "প্যাকেজসমূহ | আল-ওয়াকিয়া হজ কাফেলা — হজ ও ওমরাহ প্যাকেজ",
  description: "আল-ওয়াকিয়া হজ কাফেলা-র হজ ও ওমরাহ প্যাকেজসমূহ দেখুন এবং আপনার পছন্দের প্যাকেজ বুক করুন।",
}

// JSON-LD: CollectionPage + ItemList of packages (OfferCatalog entries)
function getPackagesJsonLd(packages) {
  const itemListElement = packages.map((pkg, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: pkg.title,
      description: typeof pkg.short_description === "string" ? pkg.short_description : undefined,
      image: pkg.thumbnail_url,
      brand: { "@id": `${SITE_URL}/#travelagency` },
      offers: {
        "@type": "Offer",
        price: pkg.price ? Math.round(parseFloat(pkg.price)) : undefined,
        priceCurrency: "BDT",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/packages`,
      },
    },
  }));

  return buildGraph([
    webPageNode({
      path: "/packages",
      title: "প্যাকেজসমূহ | আল-ওয়াকিয়া হজ কাফেলা",
      description: "আল-ওয়াকিয়া হজ কাফেলা-র হজ ও ওমরাহ প্যাকেজসমূহ দেখুন এবং আপনার পছন্দের প্যাকেজ বুক করুন।",
    }),
    { "@type": "CollectionPage" },
    { "@type": "ItemList", itemListElement },
    breadcrumbNode([
      { name: "হোম", path: "" },
      { name: "প্যাকেজসমূহ", path: "/packages" },
    ]),
  ]);
}

export default async function Page() {
  const packages = await getPackages();
  const packagesJsonLd = getPackagesJsonLd(packages);
  return (
    <div className="pt-0 bg-gray-50 ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packagesJsonLd) }}
      />
      <Banner
        imageUrl="/hero.png"
        title="হজ ও ওমরাহ প্যাকেজসমূহ"
        subtitle=""
        heightClass=" h-[50vh] lg:h-[70vh]"
      />
      <div className="pt-5">
        <Packages packages={packages} />
      </div>
    </div>
  )
}