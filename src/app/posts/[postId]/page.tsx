import ClapButton from "@/components/ClapButton";
import { delay } from "@/lib/utils";
import { BlogPost, BlogPostsResponse } from "@/models/BlogPost";
import { Metadata } from "next";
import { notFound } from "next/navigation";
// import { cache } from "react";

interface BlogPostPageProps {
  params: { postId: string };
}

export async function generateStaticParams() { // Data is retrieved in advance to avoid dynamic rendering.
  const response = await fetch("https://dummyjson.com/posts");
  const { posts }: BlogPostsResponse = await response.json();

  return posts.map(({ id }) => id); // .slice(0, 5) // In cases of a large amount of data, you can also use 'slice' to limit the amount of (or delegate specific) data to be cached initially. Anything beyond it will be cached after first request.
}

// Manually deduplicate requests if not using fetch
// const getPost = cache(async (postId: string) => {
//   const post = await prisma.post.findUnique(postId);
//   return post;
// })

export async function generateMetadata({ // Dynamically generate metadata based on the Post (Cannot be 'use client')
  params: { postId },
}: BlogPostPageProps): Promise<Metadata> {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  const post: BlogPost = await response.json();

  return {
    title: post.title,
    description: post.body,
    // openGraph: {
    //   images: [
    //     {
    //       url: post.imageUrl
    //     }
    //   ]
    // }
    // robots: {
    //   index: false,
    //   follow: true,
    // },
  };
}

export default async function BlogPostPage({
  params: { postId },
}: BlogPostPageProps) {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  const { title, body }: BlogPost = await response.json();

  if (response.status === 404) {
    notFound();
  }

  await delay(1000);

  return (
    <article className="max-w-prose m-auto space-y-5">
      <h1 className="text-3xl text-center font-bold">{title}</h1>
      <p className="text-lg">{body}</p>
      <ClapButton />
    </article>
  );
}