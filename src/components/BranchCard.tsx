import React from 'react';


// Define the types for the props
interface BranchCardProps {
  branchName: string;
  location: string;
  phone: React.ReactNode;
  imageSrc?: string;
}

const BranchCard: React.FC<BranchCardProps> = ({ branchName, location, phone, imageSrc }) => {
  return (
    <div className="flex items-center gap-6 p-3 bg-white  rounded-2xl w-full md:w-3/4 lg:w-1/2 mx-auto">
      <div className="flex justify-start">
        <img
          className="w-70 h-40 object-cover shadow-xl rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110 "
          alt="No image"
          src={imageSrc || 'https://i.pinimg.com/736x/f3/50/25/f3502537a9be2db3a49e2a3ccf4ef15f.jpg'}
        />
      </div>
      <div className="flex flex-col text-left">
        
        <p className="text-1xl text-black font-jomhuria font-bold">'🏋️‍♀️'Branch: {branchName}</p>
        <p className="text-black">Location: {location}</p>
        <p className="text-black">Phone: {phone}</p>
        <button className="mt-4 bg-green-600 text-white w-50 rounded-md">
          View Promotion
        </button>
      </div>
    </div>
  );
};

export default BranchCard;
