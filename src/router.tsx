import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ModulePage from './pages/ModulePage'
import LessonPage from './pages/LessonPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'module/:moduleId', element: <ModulePage /> },
      { path: 'lesson/:moduleId/:lessonId', element: <LessonPage /> },
    ],
  },
])
