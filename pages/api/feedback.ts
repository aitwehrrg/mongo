import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { feedback } = req.body;
    if (!feedback) return res.status(400).json({ error: "Feedback is required" });
    const client = await clientPromise;
    const db = client.db("feedbackDB");
    await db.collection("feedbacks").insertOne({ feedback, createdAt: new Date() });
    return res.status(201).json({ message: "Feedback submitted" });
  }
  if (req.method === "GET") {
    const client = await clientPromise;
    const db = client.db("feedbackDB");
    const feedbacks = await db.collection("feedbacks").find().sort({ createdAt: -1 }).toArray();
    return res.status(200).json(feedbacks);
  }
  res.setHeader("Allow", ["POST", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}