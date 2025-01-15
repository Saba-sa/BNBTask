const Heading = ({ title = '' }) => {
  return (
    <h2 className="text-white text-md font-semibold mb-4 border-b-2 border-teal-400 inline-block w-auto">
      {title}
    </h2>
  );
};

export default Heading;
