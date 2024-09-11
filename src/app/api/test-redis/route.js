import { connect, getClient } from "/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await connect();
		const client = getClient();

		// Test the connection by setting and getting a value
		await client.set("test_key", "Hello Redis!");
		const value = await client.get("test_key");

		return NextResponse.json({ message: "Redis connection successful", value });
	} catch (error) {
		console.error("Redis connection error:", error);
		return NextResponse.json({ message: "Redis connection failed", error: error.message }, { status: 500 });
	}
}
