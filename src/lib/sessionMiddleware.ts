// this middleware will process API requests and make sure that only created users with sessions can access the API

import "server-only";

import {
  Account,
  Client,
  Models,
  type Account as AccountType,
  type Users as UsersType,
} from "node-appwrite";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { AUTH_COOKIE } from "@/lib/auth/constants";

// optional, but essential to have type-safe codebase
// Hono documentation doesn't have third-party middleware for Appwrite
type AdditionalContext = {
  Variables: {
    account: AccountType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
    const session = getCookie(c, AUTH_COOKIE);

    if (!session) return c.json({ error: "Unauthorized" }, 401);

    client.setSession(session);

    const account = new Account(client);
    const user = await account.get();

    c.set("account", account);
    c.set("user", user);

    await next();
  }
);
