export const dynamic = 'force-static';

export default function sitemap() {
  return [
    {
      url: 'https://arshad-ahmed-portfolio.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
