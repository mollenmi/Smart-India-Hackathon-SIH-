import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post';
import CreatePost from './CreatePost';
import { PostType } from '../types';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  
  // Mock data for posts
  const generateMockPosts = (startIndex: number, count: number): PostType[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: startIndex + i,
      username: `user_${(startIndex + i) % 10 + 1}`,
      avatar: `https://randomuser.me/api/portraits/${(startIndex + i) % 2 === 0 ? 'women' : 'men'}/${(startIndex + i) % 10 + 1}.jpg`,
      imageUrl: `https://picsum.photos/id/${(startIndex + i) * 5}/800/600`,
      caption: `This is a sample post caption for post #${startIndex + i}. #beyondclassroom #learning`,
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 50),
      timestamp: new Date(Date.now() - (startIndex + i) * 3600000).toISOString(),
      commentList: [],
    }));
  };

  useEffect(() => {
    // Initial load of posts
    setPosts(generateMockPosts(0, 5));
  }, []);

  const fetchMoreData = () => {
    // Simulate API call to get more posts
    setTimeout(() => {
      if (posts.length >= 30) {
        setHasMore(false);
        return;
      }
      
      setPosts([...posts, ...generateMockPosts(posts.length, 5)]);
    }, 1500);
  };

  const handleAddPost = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6">
      {/* Create Post Component */}
      <div className="mb-6">
        <CreatePost onPostCreate={handleAddPost} />
      </div>
      
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center my-4">
            <div className="animate-pulse text-gray-400">Loading more posts...</div>
          </div>
        }
        endMessage={
          <div className="text-center text-gray-500 my-4">
            You've reached the end!
          </div>
        }
      >
        <div className="space-y-6">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Feed; 