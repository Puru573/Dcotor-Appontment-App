import React, { useState } from "react";
import Symbol from "../Images/Iwosan-Nigeria.jpg";

function SideNavbar(props) {
  const { modalIsOpen, detailsModalIsOpen } = props;
  const [isOpen, setIsOpen] = useState(false); // Start closed on mobile
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const navItemStyle =
    "flex ms-8 mt-5 gap-5 rounded-lg transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer";

  return (
    <div>
      {/* Hamburger Toggle Button - Always visible on mobile */}
      <button
        onClick={toggleNavbar}
        className={`fixed top-5 left-5 p-2 bg-white dark:bg-gray-900 rounded-full shadow-md focus:outline-none transition-all duration-300 ${
          modalIsOpen || detailsModalIsOpen ? "z-0" : "z-50"
        } md:hidden`} // Hide on medium screens and up
      >
        <span className="material-symbols-outlined text-2xl cursor-pointer">
          menu
        </span>
      </button>

      {/* Side Navbar */}
      <aside
        className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-white fixed h-screen w-60 rounded-sm transform transition-transform duration-300 shadow-xl border-zinc-950  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`} // Always visible on medium screens and up
      >
        <div className="flex justify-between items-center mt-15">
          <img src={Symbol} alt="Hospital-img" className="w-20 m-5" />
        </div>
        <hr className="w-60 bg-white dark:bg-gray-900 text-gray-900 dark:text-white" />
        <div className="flex flex-col">
          <div className={navItemStyle}>
            <span className="material-symbols-outlined">overview</span>
            <div>overview</div>
          </div>
          <div className={navItemStyle}>
            <span className="material-symbols-outlined">book_online</span>
            <div>Appointments</div>
          </div>
          <div className={navItemStyle}>
            <span className="material-symbols-outlined">personal_injury</span>
            <div>Doctors</div>
          </div>
          <div className={navItemStyle}>
            <span className="material-symbols-outlined">labs</span>
            <div>Pathology Results</div>
          </div>
          <div className={navItemStyle}>
            <span className="material-symbols-outlined">chat</span>
            <div>Chats</div>
          </div>
        </div>
        <div className="ms-8 mt-5">ACCOUNT</div>
        <div className="flex flex-col">
          <div className={navItemStyle}>
            <span className="material-symbols-outlined">Settings</span>
            <div>Settings</div>
          </div>
          <div className={navItemStyle}>
            <span className="material-symbols-outlined">Logout</span>
            <div>Logout</div>
          </div>
        </div>
        <hr className="w-60 bg-white dark:bg-gray-900 text-gray-900 dark:text-white mt-25" />
        <div className="flex flex-col">
          <div className="flex ms-8 gap-5 items-center mt-5">
            <span className="material-symbols-outlined">contact_emergency</span>
            <div>
              <div className="text-red-600">Emergency-Helpline</div>
              <div>+1122334455</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default SideNavbar;
