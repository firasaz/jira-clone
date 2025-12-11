import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { ID, Query } from "node-appwrite";

import { createWorkspaceSchema } from "@/lib/workspaces/schemas";
import { sessionMiddleware } from "@/lib/sessionMiddleware";
import { generateInviteCode } from "@/lib/utils";

import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBERS_ID,
  WORKSPACES_ID,
} from "../../../config";

const app = new Hono()
  .get("/", sessionMiddleware, async c => {
    const databases = c.get("databases");
    const currentUser = c.get("user");

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", currentUser.$id),
    ]);
    if (members.total === 0)
      return c.json({ data: { documents: [], total: 0 } });

    const workspaceIds = members.documents.map(member => member.workspaceId);
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.contains("$id", workspaceIds), Query.orderDesc("$createdAt")]
    );

    return c.json({ data: workspaces });
  })
  .post(
    "/",
    zValidator("form", createWorkspaceSchema),
    sessionMiddleware,
    async c => {
      const user = c.get("user");
      const databases = c.get("databases");
      const storage = c.get("storage");

      const { name, image } = c.req.valid("form");

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

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
          inviteCode: generateInviteCode(10),
        }
      );

      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        userId: user.$id,
        workspaceId: workspace.$id,
        role: "ADMIN",
      });

      return c.json({ data: workspace });
    }
  );

export default app;
