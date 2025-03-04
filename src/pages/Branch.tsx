import { useEffect, useState } from 'react';
import BranchCard from '../components/BranchCard';

interface Branch_Contact {
    phone_number: string;
}

interface Branch {
    id: number;
    name: string;
    location: string;
    image: string;
    phone_numbers: Branch_Contact[]; // Array to hold phone numbers from Branch_Contact
}

const Branch = () => {
    const [branches, setBranches] = useState<Branch[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/branch/all') // Update URL as per your API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched data:", data);  // Log the entire data object to inspect its structure
                if (data.branchs && Array.isArray(data.branchs)) {
                    setBranches(data.branchs);
                } else {
                    console.error("Unexpected API response structure:", data);
                }
            })            
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="space-y-8">
            <div className='text-left'>
                <h1 className='text-3xl font-bold font-jomhuria'>Branch & Contact</h1>
                <button className='mt-4 text-xl bg-green-600 text-white w-50 rounded-md'>Workout Plans</button>
            </div>

            {branches.length > 0 ? (
                branches.map((branch) => (
                    <BranchCard
                        key={branch.id}
                        branchName={branch.name}
                        location={branch.location}
                        imageSrc={branch.image}
                        phone ={branch.phone_numbers && branch.phone_numbers.length > 0 ? (
                            <ul>
                                {branch.phone_numbers.map((contact, index) => (
                                    <li key={index}>{contact.phone_number}</li>
                                ))}
                            </ul>
                        ) : (
                            "No contact available"
                        )}
                    />
                ))
            ) : (
                <p>No branches available.</p>
            )}
        </div>
    );
};

export default Branch;
