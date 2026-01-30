import { MetadataRoute } from 'next';
import { getActivities } from '@/shared/apis/feature/activities';
import { SITE_URL } from '@/shared/constants';
import { ActivityBasicDto, GetActivitiesResponse } from '@/shared/types/activities';

/**
 * 모든 체험(Activity) 조회
 * - sitemap 용도이므로 사이즈 크게 설정
 */
const getAllActivities = async (): Promise<ActivityBasicDto[]> => {
  try {
    const res: GetActivitiesResponse = await getActivities({
      size: 1000,
      method: 'cursor',
      cursorId: undefined,
    });

    return res.activities;
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return [];
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const activities = await getAllActivities();

  // 동적 URL 생성
  const activityUrls: MetadataRoute.Sitemap = activities.map((activity: any) => ({
    url: `${SITE_URL}/activity/${activity.id}`,
    lastModified: new Date(activity.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 정적 URL
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return [...staticRoutes, ...activityUrls];
}
