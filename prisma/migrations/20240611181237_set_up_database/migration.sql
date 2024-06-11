-- CreateEnum
CREATE TYPE "permission" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Role" "permission" NOT NULL DEFAULT 'USER',
    "BirthDay" TIMESTAMP(3),
    "Name" TEXT NOT NULL,
    "Description" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Phone" TEXT,
    "Description" TEXT,
    "Rating" DOUBLE PRECISION,
    "Latitude" DOUBLE PRECISION NOT NULL,
    "Longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "CheckIn" (
    "Id" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "HotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validatedAt" TIMESTAMP(3),

    CONSTRAINT "CheckIn_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "Id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Value" DOUBLE PRECISION NOT NULL,
    "Description" TEXT,
    "UserId" TEXT NOT NULL,
    "HotelId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_Name_key" ON "Hotel"("Name");

-- AddForeignKey
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotel"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotel"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
