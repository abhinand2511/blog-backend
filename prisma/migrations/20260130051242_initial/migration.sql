-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT,
    "content" JSONB NOT NULL,
    "category" TEXT,
    "tags" TEXT[],
    "keywords" TEXT[],
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "readTime" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "robots" JSONB,
    "faq" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_slug_key" ON "Blog"("slug");
