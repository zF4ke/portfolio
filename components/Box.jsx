const Box = (props) => {
  return (
    <div className="flex flex-col rounded-md w-3/4 max-w-xs h-[7.5rem] p-4 border-2 space-y-2 md:w-64 md:h-[8.5rem] md:p-4 md:border-2 md:space-y-2 lg:w-80 lg:h-40 lg:p-4 lg:border-2 lg:space-y-2 border-purple hover:opacity-[65%] transition duration-300 cursor-pointer ">
      <p className="text-sm md:text-base lg:text-xl font-mono">{props.name}</p>
      <hr />
      <p className="text-xs md:max-w-[9rem] md:text-sm lg:text-base dark:text-gray-300">
        {props.description}
      </p>
    </div>
  );
};

export default Box;
