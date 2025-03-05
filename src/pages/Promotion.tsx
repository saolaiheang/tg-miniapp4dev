import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/header";

const packages = [
  {
    name: "Elite Strength Package",
    price: "25% OFF on 6-month plan",
    benefits: [
      "15% OFF on group training classes",
      "Strength & Conditioning Workouts",
      "Personalized Training Plans",
      "Access to Exclusive Fitness Events"
    ]
  }
];
interface Promotion {
  name: string;
  discount_percentage: string;
  benefits: string[];
}

const Promotion = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch("http://localhost:3307/api/promotion/all");
        if (!response.ok) throw new Error("Failed to fetch promotions");

        const data = await response.json();
        console.log("API Response:", data); // Debugging line

        if (Array.isArray(data)) {
          setPromotions(data);
          console.log(data);

        } else {
          console.error("Unexpected API response format:", data);
          setPromotions([]); // Prevent map error
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load promotions.");
        setPromotions([]); // Ensure promotions is never undefined
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-4 sm:p-6">
      <motion.div
        className="max-w-sm sm:max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <Navbar />

        {/* Image Section */}
        <div className="relative">
          <img
            src="https://i.pinimg.com/236x/d1/ef/db/d1efdba923702381cf8229aae885c579.jpg"
            alt="Gym Workout"
            className="w-full h-48 sm:h-60 object-cover"
          />
          {/* Discount Badge */}
          {promotions.map((promotion, index) => (
            <motion.div
              key={index}
              className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-green-600 text-white py-1 px-3 sm:py-1.5 sm:px-5 rounded-full text-xs sm:text-sm font-bold shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {promotion.discount_percentage}%
            </motion.div>
          ))}

        </div>

        {/* Packages */}
        <div className="p-4 sm:p-6 bg-black text-white rounded-b-2xl space-y-4 sm:space-y-6">
          {packages.map((pkg, index) => (
            <div key={index} className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-lg text-center">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-2 sm:mb-3">
                <span className="bg-green-600 text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-md">{pkg.name}</span>
                <span className="text-sm sm:text-lg font-bold text-green-500 mt-2 sm:mt-0">{pkg.price}</span>
              </div>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-left">
                {pkg.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center space-x-1 sm:space-x-2">
                    <FaCheckCircle className="text-green-500 text-sm sm:text-base" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs sm:text-sm text-gray-300">Valid Until: Mon, Mar 31, 2025</p>
              <button className="mt-3 sm:mt-4 w-full bg-green-600 text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold shadow-md hover:bg-green-500 transition">Claim Now</button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Promotion;