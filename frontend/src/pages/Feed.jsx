import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then((res) => { setPosts(res.data.posts); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo}>✦ POSTLY</div>
          <button style={styles.createBtn} onClick={() => navigate('/create-post')}>
            ＋ Create Post
          </button>
        </div>
      </nav>

      <div style={styles.container}>
        {/* Page Title */}
        <div style={styles.pageHeader}>
          <h1 style={styles.title}>Your <span style={styles.accent}>Feed</span></h1>
          <p style={styles.subtitle}>{posts.length} {posts.length === 1 ? 'post' : 'posts'} shared</p>
        </div>

        {/* Loading */}
        {loading && (
          <div style={styles.center}>
            <div style={styles.loadingRing} />
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>◎</div>
            <div style={styles.emptyTitle}>No posts yet</div>
            <div style={styles.emptySubtitle}>Be the first to share something!</div>
            <button style={styles.emptyBtn} onClick={() => navigate('/create-post')}>
              Create First Post
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {!loading && posts.length > 0 && (
          <div style={styles.grid}>
            {posts.map((post, i) => (
              <PostCard key={post._id} post={post} index={i} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cardIn { from { opacity:0; transform:translateY(30px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        * { box-sizing: border-box; margin:0; padding:0; }
        body { background: #080810; }
      `}</style>
    </div>
  );
};

// ── Post Card ──────────────────────────────────────────────────────────────
const PostCard = ({ post, index }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div style={{ ...cardStyles.card, animationDelay: `${index * 0.08}s` }}>
      {/* Image */}
      <div style={cardStyles.imgWrap}>
        {!imgLoaded && <div style={cardStyles.imgSkeleton}><div style={cardStyles.skeletonShimmer} /></div>}
        <img
          src={post.image}
          alt={post.caption}
          style={{ ...cardStyles.img, opacity: imgLoaded ? 1 : 0 }}
          onLoad={() => setImgLoaded(true)}
        />
        {/* Overlay on hover */}
        <div style={cardStyles.overlay} className="card-overlay" />
      </div>

      {/* Bottom */}
      <div style={cardStyles.bottom}>
        <p style={cardStyles.caption}>{post.caption || 'No caption'}</p>
        <div style={cardStyles.actions}>
          <button
            style={{ ...cardStyles.likeBtn, ...(liked ? cardStyles.likeBtnActive : {}) }}
            onClick={() => setLiked(!liked)}
          >
            {liked ? '♥' : '♡'} {liked ? 'Liked' : 'Like'}
          </button>
          <div style={cardStyles.dot} />
        </div>
      </div>
    </div>
  );
};

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: '100vh', background: '#080810',
    fontFamily: "'Outfit', sans-serif",
    position: 'relative', overflow: 'hidden',
    animation: 'fadeUp 0.4s ease both',
  },
  blob1: {
    position: 'fixed', top: -80, right: -80, width: 450, height: 450,
    borderRadius: '50%', pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(232,197,71,0.07) 0%, transparent 70%)',
  },
  blob2: {
    position: 'fixed', bottom: -100, left: -80, width: 400, height: 400,
    borderRadius: '50%', pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(100,100,255,0.06) 0%, transparent 70%)',
  },
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(8,8,16,0.85)', backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  navInner: {
    maxWidth: 1000, margin: '0 auto', padding: '16px 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  logo: { fontFamily: "'Bebas Neue', cursive", fontSize: 26, letterSpacing: 4, color: '#e8c547' },
  createBtn: {
    background: '#e8c547', color: '#080810', border: 'none',
    padding: '9px 20px', borderRadius: 100, cursor: 'pointer',
    fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif", letterSpacing: 0.3,
  },
  container: { maxWidth: 1000, margin: '0 auto', padding: '40px 24px' },
  pageHeader: { marginBottom: 40 },
  title: { fontFamily: "'Bebas Neue', cursive", fontSize: 56, color: '#efefef', letterSpacing: 2, lineHeight: 1 },
  accent: { color: '#e8c547' },
  subtitle: { color: '#44445a', fontSize: 14, marginTop: 8 },
  center: { display: 'flex', justifyContent: 'center', paddingTop: 100 },
  loadingRing: {
    width: 40, height: 40, borderRadius: '50%',
    border: '3px solid rgba(232,197,71,0.15)', borderTopColor: '#e8c547',
    animation: 'spin 0.7s linear infinite',
  },
  empty: {
    textAlign: 'center', paddingTop: 100, paddingBottom: 60,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
  },
  emptyIcon: { fontSize: 64, color: '#2a2a3a', marginBottom: 8 },
  emptyTitle: { color: '#efefef', fontSize: 22, fontWeight: 600 },
  emptySubtitle: { color: '#44445a', fontSize: 14 },
  emptyBtn: {
    marginTop: 12, background: 'rgba(232,197,71,0.1)', border: '1px solid rgba(232,197,71,0.3)',
    color: '#e8c547', padding: '10px 24px', borderRadius: 100,
    cursor: 'pointer', fontSize: 14, fontFamily: "'Outfit', sans-serif", fontWeight: 500,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 20,
  },
};

const cardStyles = {
  card: {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 20, overflow: 'hidden',
    transition: 'transform .25s, box-shadow .25s',
    animation: 'cardIn 0.5s ease both',
    cursor: 'pointer',
  },
  imgWrap: { position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#0f0f1a' },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.3s, transform 0.4s' },
  imgSkeleton: {
    position: 'absolute', inset: 0, background: '#0f0f1a', overflow: 'hidden',
  },
  skeletonShimmer: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
    animation: 'spin 1.5s linear infinite',
  },
  overlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to top, rgba(8,8,16,0.6) 0%, transparent 50%)',
    opacity: 0, transition: 'opacity .3s',
  },
  bottom: { padding: '16px 20px 20px' },
  caption: { color: '#c8c8d8', fontSize: 14, lineHeight: 1.6, fontWeight: 300, marginBottom: 14 },
  actions: { display: 'flex', alignItems: 'center', gap: 12 },
  likeBtn: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#888899', padding: '6px 14px', borderRadius: 100,
    cursor: 'pointer', fontSize: 13, fontFamily: "'Outfit', sans-serif",
    transition: 'all .2s',
  },
  likeBtnActive: {
    background: 'rgba(255,80,80,0.12)', border: '1px solid rgba(255,80,80,0.3)', color: '#ff6060',
  },
  dot: {
    width: 6, height: 6, borderRadius: '50%',
    background: 'rgba(232,197,71,0.4)',
  },
};

export default Feed;