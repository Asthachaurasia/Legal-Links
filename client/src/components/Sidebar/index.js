
// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Sidebar = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
//     const [categories, setCategories] = useState([]);
//     const [isOpen, setIsOpen] = useState(false);

//     const handleNavigate = (path) => {
//         navigate(path);
//     };

//     const handleCategorySelect = (category) => {
//         console.log(`Selected Category: ${category}`);
//         setCategoryDropdownOpen(false);  // Close dropdown after selection
//     };

//     return (
//         <div
//             className={`fixed top-0 left-0 h-screen bg-[#ebf0f4] transition-all duration-300 ease-in-out shadow-lg border-r-2 border-blue-500 ${isOpen ? 'w-[15%]' : 'w-[4%]'} w-[15%]`}
//             onMouseEnter={() => setIsOpen(true)} // Open on hover
//             onMouseLeave={() => setIsOpen(false)} // Close on mouse
//         >
//             <div className={`flex flex-col items-start p-4 ${isOpen ? 'block' : 'hidden'}`}>
//                 <div className="sidebar-item text-black flex items-center my-8 mx-8 text-2xl">
//                     Legal-Links
//                 </div>
//                 <hr className="border-t-2 border-black my-1 w-full" />

//                 {/* Messages Link */}
//                 <div
//                     className="sidebar-item w-full text-black flex items-center mt-10 mb-4 px-7 text-xl hover:bg-blue-300 rounded p-2 transition-colors duration-200 cursor-pointer"
//                     onClick={() => handleNavigate('/')}
//                 >
//                     Messages
//                 </div>

//                 {/* Find Lawyer Link */}
//                 <div
//                     className="sidebar-item w-full text-black flex items-center my-4 px-7 text-xl hover:bg-blue-300 rounded p-2 transition-colors duration-200 cursor-pointer"
//                     onClick={() => handleNavigate('/users/Find_Lawyer')}
//                 >
//                     Find Lawyer
//                 </div>

//                 {/* Show Category Link only on /users/Find_Lawyer */}
//                 {location.pathname === '/users/Find_Lawyer' && (
//                     <>
//                         <div
//                             className="sidebar-item w-full text-black flex items-center my-4 px-7 text-xl hover:bg-blue-300 rounded p-2 transition-colors duration-200 cursor-pointer"
//                             onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
//                         >
//                             Category
//                         </div>

//                         {/* Dropdown for Category */}
//                         {categoryDropdownOpen && (
//                             <div className="w-full bg-white border border-gray-300 rounded shadow-lg mt-1">
//                                 <div
//                                     className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                                     onClick={() => handleCategorySelect('Civil')}
//                                 >
//                                     Civil
//                                 </div>
//                                 <div
//                                     className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                                     onClick={() => handleCategorySelect('Family')}
//                                 >
//                                     Family
//                                 </div>
//                                 <div
//                                     className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                                     onClick={() => handleCategorySelect('Criminal')}
//                                 >
//                                     Criminal
//                                 </div>
//                                 <div
//                                     className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                                     onClick={() => handleCategorySelect('Corporate')}
//                                 >
//                                     Corporate
//                                 </div>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Sidebar;



import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png';

// const Sidebar = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
//     const [categories, setCategories] = useState([]);
//     const [isOpen, setIsOpen] = useState(false);

//     const handleNavigate = (path) => {
//         navigate(path);
//     };

//     // Fetch categories from backend
//     const fetchCategories = async () => {
//         try {
//             const response = await fetch('http://localhost:4000/category/get');
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log('Full response:', data);

//             console.log('Fetched categories:', data.categories);// Log fetched categories which is an array of objects
//             setCategories(data.categories||[]);  // Update categories state
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
//     };

//     // Handle Category click
//     const handleCategoryClick = () => {
//         setCategoryDropdownOpen(!categoryDropdownOpen);

//         // Fetch categories only if dropdown is opening
//         if (!categoryDropdownOpen) {
//             fetchCategories();
//         }
//     };

//     const handleCategorySelect = (category) => {
//         console.log(`Selected Category: ${category.name}, ID: ${category.id}`);
//         setCategoryDropdownOpen(false);  // Close dropdown after selection

//     };

//     return (
//         <div
//             className={`fixed top-0 left-0 h-screen bg-[#ebf0f4] transition-all duration-300 ease-in-out shadow-lg border-r-2 border-blue-500 ${isOpen ? 'w-[15%]' : 'w-[4%]'}`}
//             onMouseEnter={() => setIsOpen(true)}
//             onMouseLeave={() => setIsOpen(false)}
//         >
//             <div className={`flex flex-col items-start p-4 ${isOpen ? 'block' : 'hidden'}`}>
//                 <div className="sidebar-item text-black flex items-center my-8 mx-8 text-2xl">
//                     Legal-Links
//                 </div>
//                 <hr className="border-t-2 border-black my-1 w-full" />

