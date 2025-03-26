import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_connection_string";
const client = new MongoClient(MONGODB_URI);
const clientPromise = client.connect();

export default clientPromise;
