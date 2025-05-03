import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.tsx";
import App from "./App.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import SkillsPage from "./pages/SkillsPage.tsx";
import ExperiencePage from "./pages/ExperiencePage.tsx";
import ImagesPage from "./pages/ImagesPage.tsx";
import SettingPage from "./pages/SettingPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import AddProjectPage from "./pages/AddProjectPage.tsx";
import AddSkillPage from "./pages/AddSkillPage.tsx";
import AddExperiencePage from "./pages/AddExperiencePage.tsx";
import AddImagePage from "./pages/AddImagePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
          <App />
        </Layout>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/add",
        element: <AddProjectPage />,
      },
      {
        path: "skills",
        element: <SkillsPage />,
      },
      {
        path: "skills/add",
        element: <AddSkillPage />,
      },
      {
        path: "experience",
        element: <ExperiencePage />,
      },
      {
        path: "experience/add",
        element: <AddExperiencePage />,
      },
      {
        path: "images",
        element: <ImagesPage />,
      },
      {
        path: "images/add",
        element: <AddImagePage />,
      },
      {
        path: "settings",
        element: <SettingPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
