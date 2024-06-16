-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('WEB', 'APP', 'SOFTWARE', 'CIRCUITS', 'OTHER');

-- CreateTable
CREATE TABLE "ContactFormSubmission" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "businessName" TEXT,
    "projectType" "ProjectType" NOT NULL,
    "phoneNumber" TEXT,
    "location" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactFormSubmission_pkey" PRIMARY KEY ("id")
);
