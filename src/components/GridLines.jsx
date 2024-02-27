const gridArr = Array.apply(null, Array(25));

const GridLines = () => {
  return (
    <div className="grid-lines">
      {gridArr.map((_, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
};
export default GridLines;
