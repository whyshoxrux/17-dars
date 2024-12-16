import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbarr() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "light") {
            root.setAttribute("data-theme", "light");
        } else {
            root.removeAttribute("data-theme");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <>
            <div className="container mx-auto shadow-[0px_5px_7px_-4px_rgba(0,0,0,0.75)] font-['Nunito_Sans'] flex justify-between navbar bg-base-100 px-20">
                <div className="text-2xl font-extrabold">
                    <Link to="/">Where in the world?</Link>
                </div>
                <div>
                    <button
                        onClick={toggleTheme}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow transition-colors duration-300 ${
                            theme === "dark"
                                ? "bg-white text-black hover:bg-gray-200"
                                : "bg-black text-white hover:bg-gray-800"
                        }`}
                    >
                        {theme === "dark" ? (
                            <FaSun className="text-yellow-400" />
                        ) : (
                            <FaMoon className="text-blue-400" />
                        )}
                        {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>
            </div>
        </>
    );
}
