import React, { useState, useEffect } from "react";
import { useAuth } from "../../../hook/useAuth";

const Sidebar = () => {
  const [openEvents, setOpenEvents] = useState(true);
  const [activeItem, setActiveItem] = useState("evento2");
  const [hovered, setHovered] = useState(false);
  const { user } = useAuth() || {};

  useEffect(() => {
    setOpenEvents(true);
    setActiveItem("evento2");
  }, []);

  const toggleEvents = () => {
    setOpenEvents((prev) => !prev);
  };

  const handleItemClick = (item: React.SetStateAction<string>) => {
    setActiveItem(item);
  };

  return (
    <aside
      id="default-sidebar"
      className="w-64 h-screen bg-white shadow-md flex flex-col"
      aria-label="Sidebar"
    >
      <div className="flex-grow px-3 py-4 overflow-y-auto">
        <ul className="ml-4 space-y-2">
          <li>
            <img
              src="../../img/uece-logocompleta.png"
              alt="Universidade Estadual do Ceará"
              className="mb-2 w-[20rem] mr-2"
            />
          </li>
          <li>
            <button
              onClick={toggleEvents}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={`relative flex items-center p-2 rounded-lg w-full text-left text-gray-900 transition-colors   
                ${hovered ? "bg-gray-100" : ""}   
                ${openEvents ? "bg-gray-100" : ""}`}
            >
              <span className="flex-1">Eventos</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
              {(hovered || openEvents) && (
                <span className="absolute left-full w-1.5 h-full bg-green-500 rounded-r-lg"></span>
              )}
            </button>
          </li>
          {openEvents && (
            <ul className="ml-4 space-y-2">
              <li>
                <a
                  href="#"
                  className={`flex items-center p-2 rounded-lg ${
                    activeItem === "evento1"
                      ? "text-green-600"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => handleItemClick("evento1")}
                >
                  Histórico
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`flex items-center p-2 rounded-lg ${
                    activeItem === "evento2"
                      ? "text-green-600"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => handleItemClick("evento2")}
                >
                  Em Aberto
                </a>
              </li>
            </ul>
          )}
        </ul>
      </div>
      <div className="flex items-center mb-4 ml-2">
        <img
          src="../../../../img/icon/avatar.png"
          alt="Avatar"
          className="rounded-full mr-1 w-12 h-12"
        />
        <div>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
        <button className="p-2 hover:bg-slate-50 rounded-full " onClick={useAuth()?.logout}>
          <img
            src="../../../../img/icon/logout-simple-flat-icon-illustration-vector.jpg"
            alt="Logout"
            className="rounded-full mr-1 w-10 h-10 "
          />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;