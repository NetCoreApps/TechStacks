'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import routes from '@/lib/utils/routes';

interface Post {
  id: number;
  slug: string;
  title: string;
  type: string;
  imageUrl?: string;
  points: number;
  upVotes: number;
  downVotes: number;
  commentsCount: number;
  created: string;
  createdBy: string;
  technologyIds?: number[];
  labels?: string[];
}

interface PostsListProps {
  posts: Post[];
}

export function PostsList({ posts }: PostsListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
        <p className="text-blue-800">No posts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 flex-1">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
        >
          <div className="flex gap-4">
            {/* Voting */}
            <div className="flex flex-col items-center space-y-1 text-gray-500">
              <button className="hover:text-green-600" title="Upvote">
                ▲
              </button>
              <span className="font-semibold text-lg">{post.points || 0}</span>
              <button className="hover:text-red-600" title="Downvote">
                ▼
              </button>
            </div>

            {/* Post Content */}
            <div className="flex-1">
              <div className="flex items-start gap-3">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <Link
                    href={routes.post(post.id, post.slug)}
                    className="text-xl font-semibold text-gray-900 hover:text-primary-600"
                  >
                    {post.title}
                  </Link>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                      {post.type}
                    </span>
                    <span>by {post.createdBy}</span>
                    <span>
                      {formatDistanceToNow(new Date(post.created), { addSuffix: true })}
                    </span>
                    <Link
                      href={routes.post(post.id, post.slug)}
                      className="hover:text-primary-600"
                    >
                      {post.commentsCount || 0} comments
                    </Link>
                  </div>
                  {post.labels && post.labels.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {post.labels.map((label) => (
                        <span
                          key={label}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
