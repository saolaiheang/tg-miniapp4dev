import { JSX } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import Layout from "../pages/Layout";
import Pricing from "../pages/Pricing";
import Promotion from "../pages/Promotion";

import Branch from "../pages/Branch";
import HomePage from "../pages/Homepage";
import WorkoutPlanPage from "../pages/Workoutplan";
import Coupon from "../pages/Coupon";
import WorkoutPage from "../pages/Workout";


export interface AppRoute {
  path?: string;
  element: JSX.Element;
  errorElement?: JSX.Element;
  children?: AppRoute[];
}

export const webRoutes = {
  home: "/",

  workoutplan:"/workoutplan",
  workout:"/workout/:id/workouts"

  pricing: "/Pricing",
  promotion: "/promotion",
  workoutplan:"/workoutplan",
  coupon: "/coupon"
 
  // discover: "/discover",
};

const errorElement = (
  <div className="flex items-center justify-center h-screen">
    Sorry, something went wrong
  </div>
);

const appRoutes: AppRoute[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: webRoutes.home, element: <HomePage /> },
      { path: webRoutes.pricing, element: <Pricing /> },
      { path: webRoutes.coupon, element: <Coupon /> },
      { path: webRoutes.promotion, element: <Promotion /> },
      { path: webRoutes.workoutplan, element: <WorkoutPlanPage /> },
      { path: webRoutes.workout, element: <WorkoutPage /> },

      // { path: webRoutes.discover, element: <DiscoverPage /> },
    ],
  },
  {
    path: "branch",
    element: <Branch />,
    errorElement: errorElement, 
  },
];
const router = createBrowserRouter(appRoutes);
export default router;
