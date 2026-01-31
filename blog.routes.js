import express from "express";
import { getAllBlogs, getBlogBySlug } from "../services/blog.services.js";

const router = express.Router();

router.get("/fetchAllBlogs", async (req, res) => {
  /* #swagger.tags = ['Blog']
     #swagger.description = 'Get all blogs'
  */
  try {
    const response = await getAllBlogs();

    if (response.error) {
      return res
        .status(response.statusCode)
        .json({ message: response.message });
    }

    res.json(response.blogs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching blogs",
      error: error.message,
    });
  }
});

router.get("/fetchBlogBySlug/:slug", async (req, res) => {
  /* #swagger.tags = ['Blog']
     #swagger.description = 'Get blog by slug'
  */
  try {
    const slug = req.params.slug;
    const response = await getBlogBySlug(slug);

    if (response.error) {
      return res
        .status(response.statusCode)
        .json({ message: response.message });
    }

    res.json(response.blog);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching blog",
      error: error.message,
    });
  }
});

export default router;
