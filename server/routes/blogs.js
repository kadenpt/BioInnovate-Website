import express from "express";
import db from "../db/connection.js";

const router = express.Router();

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await db.collection("blogs").find({}).toArray();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// GET single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const { ObjectId } = await import("mongodb");
    const blog = await db.collection("blogs").findOne({ _id: new ObjectId(req.params.id) });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// POST create new blog
router.post("/", async (req, res) => {
  try {
    const { title, snippet, content, author, imageUrl } = req.body;
    
    // Validation
    if (!title || !snippet || !content || !author) {
      return res.status(400).json({ error: "Title, snippet, content, and author are required" });
    }

    const newBlog = {
      title,
      snippet,
      content,
      author,
      imageUrl: imageUrl || "",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("blogs").insertOne(newBlog);
    res.status(201).json({ 
      message: "Blog created successfully", 
      blogId: result.insertedId,
      blog: { ...newBlog, _id: result.insertedId }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// PUT update blog
router.put("/:id", async (req, res) => {
  try {
    const { ObjectId } = await import("mongodb");
    const { title, snippet, content, author, imageUrl } = req.body;
    
    const updateData = {
      ...(title && { title }),
      ...(snippet && { snippet }),
      ...(content && { content }),
      ...(author && { author }),
      ...(imageUrl !== undefined && { imageUrl }),
      updatedAt: new Date()
    };

    const result = await db.collection("blogs").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// DELETE blog
router.delete("/:id", async (req, res) => {
  try {
    const { ObjectId } = await import("mongodb");
    const result = await db.collection("blogs").deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

export default router; 