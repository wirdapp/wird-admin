import type { AxiosError } from "axios";
import { useState } from "react";

type ErrorColor = "green" | "red";

interface ApiErrorData {
	[key: string]: string | string[];
}

interface UseHandleErrorReturn {
	messages: (string | string[])[];
	classColor: ErrorColor;
	handleError: (err: AxiosError<ApiErrorData>) => void;
	changeColor: (color?: ErrorColor) => void;
	createSpecificMessage: (messages: string | string[]) => void;
}

export const useHandleError = (
	_err?: unknown,
	color: ErrorColor = "green",
): UseHandleErrorReturn => {
	const [classColor, setClassColor] = useState<ErrorColor>(color);
	const [messages, setMessages] = useState<(string | string[])[]>([]);

	const handleError = (err: AxiosError<ApiErrorData>) => {
		const errMessages: (string | string[])[] = [];
		if (err?.response?.data) {
			const obj = err.response.data;
			Object.keys(obj).forEach((e) => {
				errMessages.push(obj[e]);
			});
		} else {
			errMessages.push(["the process was not completed successfully"]);
		}

		setMessages([...errMessages]);
		setClassColor("red");
	};

	const createSpecificMessage = (messages: string | string[]) => setMessages([messages]);
	const changeColor = (color: ErrorColor = "green") => setClassColor(color);

	return {
		messages,
		classColor,
		handleError,
		changeColor,
		createSpecificMessage,
	};
};
