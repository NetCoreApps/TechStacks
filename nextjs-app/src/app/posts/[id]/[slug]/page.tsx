'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as gateway from '@/lib/api/gateway';

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postId = parseInt(id);
        const response = await gateway.getPost(postId);
        setPost(response.post);
        setComments(response.comments || []);
      } catch (err) {
        console.error('Failed to load post:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-normal text-red-600">
          <span className="mr-2">⚠</span>
          Post was not found
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h1 className="text-3xl font-normal mb-4">
            {post.url ? (
              <a href={post.url} className="text-blue-600 hover:underline">
                {post.title}
              </a>
            ) : (
              post.title
            )}
          </h1>

          <div className="text-sm text-gray-600 mb-4">
            submitted {new Date(post.created).toLocaleString()} by{' '}
            <a href={`/users/${post.createdBy}`} className="text-blue-600 hover:underline">
              @{post.createdBy}
            </a>
          </div>

          {post.imageUrl && (
            <div className="mb-4">
              <a href={post.url}>
                <img src={post.imageUrl} alt="post image" className="max-w-full h-auto" />
              </a>
            </div>
          )}

          {post.contentHtml && (
            <div className="prose max-w-none mb-4">
              <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
              {post.url && (
                <div className="mt-4">
                  <a href={post.url} className="text-blue-600 hover:underline">
                    continue reading
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-4">
            {comments.length === 0
              ? 'No Comments'
              : comments.length === 1
              ? '1 Comment'
              : `All ${comments.length} comments`}
          </h2>

          {comments.length > 0 && (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-l-2 border-gray-300 pl-4">
                  <div className="text-sm text-gray-600 mb-2">
                    <a
                      href={`/users/${comment.userId}`}
                      className="text-blue-600 hover:underline"
                    >
                      @{comment.userId}
                    </a>{' '}
                    · {new Date(comment.created).toLocaleString()}
                  </div>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: comment.contentHtml || comment.content }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

