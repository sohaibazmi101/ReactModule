import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({children}){

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    function toggleTheme(){
        const newTheme = theme === "light" ? "dark":"light";
        setTheme(newTheme);
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}