import { createBrowserRouter } from "react-router-dom";
import Home from "../education/home/pages/Home";
import Courses from "../education/courses/pages/Courses";
import Groups from "../education/groups/pages/Groups";
import Error from "../share/errors/pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/groups",
        element: <Groups />,
      },
    ],
  },
]);
export default router;
