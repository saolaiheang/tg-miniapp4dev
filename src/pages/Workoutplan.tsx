
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

interface workoutPlan{
  id: number,
  name: string,
}

const WorkoutPlanPage = () => {
  const navigate = useNavigate();
  const [workoutPlans, setWorkoutPlans] = useState<workoutPlan[]>([]);

  useEffect(()=>{
    const fetchWorkoutPlans = async () => {
      try{
        const response = await fetch(`http://localhost:3307/api/workout_plan/all`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setWorkoutPlans(data.workout);

      }catch(error){
        console.error(error);
      }
      }
      fetchWorkoutPlans();
  }, []);

  return (
    <div className="min-h-screen">


      {/* Header */}
      <div className=" text-center text-white p-6 ">
        <h2 className="text-4xl font-bold text-[#5C9C31]">Workouts Plan</h2>
        <p className="text-xl">You can do exercises with workout plans that you want</p>
      </div>

      {/* Workout List */}
      <div className="py-6 bg-white rounded-2xl">
      {workoutPlans.length > 0 ? (
         workoutPlans.map((plan,index) => (
          <button
            key={index}
            onClick={() => navigate(`/workout/${plan.id}/workouts`)}
            className="block w-full text-black bg-gray-300 text-left p-4  mb-2 hover:bg-gray-400 transition"
          >
            🏋️ {plan.name}
          </button>
        ))
        ) : (
          <p className="text-center text-gray-500">No workout plans available.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlanPage;