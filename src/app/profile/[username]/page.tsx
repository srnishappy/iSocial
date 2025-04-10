import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from '@/actions/profile.action';
import { notFound } from 'next/navigation';
import ProfilePageClient from './ProfilePageClient';

// ประกาศ type ของ params ที่เป็น object
interface PageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  // await params ก่อนการใช้งาน
  const { username } = await params; // <-- เพิ่มการใช้ await ที่ params

  const user = await getProfileByUsername(username);
  if (!user) return;

  return {
    title: `${user.name ?? user.username}`,
    description: user.bio || `Check out ${user.username}'s profile.`,
  };
}

async function ProfilePageServer({ params }: PageProps) {
  // await params ก่อนการใช้งาน
  const { username } = await params; // <-- เพิ่มการใช้ await ที่ params

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
