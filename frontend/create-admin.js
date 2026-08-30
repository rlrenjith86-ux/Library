import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();

    const db = client.db(process.env.MONGODB_DB);

    const existingAdmin = await db.collection("users").findOne({
      registerNumber: "ADMIN001"
    });

    if (existingAdmin) {
      console.log("Admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await db.collection("users").insertOne({
      name: "Library Admin",
      registerNumber: "ADMIN001",
      idNumber: "ADMIN001",
      phone: "9999999999",
      password: hashedPassword,
      role: "admin",
      department: "Library",
      createdAt: new Date()
    });

    console.log("Admin created successfully!");
    console.log("Register Number: ADMIN001");
    console.log("Password: Admin@123");

  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await client.close();
  }
};

createAdmin();