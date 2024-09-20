import React, { useState, useEffect } from 'react';
import "@/app/globals.css";
import { useTheme } from "next-themes";

const ToggleButton = () => {
    const { theme, setTheme } = useTheme();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        // Set checkbox state based on the current theme
        setIsChecked(theme === 'dark');
    }, [theme]);

    const handleToggle = () => {
        if (isChecked) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
        setIsChecked(!isChecked);
    };

    return (
        <div className='absolute sm:right-[32px] right-[42px] -top-2 z-10'>
            <label
                htmlFor="themeToggle"
                className="themeToggle dark:text-white text-black st-sunMoonThemeToggleBtn"
            >
                <input
                    type="checkbox"
                    id="themeToggle"
                    className="themeToggleInput"
                    checked={isChecked}
                    onChange={handleToggle}
                />
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="none"
                >
                    <mask id="moon-mask">
                        <rect x="0" y="0" width="20" height="20" fill="white"></rect>
                        <circle cx="11" cy="3" r="8" fill="black"></circle>
                    </mask>
                    <circle
                        className="sunMoon"
                        cx="10"
                        cy="10"
                        r="8"
                        mask="url(#moon-mask)"
                    ></circle>
                    <g>
                        <circle className="sunRay sunRay1" cx="18" cy="10" r="1.5"></circle>
                        <circle className="sunRay sunRay2" cx="14" cy="16.928" r="1.5"></circle>
                        <circle className="sunRay sunRay3" cx="6" cy="16.928" r="1.5"></circle>
                        <circle className="sunRay sunRay4" cx="2" cy="10" r="1.5"></circle>
                        <circle className="sunRay sunRay5" cx="6" cy="3.1718" r="1.5"></circle>
                        <circle className="sunRay sunRay6" cx="14" cy="3.1718" r="1.5"></circle>
                    </g>
                </svg>
            </label>
        </div>
    );
};

export default ToggleButton;
