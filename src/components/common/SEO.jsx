import { memo } from "react";
import { Helmet } from "react-helmet-async";
import { seoDefaults } from "../../data/portfolio";

function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = "website",
}) {
  const pageTitle = title
    ? `${title} | ${seoDefaults.siteName}`
    : seoDefaults.defaultTitle;
  const pageDescription = description || seoDefaults.defaultDescription;
  const pageKeywords = keywords || seoDefaults.defaultKeywords;
  const pageCanonical = canonical
    ? `${seoDefaults.siteUrl}${canonical}`
    : seoDefaults.siteUrl;
  const pageOgImage =
    ogImage || `${seoDefaults.siteUrl}/images/profile.jpg`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={pageCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:image" content={pageOgImage} />
      <meta property="og:site_name" content={seoDefaults.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoDefaults.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageOgImage} />
    </Helmet>
  );
}

export default memo(SEO);
