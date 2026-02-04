import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import dayjs from "dayjs";
import { AppProviders } from "./components/providers/AppProviders";
import i18n from "./i18n";
import { router } from "./router";
import "dayjs/locale/ar";
import "dayjs/locale/en";

dayjs.locale(i18n.language);

function App() {
	return (
		<AppProviders>
			<I18nextProvider i18n={i18n}>
				<RouterProvider router={router} />
			</I18nextProvider>
		</AppProviders>
	);
}

export default App;
