import { RouterProvider, createHashRouter } from 'react-router';
import routes from './routes';
import { StoreProvider } from './store';
import { store } from './stores';

const router = createHashRouter([routes]);

function App() {
  return (
    <StoreProvider value={store}>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;
