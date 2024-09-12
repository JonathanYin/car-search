import { createIndex } from "/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await createIndex();
		return NextResponse.json({ message: "Index created successfully" });
	} catch (error) {
		console.error("Error creating index:", error);
		return NextResponse.json({ error: "Failed to create index" }, { status: 500 });
	}
}
