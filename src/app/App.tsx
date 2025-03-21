import { RouterProvider, createHashRouter } from 'react-router';
import routes from './routes';

const router = createHashRouter([routes]);

function App() {
  return (
    <main className="dark text-foreground bg-background h-full">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
