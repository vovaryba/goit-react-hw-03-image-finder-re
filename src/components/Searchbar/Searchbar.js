import SearchForm from 'components/SearchForm';
import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => (
  <header className={s.Searchbar}>
    <SearchForm onSubmit={onSubmit} />
  </header>
);

export default Searchbar;
