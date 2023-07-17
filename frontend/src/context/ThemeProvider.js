import React, { createContext , useEffect } from 'react'

export const ThemeContext = createContext();


export default function ThemeProvider({children}) {


    const defaultTheme = 'light';
    const darkTheme = 'dark';


    const toggleTheme = () => {
        const oldTheme = getTheme();
        const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;

        updateTheme(newTheme,oldTheme);
    };

    useEffect( () => {
      const theme = getTheme();
      if(!theme)  updateTheme(defaultTheme);
      else updateTheme(theme);
    },[])

  return (
    <ThemeContext.Provider value={ {theme : "Testing" , toggleTheme : toggleTheme} }>
        {children}
    </ThemeContext.Provider>
  )
}


const getTheme = () => {
  return localStorage.getItem('theme');
}


const updateTheme = (newTheme,oldTheme) => {
  if(oldTheme)  document.documentElement.classList.remove(oldTheme);
  document.documentElement.classList.add(newTheme);
  localStorage.setItem('theme' , newTheme);
}