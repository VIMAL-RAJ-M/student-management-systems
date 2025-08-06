import React from "react";

const DarkModeToggle = ({ darkMode, toggle }) => (
  <button onClick={toggle} style={{ float: "right", marginTop: "-40px" }}>
    {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
  </button>
);

export default DarkModeToggle;
