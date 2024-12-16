import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Country() {
    const { name } = useParams();

    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const url = `https://restcountries.com/v3.1/all`;
                const response = await fetch(url);
                const data = await response.json();
                const selectedCountry = data.find(
                    (country) => country.name.common == name
                );

                setCountry({
                    name: selectedCountry.name.common,
                    population: selectedCountry.population,
                    region: selectedCountry.region,
                    capital: selectedCountry.capital
                        ? selectedCountry.capital[0]
                        : "Unknown",
                    flag: selectedCountry.flags.svg,
                    official: selectedCountry.name.official,
                    subregion: selectedCountry.subregion,
                    languages: Object.values(selectedCountry.languages).join(
                        ", "
                    ),
                    currencies: Object.values(selectedCountry.currencies)
                        .map((currency) => currency.name)
                        .join(", "),
                    topLevelDomain: selectedCountry.tld,
                });
            } catch (error) {
                console.error("Error fetching country: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCountry();
    }, [name]);

    return (
        <div className="container mx-auto p-6">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div>
                        <i className="fa-solid fa-spinner fa-spin text-9xl"></i>
                        <p className="text-xl mt-4">
                            Fetching country details...
                        </p>
                    </div>
                </div>
            ) : (
                country && (
                    <div className="flex items-center shadow-xl mt-52 gap-36">
                        <img
                            src={country.flag}
                            alt={`${country.name} flag`}
                            className="w-[560px] h-[401px] object-cover mb-6"
                        />
                        <div>
                            <h1 className="text-3xl font-bold mb-4">
                                {country.name}
                            </h1>
                            <p>
                                <b>Population:</b>{" "}
                                {country.population.toLocaleString()}
                            </p>
                            <p>
                                <b>Region:</b> {country.region}
                            </p>
                            <p>
                                <b>Capital:</b> {country.capital}
                            </p>
                            <p>
                                <b>Official:</b> {country.official}
                            </p>
                            <p>
                                <b>Sub Region:</b> {country.subregion}
                            </p>
                            <p>
                                <b>Languages:</b> {country.languages}
                            </p>
                            <p>
                                <b>Currencies:</b> {country.currencies}
                            </p>
                            <p>
                                <b>Top Level Domain:</b>{" "}
                                {country.topLevelDomain}
                            </p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
