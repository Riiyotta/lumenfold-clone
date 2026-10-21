import { Navigate } from 'react-router-dom'
import { BlogIndex, TextIndex } from './ListingGrid'
import { BlogArticle, GuideArticle, TopicArticle, NoteArticle } from './Article'
import { EventsHub, ResourcesHub } from './HubIndex'
import EventDetail from './EventDetail'
import { ComparisonIndex, ComparisonPage } from './Comparison'
import Changelog, { ChangelogEntryRedirect } from './Changelog'
import FAQPage from './FAQPage'

// Editorial / content routes. Mount inside the app shell: contentRoutes.map(r => <Route key={r.path} {...r} />)
export const contentRoutes = [
  { path: '/blog', element: <BlogIndex /> },
  { path: '/blog/:slug', element: <BlogArticle /> },
  { path: '/learn', element: <TextIndex kind="learn" /> },
  { path: '/learn/:slug', element: <GuideArticle section="learn" /> },
  { path: '/prompt-engineering', element: <Navigate to="/learn" replace /> },
  { path: '/prompt-engineering/:slug', element: <GuideArticle section="prompt-engineering" /> },
  { path: '/topics', element: <TextIndex kind="topics" /> },
  { path: '/topics/:slug', element: <TopicArticle /> },
  { path: '/posts/:slug', element: <NoteArticle /> },
  { path: '/events', element: <EventsHub /> },
  { path: '/events/:slug', element: <EventDetail /> },
  { path: '/resources', element: <ResourcesHub /> },
  { path: '/vs', element: <ComparisonIndex /> },
  { path: '/vs/:slug', element: <ComparisonPage /> },
  { path: '/changelog', element: <Changelog /> },
  { path: '/changelog/:entry', element: <ChangelogEntryRedirect /> },
  { path: '/frequently-asked-questions', element: <FAQPage /> },
]