//                 {/* Messages Link */}
//                 <div
//                     className="sidebar-item w-full text-black flex items-center mt-10 mb-4 px-7 text-xl hover:bg-blue-300 rounded p-2 transition-colors duration-200 cursor-pointer"
//                     onClick={() => handleNavigate('/')}
//                 >
//                     Messages
//                 </div>

//                 {/* Find Lawyer Link */}
//                 <div
//                     className="sidebar-item w-full text-black flex items-center my-4 px-7 text-xl hover:bg-blue-300 rounded p-2 transition-colors duration-200 cursor-pointer"
//                     onClick={() => handleNavigate('/users/Find_Lawyer')}
//                 >
//                     Find Lawyer
//                 </div>

//                 {/* Show Category Link only on /users/Find_Lawyer */}
//                 {location.pathname === '/users/Find_Lawyer' && (
//                     <>
//                         <div
//                             className="sidebar-item w-full text-black flex items-center my-4 px-7 text-xl hover:bg-blue-300 rounded p-2 transition-colors duration-200 cursor-pointer"
//                             onClick={handleCategoryClick}
//                         >
//                             Category
//                         </div>

//                         {/* Dropdown for Category */}
//                         {categoryDropdownOpen && (
//                             <div className="w-full bg-white border border-gray-300 rounded shadow-lg mt-1">
//                                 {categories.length > 0 ? (
//                                     categories.map((cat, index) => (
//                                         <div
//                                             key={cat.id}
//                                             className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                                             onClick={() => handleCategorySelect(cat)}
//                                         >
//                                             {cat.name}
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="px-4 py-2 text-gray-500">No Categories Found</div>
//                                 )}
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Sidebar;











const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [lawyers, setLawyers] = useState([]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    // Fetch categories from backend
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:4000/category/get');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data.categories || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch lawyers based on category (filter)
    const fetchLawyersByCategory = async (categoryId = null) => {
        try {
            const url = categoryId
                ? `http://localhost:4000/lawyer/search?categoryId=${categoryId}`
                : 'http://localhost:4000/lawyer/all';
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setLawyers(data.lawyers || []);
        } catch (error) {
            console.error('Error fetching lawyers:', error);
        }
    };

    // Handle Category click
    const handleCategoryClick = () => {
        setCategoryDropdownOpen(!categoryDropdownOpen);
        if (!categoryDropdownOpen) {
            fetchCategories();
        }
    };

    // Handle Category Selection
    const handleCategorySelect = (category) => {
        setSelectedCategoryId(category.id);  // Set selected category ID
        fetchLawyersByCategory(category.id);  // Fetch filtered lawyers
        setCategoryDropdownOpen(false);
    };

    // Remove Filter
    const handleRemoveFilter = () => {
        setSelectedCategoryId(null);  // Reset selected category ID
        fetchLawyersByCategory();  // Fetch all lawyers
    };

    return (
        <div
            className={`fixed top-0 left-0 h-screen bg-indigo-50 transition-all duration-300 ease-in-out shadow-lg border-r-2 border-indigo-500 ${isOpen ? 'w-[15%]' : 'w-[4%]'}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className={`flex flex-col items-start p-4 ${isOpen ? 'block' : 'hidden'}`}>
                <div className="sidebar-item text-black font-bold flex items-center my-2 mx-4 text-2xl">
                    <img src={Logo} alt='Legal Links' height='500px' width='500px'/>
                </div>
                <hr className="border-t-2 border-black my-1 w-full" />

                {/* Messages Link */}
                <div
                    className="sidebar-item w-full text-black flex items-center mt-10 mb-4 px-7 text-xl font-semibold hover:bg-indigo-500 hover:text-white  rounded p-2 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleNavigate('/')}
                >
                    Messages
                </div>

                {/* Find Lawyer Link */}
                <div
                    className="sidebar-item w-full text-black  font-semibold flex items-center my-4 px-7 text-xl hover:bg-indigo-500 hover:text-white  rounded p-2 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleNavigate('/users/Find_Lawyer')}
                >
                    Find Lawyer
                </div>

                {/* Show Category Link only on /users/Find_Lawyer */}
                {location.pathname === '/users/Find_Lawyer' && (
                    <>
                        <div
                            className="sidebar-item w-full text-black flex items-center my-4 px-7 text-xl font-semibold hover:bg-indigo-500 hover:text-white rounded p-2 transition-colors duration-200 cursor-pointer"
                            onClick={handleCategoryClick}
                        >
                            Category
                        </div>

                        {/* Dropdown for Category */}
                        {categoryDropdownOpen && (
                            <div className="w-full bg-white border border-gray-300 rounded shadow-lg mt-1">
                                {categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <div
                                            key={cat.id}
                                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                                            onClick={() => handleCategorySelect(cat)}
                                        >
                                            {cat.name}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-gray-500">No Categories Found</div>
                                )}
                            </div>
                        )}

                        {/* Display Selected Filter */}
                        {selectedCategoryId && (
                            <div className="w-full px-4 py-2 mt-4 bg-blue-200 rounded flex justify-between items-center">
                                <span>Filter Applied</span>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={handleRemoveFilter}
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;

