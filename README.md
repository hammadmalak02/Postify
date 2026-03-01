Postify

A modern, minimal photo-sharing web app where users can create posts with images and captions, and browse a beautiful dark-themed feed.

## 🖼️ Features

- **Create Posts** — Upload images with captions via drag-and-drop or file picker
- **Live Feed** — Browse all posts in a responsive masonry grid
- **Image Hosting** — Images are uploaded and stored via **ImageKit**
- **Like Posts** — Interactive like button on each post card
- **Real-time Ready** — Socket.IO integrated for real-time capabilities
- **Skeleton Loading** — Smooth loading states while images fetch

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 19 | UI Framework |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP requests |
| Socket.IO Client | Real-time communication |
| Vite | Build tool & dev server |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| ImageKit (Node SDK) | Cloud image storage |
| Multer | File upload handling |
| Socket.IO | Real-time communication |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Cookie Parser | Cookie management |
| dotenv | Environment variables |

---

## 📁 Project Structure

```
Postify/
├── Backend/
│   ├── server.js               # Entry point, starts server
│   ├── package.json
│   └── src/
│       ├── app.js              # Express app, routes
│       ├── db/
│       │   └── db.js           # MongoDB connection
│       ├── models/
│       │   ├── post.model.js   # Post schema (image, caption)
│       │   └── user.model.js   # User schema (username, password)
│       └── services/
│           └── storage.service.js  # ImageKit upload service
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx             # Routes setup
        ├── main.jsx
        └── pages/
            ├── CreatePost.jsx  # Post creation page
            └── Feed.jsx        # Posts feed page
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- ImageKit account ([imagekit.io](https://imagekit.io))

---

### 1. Clone the Repository

```bash
git clone https://github.com/hammadmalak02/Postify
cd Postify
```

---

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
node server.js
```

Server will run on **http://localhost:3000**

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on **http://localhost:5173**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/create-post` | Create a new post (multipart/form-data) |
| `GET` | `/posts` | Fetch all posts |
| `PUT` | `/posts/:id` | Update post caption |
| `DELETE` | `/posts/:id` | Delete a post |

---

## 📸 Usage

1. Open the app — you'll be redirected to the **Feed** page
2. Click **"+ Create Post"** to go to the create page
3. Drag & drop or click to upload an image
4. Add a caption and click **"✦ Publish Post"**
5. You'll be redirected back to the feed where your post appears
