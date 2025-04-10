'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import {
  ImageIcon,
  Loader2Icon,
  SendIcon,
  XIcon,
  SmileIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import { createPost } from '@/actions/post.action';
import toast from 'react-hot-toast';
import ImageUpload from './ui/ImageUpload';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function CreatePost() {
  const { user } = useUser();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // เพิ่ม state สำหรับ Picker
  const textareaRef = useRef(null);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
  };

  const handleEmojiSelect = (emoji) => {
    setContent((prev) => prev + emoji.native); // เพิ่มอิโมจิที่เลือกเข้าไปใน textarea
    setShowEmojiPicker(false); // ปิด Picker หลังเลือก
    if (textareaRef.current) textareaRef.current.focus(); // โฟกัสกลับไปที่ textarea
  };

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;

    setIsPosting(true);
    try {
      const result = await createPost(content, imageUrl);
      if (result?.success) {
        setContent('');
        setImageUrl('');
        setShowImageUpload(false);
        toast.success('Post created successfully!', {
          icon: '🎉',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  const focusTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <Card className="mb-6 shadow-md transition-all hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4" onClick={focusTextarea}>
            <Avatar className="w-12 h-12 ring-2 ring-primary/20">
              <AvatarImage src={user?.imageUrl || '/avatar.png'} />
            </Avatar>
            <div className="flex-1">
              <div className="text-sm font-medium mb-1">
                {user?.fullName || 'You'}
              </div>
              <Textarea
                ref={textareaRef}
                placeholder="What's on your mind?"
                className="min-h-[120px] resize-none border rounded-lg focus-visible:ring-1 focus-visible:ring-primary p-3 text-base transition-all"
                value={content}
                onChange={handleContentChange}
                disabled={isPosting}
              />
            </div>
          </div>

          {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4 relative">
              {!imageUrl && (
                <p className="text-sm text-muted-foreground mb-2">
                  Add your image
                </p>
              )}
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
              {imageUrl && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full"
                  onClick={() => setImageUrl('')}
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}

          {showEmojiPicker && (
            <div className="absolute z-10">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                theme="light" // หรือ "dark" ตามที่คุณต้องการ
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                onClick={() => setShowImageUpload(!showImageUpload)}
                disabled={isPosting}
                title="Add an image"
              >
                <ImageIcon className="h-5 w-5 mr-2" />
                Photo
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)} // แสดง/ซ่อน Picker
                disabled={isPosting}
                title="Add emoji"
              >
                <SmileIcon className="h-5 w-5 mr-2" />
                Emoji
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {imageUrl && (
                <div className="px-2 py-1 text-xs border rounded-md flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" /> 1 Image
                </div>
              )}
              <Button
                className="flex items-center bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleSubmit}
                disabled={(!content.trim() && !imageUrl) || isPosting}
              >
                {isPosting ? (
                  <>
                    <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <SendIcon className="h-4 w-4 mr-2" />
                    Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreatePost;
