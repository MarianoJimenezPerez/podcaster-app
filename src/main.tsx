import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <PublicRoutes />
  </BrowserRouter>
);
