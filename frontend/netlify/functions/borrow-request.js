import { getDB } from "./lib/mongodb.js";
import { verifyToken } from "./lib/auth.js";
import { ObjectId } from "mongodb";

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

    if (decoded.role === "admin") {
      return Response.json(
        {
          success: false,
          message:
            "Admin cannot borrow books"
        },
        {
          status: 403
        }
      );
    }

    const {
      bookId,
      bookTitle
    } = await request.json();

    if (!bookId || !bookTitle) {
      return Response.json(
        {
          success: false,
          message:
            "Book information is required"
        },
        {
          status: 400
        }
      );
    }

    const db = await getDB();

    const book =
      await db
        .collection("books")
        .findOne({
          _id: new ObjectId(bookId)
        });

    if (!book) {
      return Response.json(
        {
          success: false,
          message: "Book not found"
        },
        {
          status: 404
        }
      );
    }

    if (book.quantity < 1) {
      return Response.json(
        {
          success: false,
          message:
            "This book is currently unavailable"
        },
        {
          status: 400
        }
      );
    }

    const existingRequest =
      await db
        .collection("borrowRequests")
        .findOne({
          userId: decoded.userId,
          bookId,
          status: {
            $in: [
              "pending",
              "approved"
            ]
          }
        });

    if (existingRequest) {
      return Response.json(
        {
          success: false,
          message:
            "You already have an active request for this book"
        },
        {
          status: 409
        }
      );
    }

    const borrowRequest = {
      userId: decoded.userId,
      bookId,
      bookTitle,

      status: "pending",

      requestedAt: new Date()
    };

    await db
      .collection("borrowRequests")
      .insertOne(borrowRequest);

    return Response.json(
      {
        success: true,
        message:
          "Borrow request sent successfully"
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
          "Unable to create borrow request"
      },
      {
        status: 500
      }
    );
  }
};