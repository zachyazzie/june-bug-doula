// Single source of truth for business identity/contact info.
// Update here only — every component/page should import from this file,
// never hardcode phone/email/location strings directly.

// TODO(owner): confirm which digit is correct — the old site's tel: link
// ("8016965156") and its displayed text ("(801) 696-5157") disagreed.
// Using the displayed version as canonical until confirmed.
const phoneDisplay = "(801) 696-5157";

export const siteConfig = {
  businessName: "Junebug Doula",
  ownerName: "Aubrey Yazzie",
  tagline: "Birth Doula and online birth consultant",
  phoneDisplay,
  phoneHref: `tel:+1${phoneDisplay.replace(/\D/g, "")}`,
  email: "aubrey@junebugdoula.com",
  instagramHandle: "@junebug.doula",
  instagramUrl:
    "https://www.instagram.com/junebug.doula?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  // TODO(owner): confirm the exact list of served cities within Utah County.
  serviceAreaRegion: "Utah County, Utah",
  serviceAreaCities: [
    "Provo",
    "Orem",
    "Lehi",
    "American Fork",
    "Spanish Fork",
    "Payson",
    "Springville",
    "Pleasant Grove",
  ],
} as const;
