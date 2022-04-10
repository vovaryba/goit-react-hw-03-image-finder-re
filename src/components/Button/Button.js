import s from './Button.module.css';

const Button = ({ onClick }) => (
  <button type="button" onClick={onClick} className={s.Button}>
    Load more
  </button>
);

export default Button;
