const Box = ({ name, description, onClickRef }) => {
  const handleClickScroll = (ref) => {
    if (!ref || ref.current == null) return;

    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div
      className="flex flex-col rounded-md w-3/4 max-w-xs h-[8.5rem] p-4 border-2 space-y-2 md:w-[12.5rem] md:h-[9.5rem] md:p-4 md:border-2 md:space-y-2 lg:w-80 lg:h-40 lg:p-4 lg:border-2 lg:space-y-2 border-purple hover:opacity-[65%] hover:scale-105 transition duration-300 cursor-pointer divide-y divide-purple bg-slate-50 dark:bg-dark-blurple"
      onClick={() => handleClickScroll(onClickRef)}
    >
      <p className="text-sm md:text-base lg:text-xl font-mono">{name}</p>
      <p className="text-xs md:max-w-[12rem] md:text-sm lg:text-base dark:text-gray-300 pt-1 font-jetbrains">
        {description}
      </p>
    </div>
  );
};

export default Box;
