import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './App'
import './index.css'

// One address per page: /work/sensi/ (a hand-typed or pasted slash) is
// served by the 404 snapshot, the SPA still finds the route, and this
// drops the slash from the address bar before the router reads it, so a
// copied link is always the canonical one.
const { pathname, search, hash } = window.location
if (pathname.length > 1 && pathname.endsWith('/')) {
  history.replaceState(null, '', pathname.replace(/\/+$/, '') + search + hash)
}

// A DATA router (DL-1): the declarative <BrowserRouter> ignores the
// viewTransition flag on Link/navigate, so the soft crossfade + morphs
// (language.css) need the routes registered on createBrowserRouter.
const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
