const Section = (props) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-10 w-3/4 sm:w-3/5 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-10 md:space-x-20 mt-64">
      <p className="w-1/3 text-center text-md sm:text-right md:text-lg lg:text-xl font-jetbrains uppercase text-purple">
        {props?.title}
      </p>
      <div className="sm:w-2/3 text-sm md:text-md lg:text-lg font-mono">
        {props?.children}
      </div>
    </div>
  );
};

export default Section;
