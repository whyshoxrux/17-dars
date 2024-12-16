import React from "react";

export default function Hero({
    search,
    setSearch,
    regionFilter,
    setRegionFilter,
}) {
    return (
        <div className="pt-12 flex justify-between px-20 container mx-auto max-md:flex-col max-md:items-center max-md:gap-2">
            <label className="input input-bordered w-[486px] max-md:w-full flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search countries by name"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>

            <select
                defaultValue={"All Regions"}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="select w-52"
            >
                <option value="">All Regions</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Antarctic">Antarctic</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
    );
}
