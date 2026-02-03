import db from "../utils/db.js";

async function saveBlogFromSanityWebhook(payload) {
  const result = async () => {
    if (!payload?._id) {
      return {
        error: true,
        statusCode: 400,
        message: "Invalid Sanity payload",
      };
    }

    const blogData = {
      sanityId: payload._id,

      title: payload.title,
      slug: payload.slug?.current,

      description: payload.description || null,
      author: payload.author || "Admin",

      category: payload.category || null,
      readTime: payload.readTime || null,

      keywords: payload.keywords || [],
      tags: payload.tags || [],

      robots: payload.robots || { index: true, follow: true },

      image: payload.mainImage
        ? {
            url: payload.mainImage.asset?.url,
            alt: payload.mainImage.alt || null,
          }
        : null,

      content: payload.content || [],
      faq: payload.faq || [],

      publishedAt: payload.publishedAt
        ? new Date(payload.publishedAt)
        : new Date(),
    };

    const blog = await db.blog.upsert({
      where: { sanityId: payload._id },
      update: blogData,
      create: blogData,
    });

    return { error: false, blog };
  };

  try {
    return await result();
  } catch (error) {
    console.error("[saveBlogFromSanityWebhook]", error);
    return {
      error: true,
      statusCode: 500,
      message: "Failed to save blog",
    };
  }
}

export { saveBlogFromSanityWebhook };
