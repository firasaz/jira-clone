import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import z from "zod";

import { ID, Query } from "node-appwrite";

import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECTS_ID } from "@/config";

import { sessionMiddleware } from "@/lib/sessionMiddleware";

import { getMember } from "@/lib/workspaces/utils";
import { createProjectSchema } from "./schema";

const app = new Hono()
  .get(
    "/",
    sessionMiddleware,
    zValidator("query", z.object({ workspaceId: z.string() })),
    async c => {
      const user = c.get("user");
      const databases = c.get("databases");

      const { workspaceId } = c.req.valid("query");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });
      if (!member) return c.json({ error: "Unauthorized" }, 401);

      const projects = await databases.listDocuments(DATABASE_ID, PROJECTS_ID, [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ]);

      return c.json({ data: projects });
    }
  )
  .post(
    "/",
    zValidator("form", createProjectSchema),
    sessionMiddleware,
    async c => {
      const user = c.get("user");
      const databases = c.get("databases");
      const storage = c.get("storage");

      const { name, image, workspaceId } = c.req.valid("form");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });
      if (!member) return c.json({ error: "Unauthorized" }); // any member can create projects, but they need to be a member

      let uploadedImageUrl: string | undefined;
      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image
        );
        //       In Node (server) using the Node Appwrite SDK (node-appwrite),
        // getFileView() does NOT return a URL.
        // It returns a Promise that resolves to an ArrayBuffer (file bytes).

        // const arrayBuffer = await storage.getFilePreview(
        //   IMAGES_BUCKET_ID,
        //   file.$id
        // );
        // uploadedImageUrl = `data:image/png;base64,${Buffer.from(
        //   arrayBuffer
        // ).toString("base64")}`;
        // Construct the URL manually — this works for Node SDK
        uploadedImageUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${IMAGES_BUCKET_ID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
      }

      const project = await databases.createDocument(
        DATABASE_ID,
        PROJECTS_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
          workspaceId,
        }
      );

      return c.json({ data: project });
    }
  );

export default app;
