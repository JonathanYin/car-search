import { searchCars } from "/lib/redis";
import { NextResponse } from "next/server";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const q = searchParams.get("q");

	if (!q) {
		return NextResponse.json({ error: "Query parameter q is required" }, { status: 400 });
	}

	try {
		const cars = await searchCars(q);
		return NextResponse.json({ cars });
	} catch (error) {
		console.error("Error searching cars:", error);
		return NextResponse.json({ error: "Failed to search cars" }, { status: 500 });
	}
}
