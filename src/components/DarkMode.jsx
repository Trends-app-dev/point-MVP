import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../hooks/useLocalStorage";
import { selectDarkMode, setDarkMode } from "../redux/uiSlice";

const DarkMode = ({color}) => {
  // const [theme, setTheme] = useLocalStorage("theme");
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const theme = darkMode ? "dark" : "light";

  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  // let theme;

  // if (localStorage) {
  //   theme = localStorage.getItem("theme");
  // }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      dispatch(setDarkMode())
      // setTheme("light");
      // localStorage.setItem("theme", "light");
      // theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      dispatch(setDarkMode())
      // setTheme("dark");
      // localStorage.setItem("theme", "dark");
      // theme = darkTheme;
    }
  };

  return (
    <button id="darkMode" onClick={(e) => switchTheme(e)}>
      {theme === darkTheme ? (
        <i className="fas fa-sun text-3xl" style={{ color }} />
      ) : (
        <i className="fas fa-moon text-3xl" style={{ color }} />
      )}
    </button>
  );
};

export default DarkMode;
