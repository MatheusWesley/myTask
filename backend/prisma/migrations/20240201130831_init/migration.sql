-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
