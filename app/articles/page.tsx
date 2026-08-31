import { getAllPosts } from "../lib/posts";

export default async function AllArticlesPage() {
  const posts = getAllPosts();

  return (
    <main style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem 2rem", fontFamily: "sans-serif", color: "#1a1a1a" }}>
      <a href="/" style={{ fontSize: "12px", color: "#6b4fa0", textDecoration: "none", display: "inline-block", marginBottom: "2rem" }}>
        ← Back to Volta
      </a>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: 500, marginBottom: "2.5rem", letterSpacing: "-0.5px" }}>
        All articles
      </h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {posts.map((post) => (
          <a key={post.slug} href={`/articles/${post.slug}`} style={{ borderTop: "1px solid #ede9f5", paddingTop: "1.25rem", paddingBottom: "1.25rem", textDecoration: "none", display: "block" }}>
            <div style={{ fontSize: "11px", color: "#888", marginBottom: "0.4rem" }}>{post.date}</div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 500, lineHeight: 1.3, color: "#1a1a1a", marginBottom: "0.5rem" }}>
              {post.title}
            </h2>
            <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.65 }}>{post.excerpt}</p>
          </a>
        ))}
      </div>
    </main>
  );
}