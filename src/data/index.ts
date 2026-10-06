import cafesData from './cafes.json';
import districtsData from './districts.json';
import cuppingPostsData from './cuppingPosts.json';
import badgesData from './badges.json';
import vouchersData from './vouchers.json';
import beanStoryData from './beanStory.json';
import userProfileData from './userProfile.json';

import { Cafe, CoffeeDistrict, CuppingNote, BadgeItem, UserProfile } from '../types';

export const MOCK_CAFES = cafesData as unknown as Cafe[];
export const MOCK_DISTRICTS = districtsData as unknown as CoffeeDistrict[];
export const MOCK_CUPPING_POSTS = cuppingPostsData as unknown as CuppingNote[];
export const MOCK_BADGES = badgesData as unknown as BadgeItem[];
export const MOCK_VOUCHERS = vouchersData;
export const MOCK_BEAN_STORY = beanStoryData;
export const INITIAL_USER = userProfileData.user as unknown as UserProfile;
export const INITIAL_PASSPORT_STAMPS = userProfileData.initialPassportStamps;

export default {
  cafes: MOCK_CAFES,
  districts: MOCK_DISTRICTS,
  cuppingPosts: MOCK_CUPPING_POSTS,
  badges: MOCK_BADGES,
  vouchers: MOCK_VOUCHERS,
  beanStory: MOCK_BEAN_STORY,
  user: INITIAL_USER,
  initialPassportStamps: INITIAL_PASSPORT_STAMPS
};
