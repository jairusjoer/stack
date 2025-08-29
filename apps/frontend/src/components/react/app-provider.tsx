import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '../../routeTree.gen';
import { StrictMode } from 'react';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const AppProvider = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};
