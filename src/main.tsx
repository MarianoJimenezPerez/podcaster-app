import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import { FetchingProvider } from './context/FetchingContext';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <FetchingProvider>
      <PublicRoutes />
    </FetchingProvider>
  </BrowserRouter>
);
