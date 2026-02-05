import { ReactComponent as WirdLogo } from "assets/icons/Shared/wirdLogo.svg";
import { useRouteError } from "react-router";
import { Error404 } from "./error-404";

interface RouteError {
	status?: number;
	message?: string;
}

export function ErrorBoundary() {
	const error = useRouteError() as RouteError;
	console.error(error);
	if (error?.status === 404) {
		return <Error404 />;
	}

	return (
		<div className="error-page">
			<WirdLogo />
			<hr />
			<h2>Something went wrong :(</h2>
		</div>
	);
}
