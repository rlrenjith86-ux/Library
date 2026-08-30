import { getDB } from "./lib/mongodb.js";
import { verifyToken } from "./lib/auth.js";

export default async (request) => {
  if (request.method !== "POST") {
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
    const authHeader =
      request.headers.get("authorization");

    if (!authHeader) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized"
        },
        {
          status: 401
        }
      );
    }

    const token =
      authHeader.replace("Bearer ", "");

    const decoded =
      verifyToken(token);

    if (decoded.role !== "admin") {
      return Response.json(
        {
          success: false,
          message:
            "Only admin can add books"
        },
        {
          status: 403
        }
      );
    }

    const {
      title,
      author,
      category,
      quantity
    } = await request.json();

    if (
      !title ||
      !author ||
      !category ||
      !quantity
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Please fill all book details"
        },
        {
          status: 400
        }
      );
    }

    const db = await getDB();

    const book = {
      title,
      author,
      category,
      quantity: Number(quantity),
      createdAt: new Date()
    };

    const result =
      await db
        .collection("books")
        .insertOne(book);

    return Response.json(
      {
        success: true,
        message:
          "Book added successfully",
        bookId:
          result.insertedId.toString()
      },
      {
        status: 201
      }
    );

  } catch (error) {

    return Response.json(
      {
        success: false,
        message:
          error.message ||
          "Unable to add book"
      },
      {
        status: 500
      }
    );
  }
};