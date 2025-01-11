 

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import LawyerList from './LawyerList';

const FindLawyerPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lawyers, setLawyers] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Fetch all lawyers from the backend when the page loads
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await fetch('http://localhost:4000/lawyer/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
          console.log()
        console.log('data', data.lawyers);
        if (Array.isArray(data.lawyers)) {
          setLawyers(data.lawyers); // Set the array of lawyers
        } else {
          setLawyers([]);
        }
      } catch (error) {
        console.error('Error fetching lawyers:', error);
      }
    };

    fetchLawyers();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    // Clear previous timer if it exists
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  
    // Set a new timer for 500ms
    const timer = setTimeout(() => {
      if (value) {
        fetchFilteredLawyers(value); // Fetch filtered lawyers if there's a search term
      } else {
        // If the search term is empty, fetch all lawyers again
        fetchAllLawyers();
      }
    }, 500); // Adjust the delay as needed
  
    // Save the timer to state
    setDebounceTimer(timer);
  };
  
  // Fetch filtered lawyers based on the search term
  const fetchFilteredLawyers = async (query) => {
    try {
      const response = await fetch(`http://localhost:4000/lawyer/search?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setLawyers(data.lawyers); // Update the lawyers state with filtered results
      } else {
        setLawyers([]); // Clear the lawyers if no results found
      }
    } catch (error) {
      console.error('Error fetching filtered lawyers:', error);
    }
  };
  
  // Fetch all lawyers again
  const fetchAllLawyers = async () => {
    try {
      const response = await fetch('http://localhost:4000/lawyer/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      if (Array.isArray(data.lawyers)) {
        setLawyers(data.lawyers); // Reset to all lawyers
      } else {
        setLawyers([]);
      }
    } catch (error) {
      console.error('Error fetching all lawyers:', error);
    }
  };
  return (
    <div className='w-screen flex'>
      <Sidebar text='Find Lawyer' />
      <div className="flex-1 pl-5 pb-5 bg-white ">
        <div className="border-4 border-indigo-50 border-b-indigo-500 bg-[#F3F4F8] ">
        <div className="text-center mb-5">
          <div className="flex items-center justify-center w-1/2 mx-auto rounded-3xl border-2 border-indigo-400 overflow-hidden my-5 ">
            <input
              type="text"
              placeholder="Search lawyer..."
              value={searchTerm}
              onChange={handleSearchChange} // Use the new handler
              className="flex-1 px-5 text-lg border-none outline-none"
            />
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                <path d="M10 10m-7 0a 7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                <path d="M21 21l-6 -6"></path>
              </svg>
            </button>
          </div>
        </div>
        </div>
        {/* Pass the lawyers state to LawyerList */}
        <LawyerList lawyers={lawyers} />
      </div>
    </div>
  );
};

export default FindLawyerPage;