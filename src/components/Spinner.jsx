import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-wrap" role="status" aria-label="Loading">
      <span className="spinner" />
    </div>
  );
};

export default Spinner;
