import express from "express";
import { saveBlogFromSanityWebhook } from "../services/sanity.services.js";

const router = express.Router();

router.post("/sanity", async (req, res) => {
  console.log(JSON.stringify(req.body, null, 2));

  try {
    const response = await saveBlogFromSanityWebhook(req.body);

    if (response.error) {
      return res
        .status(response.statusCode || 200)
        .json({ message: response.message });
    }

    res.json({
      message: "Blog saved successfully",
      blog: response.blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error processing sanity webhook",
      error: error.message,
    });
  }
});


export default router;
