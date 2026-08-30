import { getDB } from "./lib/mongodb.js";
import { verifyToken } from "./lib/auth.js";

export default async (request) => {
  if (request.method !== "GET") {
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

    const db = await getDB();

    const requests = await db
      .collection("borrowRequests")
      .find({
        userId: decoded.userId
      })
      .sort({
        requestedAt: -1
      })
      .toArray();

    return Response.json({
      success: true,

      requests: requests.map((item) => ({
        ...item,
        _id: item._id.toString()
      }))
    });

  } catch (error) {

    return Response.json(
      {
        success: false,
        message:
          error.message ||
          "Unable to load requests"
      },
      { status: 500 }
    );
  }
};