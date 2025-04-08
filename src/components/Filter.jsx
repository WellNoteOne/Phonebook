const Filter = ({ search, setSearch }) => {
  return (
    <form>
      <div>
        Filter shown with:{" "}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Filter;
