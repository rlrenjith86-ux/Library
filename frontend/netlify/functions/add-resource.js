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

    const decoded = verifyToken(token);

    if (decoded.role !== "admin") {
      return Response.json(
        {
          success: false,
          message:
            "Only admin can add resources"
        },
        {
          status: 403
        }
      );
    }

    const {
      title,
      description,
      link
    } = await request.json();

    if (!title || !description || !link) {
      return Response.json(
        {
          success: false,
          message:
            "Please fill all resource details"
        },
        {
          status: 400
        }
      );
    }

    const db = await getDB();

    const result = await db
      .collection("resources")
      .insertOne({
        title,
        description,
        link,
        createdAt: new Date()
      });

    return Response.json(
      {
        success: true,
        message:
          "Resource added successfully",
        resourceId:
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
          "Unable to add resource"
      },
      {
        status: 500
      }
    );
  }
};