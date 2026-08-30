import { ObjectId } from "mongodb";
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

    const db = await getDB();

    const requests = await db
      .collection("borrowRequests")
      .find({})
      .sort({
        requestedAt: -1
      })
      .toArray();

    const usersCollection =
      db.collection("users");

    const formattedRequests =
      await Promise.all(
        requests.map(async (item) => {

          const user =
  await usersCollection.findOne({
    _id: new ObjectId(item.userId)
  });
          return {
            ...item,

            _id:
              item._id.toString(),

            userName:
              user?.name ||
              "Unknown User",

            registerNumber:
              user?.registerNumber ||
              "-",

            role:
              user?.role ||
              "-"
          };
        })
      );

    return Response.json({
      success: true,
      requests: formattedRequests
    });

  } catch (error) {

    return Response.json(
      {
        success: false,
        message:
          error.message ||
          "Unable to load admin requests"
      },
      { status: 500 }
    );
  }
};