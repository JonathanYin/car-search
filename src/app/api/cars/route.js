import { createCar } from "/lib/redis";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const data = await request.json();
		const id = await createCar(data);
		return NextResponse.json({ id });
	} catch (error) {
		console.error("Error creating car:", error);
		return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
	}
}
