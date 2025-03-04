
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Workout {
    id: number;
    name: string;
}

interface Exercise {
    id: number;
    name: string;
    sets: string;
    calories_burned: string;
    lbs?: number | null;
}

const WorkoutPlanPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loadingExercises, setLoadingExercises] = useState(false);

    useEffect(() => {
        const fetchWorkoutPlans = async () => {
            try {
                const response = await fetch(`http://localhost:3307/api/workout/${id}/workouts`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch workouts");

                const data = await response.json();
                setWorkouts(data.workout); 
            } catch (error) {
                console.error("Error fetching workouts:", error);
                setWorkouts([]); 
            }
        };
        fetchWorkoutPlans();
    }, [id]);

    const handlePlanClick = async (workout: Workout) => {
        setSelectedWorkout(workout);
        setLoadingExercises(true);
        try {
            const response = await fetch(`http://localhost:3307/api/exercise/${workout.id}/exercise`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error("Failed to fetch exercises");

            const data = await response.json();
            setExercises(data.exercise || []);
        } catch (error) {
            console.error("Error fetching exercises:", error);
            setExercises([]);
        } finally {
            setLoadingExercises(false);
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="text-center text-white mt-6">
                <h2 className="text-3xl font-bold text-[#5C9C31]">Exercise With Workout</h2>
                <p className="text-xl">Choose a workout plan and see the exercises</p>
            </div>

            <div className="py-6 rounded-2xl mt-6 ">
                {workouts.length > 0 ? (
                    workouts.map((workout) => (
                        <button
                            key={workout.id}
                            onClick={() => handlePlanClick(workout)}
                            className="block w-full text-2xl  text-black bg-[#5C9C31] bg-gray-200 text-left p-4 mb-6 hover:bg-green-200 transition rounded-lg md:text-center"
                        >
                            🏋️ {workout.name}
                        </button>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No workout plans available.</p>
                )}
            </div>



            {selectedWorkout && (
                <div className="bg-gray-100 p-4 mt-4 rounded-lg">
                    <h2 className="text-2xl font-bold text-[#5C9C31]">{selectedWorkout.name} Exercises</h2>
                    {loadingExercises ? (
                        <p className="text-gray-500">Loading exercises...</p>
                    ) : exercises.length > 0 ? (
                        <div className="grid gap-4 mt-4">
                            {exercises.map((exercise) => (
                                <div key={exercise.id} className="p-4 text-1xl bg-[#5c9c31] text-white shadow rounded-lg">
                                    <h3 className="font-semibold text-lg">{exercise.name}</h3>
                                    <p>🔥 {exercise.calories_burned}</p>
                                    <p>🏋️ {exercise.sets}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No exercises found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default WorkoutPlanPage;

