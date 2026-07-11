import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { ProjectDetail } from './pages/ProjectDetail';
import { Work } from './pages/Work';
import './styles.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'on-set', element: <CategoryPage category="On Set" title="On Set" /> },
        { path: 'portraits', element: <CategoryPage category="Portraits" title="Portraits" /> },
        { path: 'lifestyle', element: <Work /> },
        { path: 'work/:slug', element: <ProjectDetail /> },
        { path: 'contact', element: <Contact /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
