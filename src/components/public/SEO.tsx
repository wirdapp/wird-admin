interface SEOProps {
	title: string;
	description?: string;
	keywords?: string;
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: string;
	ogUrl?: string;
	twitterCard?: "summary" | "summary_large_image";
}

export function SEO({
	title,
	description,
	keywords,
	ogTitle,
	ogDescription,
	ogImage,
	ogUrl,
	twitterCard = "summary_large_image",
}: SEOProps) {
	return (
		<>
			<title>{title}</title>
			{description && <meta name="description" content={description} />}
			{keywords && <meta name="keywords" content={keywords} />}

			{/* Open Graph / Facebook */}
			{ogTitle && <meta property="og:title" content={ogTitle} />}
			{ogDescription && (
				<meta property="og:description" content={ogDescription} />
			)}
			{ogImage && <meta property="og:image" content={ogImage} />}
			{ogUrl && <meta property="og:url" content={ogUrl} />}
			<meta property="og:type" content="website" />

			{/* Twitter */}
			<meta name="twitter:card" content={twitterCard} />
			{ogTitle && <meta name="twitter:title" content={ogTitle} />}
			{ogDescription && (
				<meta name="twitter:description" content={ogDescription} />
			)}
			{ogImage && <meta name="twitter:image" content={ogImage} />}
		</>
	);
}
