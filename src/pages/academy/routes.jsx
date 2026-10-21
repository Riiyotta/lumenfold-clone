import { Navigate } from 'react-router-dom'
import Lesson from './Lesson'
import { lessons, lessonPath } from '../../content/academy'

// T11 Academy Lesson routes. /relevance-academy has no index page; it opens the first lesson.
export const academyRoutes = [
  { path: '/relevance-academy', element: <Navigate to={lessonPath(lessons[0])} replace /> },
  { path: '/relevance-academy/:slug', element: <Lesson /> },
]
