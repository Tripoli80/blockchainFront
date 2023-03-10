import Buttom from '../Buttom/Buttom';
import Select from '../Select/Select';

export const Filter = ({ filterData, searchState, getDataByQuery }) => {
  const onSubmit = e => {
    e.preventDefault();
    getDataByQuery();
  };
  const { query, setQuery } = searchState;
  const onChange = e => {
    const textToSerch = e.target.value;
    setQuery(textToSerch);
  };

  return (
    <div className="container">
      <div className="filter__wraper">
        <form className="filter__form" onSubmit={onSubmit}>
          <input
            onChange={onChange}
            className="filter__search"
            type="text"
            name="username"
            value={query}
            placeholder="Search..."
          />
          <Select filterData={filterData} />
          <Buttom
            type="submit"
            bgUrl={'searchBtr'}
            custumStyle={'filter__submit'}
          />
        </form>
      </div>
    </div>
  );
};
