 


import React from 'react';
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const LawyerCard = ({ lawyer }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleMessageClick = () => {
    // Navigate to the root path with the lawyer's ID as a query parameter
    navigate(`/?lawyerId=${lawyer.id}`);
  };

  return (
    <div className="border border-gray-300 pb-5 m-5 rounded w-80 text-center shadow-md bg-white">
      <div className='bg-gradient-to-b from-[#91baff] to-[#5b5ddd] h-28 rounded-tl-[4px] rounded-tr-[4px] rounded-bl-[0px] rounded-br-[0px]'></div>
      <div>
        <img src={lawyer.image} alt={lawyer.name} className="h-36 w-36 bg-white p-1.5 rounded-full mt-[-85px] ml-24"/>
        <div className='text-4xl font-semibold'> {lawyer.name}</div>
        <div className='text-lg font-semibold text-left mt-7 pl-10'> <span className='text-gray-400'>Gender: </span> {lawyer.gender}</div>
        <div className='text-lg font-semibold text-left pl-10'><span className='text-gray-400'>Age: </span> {lawyer.age}</div>
        <div className='text-lg font-semibold text-left pl-10'><span className='text-gray-400'>Experience: </span> {lawyer.experience}</div>
        <div className='text-lg font-semibold text-left pl-10'><span className='text-gray-400'>Ratings: </span> {lawyer.ratings}</div>
        <div className='text-lg font-semibold text-left pl-10'><span className='text-gray-400'>Email: </span> {lawyer.email}</div>
        <div className='text-lg font-semibold text-left pl-10'><span className='text-gray-400'>Category: </span> {lawyer.email}</div>

        {/* Add onClick handler to the Button */}
        <Button 
          label='Message' 
          className='text-base w-[55%] mb-2.5 mt-7 mx-14 pt-2 pb-2.5 rounded-[40px]' 
          onClick={handleMessageClick} 
        />
      </div>
    </div>
  );
};

export default LawyerCard;
