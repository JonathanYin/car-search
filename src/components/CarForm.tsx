"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
	make: z.string().min(2, {
		message: "Make must be at least 2 characters.",
	}),
	model: z.string().min(2, {
		message: "Model must be at least 2 characters.",
	}),
	image: z.string().url({
		message: "Please enter a valid URL for the image.",
	}),
	description: z.string().min(10, {
		message: "Description must be at least 10 characters.",
	}),
});

export default function CarForm() {
	const { toast } = useToast();
	const [searchResults, setSearchResults] = useState<Array<{ entityId: string; make: string; model: string; description: string }>>([]);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			make: "",
			model: "",
			image: "",
			description: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const res = await fetch("/api/cars", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!res.ok) throw new Error("Failed to create car");

			const result = await res.json();
			console.log(result);
			toast({
				title: "Success",
				description: `Car created with ID: ${result.id}`,
			});

			form.reset();
		} catch (error) {
			console.error("Error:", error);
			toast({
				title: "Error",
				description: "Failed to create car. Please try again.",
				variant: "destructive",
			});
		}
	}

	const search = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const q = event.target.value;

		if (q.length > 2) {
			const params = new URLSearchParams({ q });

			try {
				const res = await fetch("/api/search?" + params);
				if (!res.ok) throw new Error("Search failed");
				const result = await res.json();
				setSearchResults(result.cars || []);
			} catch (error) {
				console.error("Error searching cars:", error);
				toast({
					title: "Error",
					description: "Failed to search cars. Please try again.",
					variant: "destructive",
				});
				setSearchResults([]);
			}
		} else {
			setSearchResults([]);
		}
	};

	return (
		<div className="space-y-8">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="make"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Make</FormLabel>
								<FormControl>
									<Input placeholder="Enter car make" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="model"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Model</FormLabel>
								<FormControl>
									<Input placeholder="Enter car model" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image URL</FormLabel>
								<FormControl>
									<Input placeholder="Enter image URL" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea placeholder="Enter car description" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Create Car</Button>
				</form>
			</Form>
			<div className="space-y-4">
				<h2 className="text-xl font-bold">Search Cars</h2>
				<Input onChange={search} type="text" placeholder="Search cars..." />

				{searchResults.length > 0 && (
					<ul className="space-y-2">
						{searchResults.map((car: { entityId: string; make: string; model: string; description: string }) => (
							<li key={car.entityId} className="border p-2 rounded">
								{car.make} {car.model} - {car.description}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
