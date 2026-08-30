import { MongoClient } from "mongodb";

let client;
let clientPromise;

export async function getDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI environment variable is missing"
    );
  }

  if (!clientPromise) {
    client = new MongoClient(
      process.env.MONGODB_URI
    );

    clientPromise = client.connect();
  }

  await clientPromise;

  const databaseName =
    process.env.MONGODB_DB ||
    "smart-library";

  return client.db(databaseName);
}