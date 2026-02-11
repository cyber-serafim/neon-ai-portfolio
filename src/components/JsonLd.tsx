import { Helmet } from "react-helmet-async";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Антон Падура",
  alternateName: "Anton Padura",
  jobTitle: "IT Security Expert & System Administrator",
  url: "https://www.padura.pp.ua",
  image: "https://www.padura.pp.ua/padura_am.png",
  sameAs: [],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Київ",
    addressCountry: "UA",
  },
  knowsAbout: [
    "Information Security",
    "System Administration",
    "DevOps",
    "Network Technologies",
    "IT Management",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Антон Падура | IT Security Expert",
  url: "https://www.padura.pp.ua",
  description:
    "IT-спеціаліст з 15+ річним досвідом в інформаційній безпеці, адмініструванні систем та IT-менеджменті.",
  inLanguage: ["uk", "en"],
};

export function JsonLd() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteJsonLd)}
      </script>
    </Helmet>
  );
}
