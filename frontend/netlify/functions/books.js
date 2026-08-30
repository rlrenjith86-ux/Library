import { getDB } from "./lib/mongodb.js";
import { verifyToken } from "./lib/auth.js";

export default async (request) => {
  if (request.method !== "GET") {
    return Response.json(
      {
        success: false,
        message: "Method not allowed"
      },
      {
        status: 405
      }
    );
  }

  try {
    const db = await getDB();

    const books = await db
      .collection("books")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({
      success: true,
      books: books.map((book) => ({
        ...book,
        _id: book._id.toString()
      }))
    });

  } catch (error) {
    return Response.json(
      {
        success: false,
        message:
          error.message ||
          "Unable to load books"
      },
      {
        status: 500
      }
    );
  }
};