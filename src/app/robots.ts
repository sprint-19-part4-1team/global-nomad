import { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/constants';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mypage/', '/activity/*/edit', '/activity/new'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
};
export default robots;
