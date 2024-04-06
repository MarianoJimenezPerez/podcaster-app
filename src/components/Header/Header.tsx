import { Link } from 'react-router-dom';
import './header.scss';
import { useFetchingContext } from '@/hooks/useFetchingContext';

const Header: React.FC = () => {
  const { isFetching } = useFetchingContext();

  const indicatorClass = isFetching ? 'led__indicator led__indicator--blinking' : 'led__indicator';

  return (
    <header className="header__primary">
      <div className="container">
        <div className="logo">
          <Link to={'/'}>Podcaster</Link>
        </div>
        <div className={indicatorClass}></div>
      </div>
    </header>
  );
};

export default Header;
