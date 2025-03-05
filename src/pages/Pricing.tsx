// import { useEffect } from "react";

// const Pricing = () => {
//   useEffect(() => {
//     window.Telegram.WebApp.expand();
//   }, []);

//   const renderUserInfo = () => {
//     // if (!userInfo) return <></>;

//     return (
//       <div className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl">
//         <div>
//           <img
//             className="size-48 shadow-xl rounded-md"
//             alt="Profile Pic"
//             src="https://t.me/i/userpic/320/QKA6yq3RmRiBS_p4XCDgcr8Df6dMFrxLvLJhz9laA8U.svg"
//           />
//         </div>
//         <div className="flex flex-col items-center">
//           <span className="text-2xl font-medium">Sopheak Men</span>
//           <span className="font-medium text-sky-500">Chat ID: 569980646</span>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col items-center p-4 w-full">
//       <h1 className="text-xl font-bold text-amber-600">Mini App</h1>
//       {renderUserInfo()}
//     </div>
//   );
// };

// export default Pricing;


// import { useEffect } from "react";
// import PricingCard from "../components/Pricing";
// const Pricing = () => {
//     useEffect(() => {
//         window.Telegram.WebApp.expand();
//     }, []);


//     return (
//         <div className="space-y-4">
//             <PricingCard 
//             title=""
//             price="" />
//             <PricingCard
//              title=""
//              price="" />
//             <PricingCard
//              title=""
//              price="" />
//         </div>

//     );
// };

// export default Pricing;

import { useEffect, useState } from "react";
import PricingCard from "../components/PricingCard";

const Pricing = () => {
    // Update type to reflect price as a string
    const [pricingData, setPricingData] = useState<{ plan_name: string; price: string }[]>([]);

    useEffect(() => {
        window.Telegram.WebApp.expand();

        // Fetch API data
        fetch("http://localhost:3307/api/membership/all")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Ensure correct structure for API response
                const plans = data.plans || data; 
                setPricingData(plans);
            })
            .catch((error) => console.error("Error fetching pricing data:", error));
    }, []);

    return (
        
        <div className="space-y-6 mt-4">
            <h1 className=" text-4xl font-bold  text-[#5C9C31]">Hurry up with pricing!</h1>
            <p className="text-2xl">enjoy with the pricing!!</p>
         
            {pricingData.length > 0 ? (
                pricingData.map((item, index) => (
                    <PricingCard key={index} plan_name={item.plan_name} price={item.price} />
                ))
            ) : (
                <p>Loading pricing data...</p>
            )}
        </div>
    );
};
export default Pricing;



