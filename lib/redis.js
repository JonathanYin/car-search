import { createClient } from "redis";

let client;

async function connect() {
	if (!client) {
		client = createClient({
			url: process.env.REDIS_URL,
		});
		await client.connect();
	}
}

async function createCar(data) {
	await connect();
	const id = `car:${Date.now()}`;
	await client.hSet(id, data);
	return id;
}

export { connect, createCar };
