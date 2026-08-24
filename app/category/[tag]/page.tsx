import { getAllPosts } from "../../lib/posts";

type Props = {
  params: Promise<{ tag: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { tag } = await params;
  const label = tag.charAt(0).toUpperCase() + tag.slice(1);
  const posts = getAllPosts().filter(
    (p) => p.tag.toLowerCase() === tag.toLowerCase()
  );

  return (
    <main style={{ maxWidth: "860px", margin: "0 auto", padding: "3rem 2rem", fontFamily: "sans-serif", color: "#1a1a1a" }}>
      <a href="/" style={{ fontSize: "12px", color: "#6b4fa0", textDecoration: "none", display: "inline-block", marginBottom: "2rem" }}>
        ← Back to FaultLines
      </a>
      <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#6b4fa0", fontWeight: 600, marginBottom: "0.5rem" }}>
        Category
      </div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: 500, marginBottom: "2.5rem", letterSpacing: "-0.5px" }}>
        {label}
      </h1>
      {posts.length === 0 ? (
        <p style={{ color: "#888", fontSize: "15px" }}>No articles in this category yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
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
      )}
    </main>
  );
}