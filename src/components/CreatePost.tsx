'use client';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

function CreatePost() {
  const { user } = useUser();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  return <div>CreatePost</div>;
}
export default CreatePost;
