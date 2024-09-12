"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function CreateIndexButton() {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const createIndex = async () => {
		setIsLoading(true);
		try {
			const res = await fetch("/api/create-index");
			if (!res.ok) throw new Error("Failed to create index");
			toast({
				title: "Success",
				description: "Index created successfully",
			});
		} catch (error) {
			console.error("Error creating index:", error);
			toast({
				title: "Error",
				description: "Failed to create index. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button onClick={createIndex} disabled={isLoading}>
			{isLoading ? "Creating Index..." : "Create Index"}
		</Button>
	);
}
