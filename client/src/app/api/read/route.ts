import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const client = new MongoClient(process.env.DB_URI as string);
  try {
    const db = client.db("sensor_data");
    const collection = db.collection("readings");
    const sensors = await collection.find({}).toArray();

    return NextResponse.json(sensors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}