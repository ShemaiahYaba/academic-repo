import React, { useEffect, useRef, useState } from "react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";

// Helper functions and types
type Post = {
  id: number;
  user: { name: string; avatar: string };
  time: string;
  description: string;
  media: { src: string; alt: string };
  stats: { likes: number; comments: number; reposts: number };
};

const randomUsers = [
  {
    name: "Alice Newton",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    name: "Bob Smith",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    name: "Cathy Lee",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    name: "Eva Green",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
  },
];

const randomDescriptions = [
  "Exploring the wonders of the universe!",
  "Just finished a great book on AI.",
  "Nature walks are the best therapy.",
  "Learning TypeScript is fun!",
  "Check out this amazing sunset.",
];

const randomMedia = [
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    alt: "Science is fun",
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    alt: "AI taking our jobs",
  },
  {
    src: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
    alt: "Math themed post media",
  },
  {
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    alt: "AI themed post media",
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    alt: "Nature themed post media",
  },
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomPost(id: number): Post {
  const user = randomUsers[getRandomInt(0, randomUsers.length - 1)];
  const description =
    randomDescriptions[getRandomInt(0, randomDescriptions.length - 1)];
  const media = randomMedia[getRandomInt(0, randomMedia.length - 1)];
  const stats = {
    likes: getRandomInt(1, 1000),
    comments: getRandomInt(0, 500),
    reposts: getRandomInt(0, 300),
  };
  const time = `${getRandomInt(1, 12)} hours ago`;
  return { id, user, time, description, media, stats };
}

const Post: React.FC<{ post: Post }> = ({ post }) => (
  <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-4 space-y-4">
    {/* Post Header */}
    <div className="flex items-center space-x-3">
      <img
        src={post.user.avatar}
        alt="User avatar"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <div className="font-semibold text-gray-900">{post.user.name}</div>
        <div className="text-xs text-gray-500">{post.time}</div>
      </div>
    </div>

    {/* Post Description */}
    <div className="text-gray-800">{post.description}</div>

    {/* Post Media */}
    <div>
      <img
        src={post.media.src}
        alt={post.media.alt}
        className="rounded-lg w-full object-cover"
      />
    </div>

    {/* Post Stats */}
    <div className="flex items-center justify-between text-sm text-gray-500">
      <div className="flex items-center space-x-1">
        <HeartIcon className="h-5 w-5 text-pink-500 fill-pink-500" />
        <span>{post.stats.likes}</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          <span>{post.stats.comments}</span>
        </div>
        <div className="flex items-center space-x-1">
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          <span>{post.stats.reposts}</span>
        </div>
      </div>
    </div>

    {/* Post Actions */}
    <div className="flex justify-between border-t pt-2 text-gray-600">
      <button className="flex items-center space-x-1 hover:text-pink-500 transition">
        <HeartIcon className="h-5 w-5" />
        <span>Like</span>
      </button>
      <button className="flex items-center space-x-1 hover:text-blue-500 transition">
        <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
        <span>Comment</span>
      </button>
      <button className="flex items-center space-x-1 hover:text-green-500 transition">
        <ArrowPathRoundedSquareIcon className="h-5 w-5" />
        <span>Repost</span>
      </button>
    </div>
  </div>
);

const RandomPostBox: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(() =>
    Array.from({ length: 5 }, (_, i) => generateRandomPost(i + 1))
  );
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPosts((prev) => [
          ...prev,
          ...Array.from({ length: 3 }, (_, i) =>
            generateRandomPost(prev.length + i + 1)
          ),
        ]);
      }
    };
    const option = { root: null, rootMargin: "20px", threshold: 1.0 };
    const observer = new window.IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <div ref={loader} />
    </>
  );
};

export { RandomPostBox };
