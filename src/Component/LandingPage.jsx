import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

function LandingPage() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      {/* Header - Responsive adjustments */}
      <div className="absolute bg-white dark:bg-gray-900 text-gray-900 dark:text-white h-20 ms-0 md:ms-70 w-full md:w-[calc(100%-18rem)] shadow-xl border-zinc-950 rounded-sm flex items-center px-4 md:px-0">
        <div className="flex items-center w-auto md:w-auto">
          <span className="material-symbols-outlined absolute left-22 md:left-12">
            search
          </span>
        </div>

        <input
          type="text"
          placeholder="Search pathology results"
          className="pl-10 ms-15 md:ms-10 border rounded-md p-2 outline-none w-full md:w-full"
        />
        <span className="material-symbols-outlined ms-2 md:ms-5">
          notifications
        </span>
        <div className="h-5 border-3 ms-2 md:ms-5 border-slate-500 hidden md:block"></div>
        <div className="flex gap-2 md:gap-5 items-center ms-2 md:ms-5">
          <div className="rounded-3xl h-8 w-8 md:h-11 md:w-11 border-3 border-slate-500"></div>
          <div className="flex flex-col text-xs hidden md:flex md:text-sm">
            <div>Puru pal</div>
            <div>Patient</div>
          </div>

          {/* Mobile: Dropdown Menu (sm screens and below) */}
          <div className="md:hidden relative group">
            <button className="flex items-center cursor-pointer">
              <span className="material-symbols-outlined">expand_more</span>
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-10 hidden group-hover:block">
              <div className="px-4 py-2 text-xs">
                <div>Puru pal</div>
                <div className="text-gray-500 dark:text-gray-400">Patient</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title and Theme Toggle - Responsive adjustments */}
      {/* Title and Theme Toggle - Always in row layout */}
      <div className="absolute mt-25 ms-0 md:ms-70 w-full md:w-[calc(100%-18rem)] flex flex-row items-center justify-between mx-2 md:mx-5 px-2">
        <div className="text-rose-500 font-bold text-sm sm:text-base md:text-lg">
          Appointments
        </div>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">
              {theme === "light" ? "light_mode" : "dark_mode"}
            </span>
            <span className="material-symbols-outlined cursor-pointer transition-all duration-300 ease-in-out">
              {theme === "light" ? "toggle_off" : "toggle_on"}
            </span>
            <span className="hidden xs:inline">
              {theme === "light" ? "Light" : "Dark"}
            </span>
            <span className="hidden sm:inline ">
              {theme === "light" ? "Light Theme" : "Dark Theme"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
