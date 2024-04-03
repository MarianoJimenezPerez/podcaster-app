import './searchBar.scss';
interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  resultsAmount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, resultsAmount }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onSearch(event.target.value);
  };

  return (
    <div className="search__bar">
      <div className="container">
        <div className="search__box">
          <h2>{resultsAmount}</h2>
          <form action="">
            <input type="text" placeholder="Buscar podcasts..." onChange={handleSearchChange} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
