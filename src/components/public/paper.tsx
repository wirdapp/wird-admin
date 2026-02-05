import type React from "react";
import { Card, CardContent } from "components/ui/card";

export const Paper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="my-8 px-6 lg:px-8">
			<Card className="max-w-5xl mx-auto">
				<CardContent className="p-8">{children}</CardContent>
			</Card>
		</div>
	);
};
