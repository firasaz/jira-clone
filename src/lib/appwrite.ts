// this middleware is used to process API requests using admin privileges to Appwrite to give access to new users

/**
 * createAdminClient — server-only helper to create an Appwrite admin client.
 *
 * This module is intended to run only on the server (`import "server-only"`).
 * It constructs a `Client` configured with the project endpoint and an
 * administrative API key (from environment variables) and returns an
 * object exposing Appwrite SDK instances (currently `account`) for
 * performing privileged operations such as creating users.
 *
 * Required environment variables:
 * - `NEXT_PUBLIC_APPWRITE_ENDPOINT` — Appwrite server endpoint
 * - `NEXT_PUBLIC_APPWRITE_PROJECT`  — Appwrite project ID
 * - `NEXT_APPWRITE_KEY`            — Admin API key (keep secret; server-only)
 *
 * Example usage (server route):
 * ```ts
 * const { account } = await createAdminClient();
 * await account.create(...)
 * ```
 */

import "server-only";

import { Client, Account, Storage, Users, Databases } from "node-appwrite";

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  const account = new Account(client);
  return { account };
  // return {
  //   get account() {
  //     return new Account(client);
  //   },
  // };
};
