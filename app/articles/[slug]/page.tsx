import { getPostBySlug, getAllPosts } from "../../lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.title} | Volta`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://voltaweekly.com/articles/${slug}`,
      siteName: "Volta",
      locale: "en_GB",
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <main style={{ maxWidth: "680px", margin: "0 auto", padding: "3rem 2rem", fontFamily: "sans-serif", color: "#1a1a1a" }}>
      <a href="/" style={{ fontSize: "12px", color: "#6b4fa0", textDecoration: "none", display: "inline-block", marginBottom: "2rem" }}>
        ← Back to Volta
      </a>
      <div style={{ marginBottom: "0.75rem" }}>
        <span style={{ background: "#e3f2ea", color: "#1e5c38", padding: "2px 9px", borderRadius: "99px", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>
          {post.tag}
        </span>
      </div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: 500, lineHeight: 1.2, marginBottom: "1rem", letterSpacing: "-0.5px" }}>
        {post.title}
      </h1>
      <div style={{ fontSize: "13px", color: "#888", marginBottom: "2.5rem" }}>{post.date}</div>
      <style>{`
        .article-body p { margin-bottom: 1.5rem; }
        .article-body h2 { font-family: Georgia, serif; font-size: 22px; font-weight: 500; margin: 2.5rem 0 1rem; }
      `}</style>
      <div className="article-body" style={{ fontSize: "16px", lineHeight: 1.8, color: "#333" }}>
        <MDXRemote source={post.content} />
      </div>
      <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #ede9f5", fontSize: "13px", color: "var(--foreground)" }}>
        Written by <span style={{ color: "#1a1a1", fontWeight: 500 }}>Ruqayya Ghuwel</span>
      </div>
    </main>
  );
}