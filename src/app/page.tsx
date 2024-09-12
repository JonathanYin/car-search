import CarForm from "@/components/CarForm";
import CreateIndexButton from "@/components/CreateIndexButton";

export default function Home() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Car Search App</h1>
			<div className="mb-4">
				<CreateIndexButton />
			</div>
			<CarForm />
		</div>
	);
}
