import { createClient } from "redis";
import { Repository, Schema } from "redis-om";

let client;

async function connect() {
	if (!client) {
		client = createClient({
			url: process.env.REDIS_URL,
		});
		await client.connect();
	}
}

const carSchema = new Schema("Car", {
	make: { type: "text", textSearch: true },
	model: { type: "text", textSearch: true },
	image: { type: "string" },
	description: { type: "text", textSearch: true },
});

async function createCar(data) {
	await connect();
	const repository = new Repository(carSchema, client);
	const car = repository.createEntity(data);
	const id = await repository.save(car);
	return id;
}

async function createIndex() {
	await connect();
	const repository = new Repository(carSchema, client);
	await repository.createIndex();
}

async function searchCars(q) {
	await connect();
	const repository = new Repository(carSchema, client);
	const cars = await repository.search().where("make").matches(q).or("model").matches(q).or("description").matches(q).return.all();
	return cars;
}

export { connect, createCar, createIndex, searchCars };
