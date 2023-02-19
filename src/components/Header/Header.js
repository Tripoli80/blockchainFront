export const Header = ({ toReset }) => {
  return (
    <header>
      <div className="container">
        <div className="logo" onClick={toReset}>
          AppCo
        </div>
      </div>
    </header>
  );
};
