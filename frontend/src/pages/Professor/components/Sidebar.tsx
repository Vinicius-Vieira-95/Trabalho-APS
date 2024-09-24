import { useState, useEffect } from "react";
import { useAuth } from "../../../hook/useAuth";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [openEvents, setOpenEvents] = useState(true);
  const [activeItem, setActiveItem] = useState("evento3");
  const [hoveredEvents, setHoveredEvents] = useState(false);
  const { user } = useAuth() || {};
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/professor":
        setActiveItem("evento3");
        break;
      case "/criar-evento":
        setActiveItem("evento1");
        break;
      case "/em-andamento":
        setActiveItem("evento4");
        break;
     
    }
  }, [location.pathname]);

  const toggleEvents = () => {
    setOpenEvents((prev) => !prev);
  };

  return (
    <aside
      id="default-sidebar"
      className="w-64 h-screen fixed bg-white shadow-md border border-gray-100 flex flex-col"
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
              onMouseEnter={() => setHoveredEvents(true)}
              onMouseLeave={() => setHoveredEvents(false)}
              className={`relative flex items-center p-2 rounded-lg w-full text-left text-gray-900 transition-colors  
              ${hoveredEvents || openEvents ? "bg-gray-100" : ""}`}
            >
              <span className="flex-1 font-inter text-TextSide">Eventos</span>
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
              {(hoveredEvents || activeItem.includes("evento")) && (
                <span className="absolute right-0 w-1.5 h-full bg-green-500 rounded-r-lg"></span>
              )}
            </button>
          </li>
          {openEvents && (
            <ul className="ml-4 space-y-2">
              <li>
                <Link
                  to="/criar-evento"
                  className={`flex items-center p-2 rounded-lg ${
                    activeItem === "evento1"
                      ? "text-green-600"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveItem("evento1")}
                >
                  Criar novo evento
                </Link>
              </li>
               <li>
                <Link
                  to="/professor"
                  className={`flex items-center p-2 rounded-lg ${
                    activeItem === "evento2"
                      ? "text-green-600"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveItem("evento2")}
                >
                  Histórico
                </Link>
              </li> 
              <li>
                <Link
                  to="/professor"
                  className={`flex items-center p-2 rounded-lg ${
                    activeItem === "evento3"
                      ? "text-green-600"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveItem("evento3")}
                >
                  Em Aberto
                </Link>
              </li>
              <li>
                <Link
                  to="/em-andamento"
                  className={`relative flex items-center font-inter text-TextSide p-2 rounded-lg ${
                    activeItem === "evento4"
                      ? "text-green-600"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveItem("evento4")}
                >
                  Em Andamento
                </Link>
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
        <button
          className="p-2 hover:bg-slate-50 rounded-full"
          onClick={useAuth()?.logout}
        >
          <img
            src="../../../../img/icon/logout-simple-flat-icon-illustration-vector.jpg"
            alt="Logout"
            className="rounded-full mr-1 w-10 h-10"
          />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
