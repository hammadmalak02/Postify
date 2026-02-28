const express = require('express');
const multer = require('multer');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const uploadFile = require('./services/storage.service');
const postModel = require('./models/post.model');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const upload = multer({ storage: multer.memoryStorage() });

// Post routes
app.post('/create-post', upload.single('image'), async (req, res) => {
    const result = await uploadFile(req.file.buffer);
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    });
    return res.status(201).json({ message: "Post created successfully!", post });
});

app.get('/posts', async (req, res) => {
    const posts = await postModel.find();
    return res.status(200).json({ message: "Posts fetched successfully!", posts });
});

app.put('/posts/:id', async (req, res) => {
    const post = await postModel.findByIdAndUpdate(
        req.params.id,
        { caption: req.body.caption },
        { new: true }
    );
    return res.status(200).json({ message: "Post updated successfully!", post });
});

app.delete('/posts/:id', async (req, res) => {
    await postModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Post deleted successfully!" });
});

module.exports = app;