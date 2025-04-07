import { getRandomUsers } from '@/actions/user.action';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import FollowButton from './FollowButton';

async function WhoToFollow() {
  const users = await getRandomUsers();

  // ตรวจสอบว่ามีผู้ใช้หรือไม่ ถ้าไม่มีให้แสดงข้อความแจ้งเตือนแทน null
  if (!users || users.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>People you may know</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm text-center">
            No suggestions available right now.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* เพิ่ม shadow และ hover effect */}
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-semibold text-primary">
          People You May Know
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="space-y-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-md transition-colors duration-150"
            >
              {/* Hover effect และ padding */}
              <div className="flex items-center gap-3">
                {/* ปรับ gap ให้ดูสมดุล */}
                <Link
                  href={`/profile/${user.username}`}
                  className="flex-shrink-0"
                >
                  <Avatar className="w-10 h-10">
                    {/* ปรับขนาด Avatar */}
                    <AvatarImage
                      src={user.image ?? '/avatar.png'}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    {/* เพิ่ม Fallback ถ้ารูปไม่โหลด */}
                  </Avatar>
                </Link>
                <div className="flex-1 min-w-0">
                  {/* min-w-0 เพื่อป้องกัน overflow */}
                  <Link
                    href={`/profile/${user.username}`}
                    className="font-medium text-sm hover:underline text-primary"
                  >
                    {user.name}
                  </Link>
                  <p className="text-xs text-muted-foreground truncate">
                    @{user.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user._count.followers}{' '}
                    {user._count.followers === 1 ? 'follower' : 'followers'}
                    {/* ปรับให้แสดง follower/followers ตามจำนวน */}
                  </p>
                </div>
              </div>
              {/* ปุ่ม Follow (สมมติว่าใช้ Button แทน FollowButton) */}
              <FollowButton />
            </div>
          ))}
        </div>
        {/* เพิ่มลิงก์ See More */}
        {/* <div className="mt-4 text-center">
          <Link
            href="/explore"
            className="text-sm text-primary hover:underline"
          >
            See more suggestions
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
}

export default WhoToFollow;
