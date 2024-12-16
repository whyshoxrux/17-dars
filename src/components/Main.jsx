import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import { Link, NavLink } from "react-router-dom";

export default function Main() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [regionFilter, setRegionFilter] = useState("");

    const fetchCountries = async () => {
        try {
            let url = "https://restcountries.com/v3.1/all";

            if (regionFilter) {
                url = `https://restcountries.com/v3.1/region/${regionFilter}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            const filteredData = search
                ? data.filter((country) =>
                      country.name.common
                          .toLowerCase()
                          .includes(search.toLowerCase())
                  )
                : data;

            const specificData = filteredData.map((country) => ({
                name: country.name.common,
                population: country.population,
                region: country.region,
                capital: country.capital ? country.capital[0] : "Unknown :/",
                flag: country.flags.svg,
            }));

            setCountries(specificData);
        } catch (error) {
            console.error("Error fetching countries: ", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCountries();
    }, [regionFilter, search]);

    return (
        <>
            <Hero
                search={search}
                setSearch={setSearch}
                regionFilter={regionFilter}
                setRegionFilter={setRegionFilter}
            />
            <div className="pt-12 px-20 container mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div>
                            {" "}
                            <i className="fa-solid fa-spinner fa-spin text-9xl"></i>{" "}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-20">
                        {countries.map((country, index) => (
                            <div
                                key={index}
                                className="shadow-2xl rounded-lg w-full max-md:w-[264px] max-[400px]:w-56 overflow-hidden hover:scale-105 transition-transform duration-300"
                            >
                                <NavLink to={`/country/${country.name}`}>
                                    <img
                                        src={country.flag}
                                        alt={`${country.name} flag`}
                                        className="w-full h-40 object-cover"
                                    />
                                </NavLink>
                                <div className="p-6 font-['Nunito_Sans'] space-y-2">
                                    <h2 className="text-xl font-semibold mb-4">
                                        {country.name}
                                    </h2>
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
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
