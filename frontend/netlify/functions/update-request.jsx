import { ObjectId } from "mongodb";

import { getDB } from "./lib/mongodb.js";
import { verifyToken } from "./lib/auth.js";

export default async (request) => {
  if (request.method !== "POST") {
    return Response.json(
      {
        success: false,
        message: "Method not allowed"
      },
      { status: 405 }
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
        { status: 401 }
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
            "Admin access required"
        },
        { status: 403 }
      );
    }

    const {
      requestId,
      status
    } = await request.json();

    if (
      !requestId ||
      !["approved", "rejected"].includes(
        status
      )
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Invalid request update"
        },
        { status: 400 }
      );
    }

    const db = await getDB();

    const borrowRequest =
      await db
        .collection("borrowRequests")
        .findOne({
          _id:
            new ObjectId(requestId)
        });

    if (!borrowRequest) {
      return Response.json(
        {
          success: false,
          message:
            "Request not found"
        },
        { status: 404 }
      );
    }

    if (
      borrowRequest.status !==
      "pending"
    ) {
      return Response.json(
        {
          success: false,
          message:
            "This request was already processed"
        },
        { status: 400 }
      );
    }

    await db
      .collection("borrowRequests")
      .updateOne(
        {
          _id:
            new ObjectId(requestId)
        },
        {
          $set: {
            status,
            updatedAt: new Date()
          }
        }
      );

    return Response.json({
      success: true,

      message:
        `Request ${status} successfully`
    });

  } catch (error) {

    return Response.json(
      {
        success: false,
        message:
          error.message ||
          "Unable to update request"
      },
      { status: 500 }
    );
  }
};