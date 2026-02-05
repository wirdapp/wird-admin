import countries from "i18n-iso-countries";
import arLocale from "i18n-iso-countries/langs/ar.json";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);
countries.registerLocale(arLocale);

export const allCountries = (lang = "en") =>
	Object.keys(countries.getAlpha2Codes())
		.map(
			(code) =>
				code.toUpperCase() !== "IL" && {
					code,
					name: countries.getName(code, lang),
				},
		)
		.filter(Boolean);

export const getCountryName = (code: string, lang = "en") =>
	countries.getName(code, lang) || code;

export const getCountryFlagElement = (code: string, lang = "en", size = 40) => {
	function Flag(props: React.ImgHTMLAttributes<HTMLImageElement>) {
		return (
			<img
				{...props}
				width={size}
				height={size}
				alt={getCountryName(code, lang) || code}
				src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${code.toUpperCase()}.svg`}
			/>
		);
	}

	return Flag;
};
