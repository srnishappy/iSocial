// app/profile/[username]/page.tsx

import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from '@/actions/profile.action';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProfilePageClient from './ProfilePageClient';

type Props = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getProfileByUsername(params.username);
  if (!user) return {};

  return {
    title: user.name ?? user.username,
    description: user.bio ?? `Check out ${user.username}'s profile.`,
  };
}

export default async function Page({ params }: Props) {
  const user = await getProfileByUsername(params.username);
  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id),
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}
