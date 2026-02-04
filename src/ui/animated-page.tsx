import { type HTMLMotionProps, motion } from "framer-motion";
import React, { type ReactNode } from "react";

interface AnimatedPageProps extends HTMLMotionProps<"div"> {
	children: ReactNode;
	className?: string;
}

export const AnimatedPage = ({ children, ...props }: AnimatedPageProps) => {
	return (
		<motion.div
			initial={{ y: 10, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: 10, opacity: 0 }}
			transition={{ duration: 0.2 }}
			{...props}
		>
			{children}
		</motion.div>
	);
};
