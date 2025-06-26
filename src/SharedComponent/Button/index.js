import './style.css';
const Button = ({ text, onClick, variant }) => {
  return (
    <button
      onClick={onClick}
      className={`shared-button ${variant}`}
    >
      {text}
    </button>
  );
};

export default Button;
