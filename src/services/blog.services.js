import db from "../utils/db.js";

async function getAllBlogs() {
  const result = async () => {
    const blogs = await db.blog.findMany({
      orderBy: { publishedAt: "desc" },
    });

    return { error: false, blogs };
  };

  try {
    return await result();
  } catch (error) {
    console.error("[getAllBlogs] Error:", error);
    return {
      error: true,
      statusCode: 500,
      message: "Unable to fetch blogs",
    };
  }
}

async function getBlogBySlug(slug) {
  const result = async () => {
    const blog = await db.blog.findUnique({
      where: {
        slug,
      },
    });

    if (!blog) {
      return {
        error: true,
        statusCode: 200,
        message: "Blog not found",
      };
    }

    return { error: false, blog };
  };

  try {
    return await result();
  } catch (error) {
    console.error("[getBlogBySlug] Error:", error);
    return {
      error: true,
      statusCode: 500,
      message: "Unable to fetch blog by slug",
    };
  }
}

export {
  getAllBlogs,
  getBlogBySlug,
};
