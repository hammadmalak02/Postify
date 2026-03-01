import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);
    axios.post('http://localhost:3000/create-post', formData)
      .then(() => navigate("/feed"))
      .catch((err) => { console.log(err); setLoading(false); });
  };

  return (
    <div style={styles.page}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.logo}>✦ POSTLY</div>
          <button style={styles.feedBtn} onClick={() => navigate('/feed')}>View Feed →</button>
        </div>

        <div style={styles.card}>
          {/* LEFT */}
          <div style={styles.cardLeft}>
            <h1 style={styles.title}>Create a<br /><span style={styles.accent}>Post</span></h1>
            <p style={styles.subtitle}>Share a moment with the world</p>

            <div
              style={{ ...styles.uploadZone, ...(drag ? styles.uploadDrag : {}), ...(preview ? styles.uploadPreview : {}) }}
              onClick={() => fileRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
            >
              {preview
                ? <img src={preview} alt="preview" style={styles.previewImg} />
                : <div style={styles.placeholder}>
                  <div style={styles.plusIcon}>⊕</div>
                  <div style={styles.uploadText}>Drop image here</div>
                  <div style={styles.uploadHint}>or click to browse</div>
                </div>
              }
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
                onChange={(e) => handleFile(e.target.files[0])} />
            </div>

            {preview && (
              <button style={styles.removeBtn} onClick={() => { setPreview(null); setImage(null); }}>
                ✕ Remove image
              </button>
            )}
          </div>

          {/* RIGHT */}
          <div style={styles.cardRight}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div>
                <label style={styles.label}>CAPTION</label>
                <textarea style={styles.textarea} placeholder="What's on your mind?"
                  value={caption} onChange={(e) => setCaption(e.target.value)} rows={6} />
              </div>

              {image && (
                <div style={styles.fileInfo}>
                  <span>🖼</span>
                  <span style={styles.fileName}>{image.name}</span>
                  <span style={styles.fileSize}>{(image.size / 1024).toFixed(0)} KB</span>
                </div>
              )}

              <button type="submit"
                style={{ ...styles.submitBtn, ...(!image || loading ? styles.submitDisabled : {}) }}
                disabled={!image || loading}>
                {loading
                  ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <span style={styles.spinner} /> Publishing...
                  </span>
                  : '✦ Publish Post'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; margin:0; padding:0; }
        body { background: #080810; }
        textarea { resize: none; }
        textarea:focus { outline: none; border-color: #e8c547 !important; }
        textarea::placeholder { color: #2e2e3e; }
      `}</style>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh', background: '#080810',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Outfit', sans-serif", position: 'relative',
    overflow: 'hidden', padding: '24px',
    animation: 'fadeUp 0.5s ease both',
  },
  blob1: {
    position: 'fixed', top: -120, left: -120, width: 500, height: 500,
    borderRadius: '50%', pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(232,197,71,0.09) 0%, transparent 70%)',
  },
  blob2: {
    position: 'fixed', bottom: -100, right: -100, width: 400, height: 400,
    borderRadius: '50%', pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(255,90,90,0.07) 0%, transparent 70%)',
  },
  container: { width: '100%', maxWidth: 900, zIndex: 1 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  logo: { fontFamily: "'Bebas Neue', cursive", fontSize: 28, letterSpacing: 4, color: '#e8c547' },
  feedBtn: {
    background: 'rgba(232,197,71,0.08)', border: '1px solid rgba(232,197,71,0.25)',
    color: '#e8c547', padding: '8px 20px', borderRadius: 100,
    cursor: 'pointer', fontSize: 13, fontFamily: "'Outfit', sans-serif", fontWeight: 500,
  },
  card: {
    background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 24, padding: '40px',
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
  },
  cardLeft: { display: 'flex', flexDirection: 'column', gap: 20 },
  cardRight: { display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  title: { fontFamily: "'Bebas Neue', cursive", fontSize: 64, lineHeight: 1, color: '#efefef', letterSpacing: 2 },
  accent: { color: '#e8c547' },
  subtitle: { color: '#44445a', fontSize: 14, fontWeight: 300 },
  uploadZone: {
    border: '2px dashed rgba(255,255,255,0.08)', borderRadius: 16,
    aspectRatio: '1/1', cursor: 'pointer', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden', background: 'rgba(255,255,255,0.02)', transition: 'all .2s',
  },
  uploadDrag: { borderColor: '#e8c547', background: 'rgba(232,197,71,0.04)' },
  uploadPreview: { border: '2px solid rgba(232,197,71,0.3)' },
  placeholder: { textAlign: 'center', padding: 20 },
  plusIcon: { fontSize: 48, color: '#2a2a3a', marginBottom: 12 },
  uploadText: { color: '#44445a', fontSize: 15, fontWeight: 500, marginBottom: 6 },
  uploadHint: { color: '#2a2a3a', fontSize: 12 },
  previewImg: { width: '100%', height: '100%', objectFit: 'cover' },
  removeBtn: {
    background: 'none', border: 'none', color: '#44445a',
    fontSize: 12, cursor: 'pointer', fontFamily: "'Outfit', sans-serif", textAlign: 'left', padding: 0,
  },
  form: { display: 'flex', flexDirection: 'column', gap: 24 },
  label: { display: 'block', fontSize: 11, fontWeight: 600, color: '#44445a', letterSpacing: 2, marginBottom: 10 },
  textarea: {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14,
    padding: '16px', color: '#efefef', fontSize: 15,
    fontFamily: "'Outfit', sans-serif", fontWeight: 300, lineHeight: 1.7,
    transition: 'border-color .2s',
  },
  fileInfo: {
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'rgba(232,197,71,0.06)', border: '1px solid rgba(232,197,71,0.15)',
    borderRadius: 12, padding: '12px 16px',
  },
  fileName: { color: '#c8a830', fontSize: 13, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  fileSize: { color: '#44445a', fontSize: 12 },
  submitBtn: {
    background: '#e8c547', color: '#080810', border: 'none',
    borderRadius: 14, padding: 16, fontSize: 15, fontWeight: 700,
    fontFamily: "'Outfit', sans-serif", cursor: 'pointer', letterSpacing: 0.5, transition: 'all .2s',
  },
  submitDisabled: { opacity: 0.35, cursor: 'not-allowed' },
  spinner: {
    width: 16, height: 16, borderRadius: '50%',
    border: '2px solid rgba(8,8,16,0.2)', borderTopColor: '#080810',
    display: 'inline-block', animation: 'spin 0.6s linear infinite',
  },
};

export default CreatePost;