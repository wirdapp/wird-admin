import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { cn } from "lib/utils";
import { Section } from "./Section";

type Props = {
	locale: "ar" | "en";
	title: string;
	description: string;
};

const videoId = {
	ar: "fUfYJDSTmRE",
	en: "ELLpbVVYiR4",
};

export const VideoIntro = ({ locale, title, description }: Props) => {
	const [isClient, setIsClient] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<Section id="video-intro" title={title} description={description}>
			<div
				className={cn("w-full h-[500px] bg-gray-300", {
					"animate-pulse": loading,
				})}
			>
				{isClient && (
					<ReactPlayer
						src={`https://www.youtube.com/embed/${videoId[locale]}`}
						className="container max-w-5xl w-full h-full max-h-[500px] mx-auto flex items-center justify-center"
						width="100%"
						height="500px"
						controls
						onReady={() => setLoading(false)}
					/>
				)}
			</div>
		</Section>
	);
};
