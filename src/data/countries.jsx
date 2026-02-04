import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import arLocale from "i18n-iso-countries/langs/ar.json";

countries.registerLocale(enLocale);
countries.registerLocale(arLocale);

export const allCountries = (lang = "en") =>
  Object.keys(countries.getAlpha2Codes())
    .map(
      (code) =>
        // we don't recognise israel as a country
        code.toUpperCase() !== "IL" && {
          code,
          name: countries.getName(code, lang),
        },
    )
    .filter(Boolean);

export const getCountryName = (code, lang = "en") =>
  countries.getName(code, lang);

export const getCountryFlagElement = (code, lang = "en") => {
  return (props) => (
    <img
      {...props}
      alt={getCountryName(code, lang)}
      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${code.toUpperCase()}.svg`}
    />
  );
};
