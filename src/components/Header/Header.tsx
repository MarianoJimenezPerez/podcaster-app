import { Link } from 'react-router-dom';
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header__primary">
      <div className="container">
        <div className="logo">
          <Link to={'/'}>Podcaster</Link>
        </div>
        <div className="led__indicator"></div>
      </div>
    </header>
  );
};

export default Header;
