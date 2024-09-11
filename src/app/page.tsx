import CarForm from "../components/CarForm";

export default function Home() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Create a Car</h1>
			<CarForm />
		</div>
	);
}
