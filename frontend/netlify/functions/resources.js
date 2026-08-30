import { getDB } from "./lib/mongodb.js";

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

    const resources = await db
      .collection("resources")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({
      success: true,

      resources: resources.map((resource) => ({
        ...resource,
        _id: resource._id.toString()
      }))
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message:
          error.message ||
          "Unable to load resources"
      },
      {
        status: 500
      }
    );
  }
};