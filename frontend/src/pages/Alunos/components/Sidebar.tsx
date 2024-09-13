import React, { useState } from 'react';  
/* import { ChevronDownIcon } from '@heroicons/react/outline';  */  

const Sidebar = () => {  
    const [openEvents, setOpenEvents] = useState(false);  
    const [activeItem, setActiveItem] = useState('');  

    const toggleEvents = () => {  
        setOpenEvents(!openEvents);  
    };  

    const handleItemClick = (item: React.SetStateAction<string>) => {  
        setActiveItem(item);  
    };  

    return (  
        <aside  
            id="default-sidebar"  
            className="w-64 h-screen bg-white shadow-md"  
            aria-label="Sidebar"  
        >  
            <div className="h-full px-3 py-4 overflow-y-auto">  
                <ul className="space-y-2 font-medium">  
                    <li>  
                        <img  
                            src="../../img/uece-logocompleta.png"  
                            alt="Universidade Estadual do Ceará"  
                            className="mb-2 w-[20rem] mr-2"  
                        />  
                    </li>    
                    <li>  
                        <button  
                            className={`flex items-center p-2 rounded-lg w-full ${openEvents ? 'bg-green-500 text-white' : 'text-gray-900 hover:bg-gray-200'}`}  
                            onClick={toggleEvents}   
                        >  
                            <span className="flex-1 text-left">Eventos</span>  
                          {/*   <ChevronDownIcon className={`w-5 h-5 transition-transform ${openEvents ? 'rotate-180' : ''}`} />   */}
                        </button>  
                        {openEvents && (   
                            <ul className="ml-4 space-y-2">  
                                <li>  
                                    <a  
                                        href="#"  
                                        className={`flex items-center p-2 rounded-lg ${activeItem === 'evento1' ? 'bg-green-600 text-white' : 'text-gray-900 hover:bg-gray-200'}`}  
                                        onClick={() => handleItemClick('evento1')}   
                                    >  
                                        Historico  
                                    </a>  
                                </li>  
                                <li>  
                                    <a  
                                        href="#"  
                                        className={`flex items-center p-2 rounded-lg ${activeItem === 'evento2' ? 'bg-green-600 text-white' : 'text-gray-900 hover:bg-gray-200'}`}  
                                        onClick={() => handleItemClick('evento2')}   
                                    >  
                                        Em Aberto  
                                    </a>  
                                </li>  
                            </ul>  
                        )}  
                    </li>  
                </ul>  
            </div>  
        </aside>  
    );  
}  

export default Sidebar;