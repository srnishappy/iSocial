import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from '@/actions/profile.action';
import { notFound } from 'next/navigation';
import ProfilePageClient from './ProfilePageClient';

// ประกาศ type ให้ชัดเจน
type PageProps = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  // ใช้ await ก่อนเข้าถึง params
  const { username } = await params; // ทำให้แน่ใจว่า params ถูก resolve ก่อนใช้

  const user = await getProfileByUsername(username);
  if (!user) return;

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

async function ProfilePageServer({ params }: PageProps) {
  const { username } = await params; // ใช้ await ก่อน
  const user = await getProfileByUsername(username);

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

export default ProfilePageServer;
