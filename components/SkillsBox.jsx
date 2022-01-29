const SkillsBox = (props) => {
  return (
    <div className="flex flex-col rounded-md w-3/4 max-w-xs h-[8.5rem] p-4 border-2 sm:w-full sm:max-w-none md:h-[9.5rem] md:p-4 md:border-2 lg:h-40 lg:p-4 lg:border-2 border-purple items-center justify-center cursor-not-allowed bg-slate-50 dark:bg-dark-blurple">
      <div className="text-center space-y-2">
        <p className="font-mono text-xl text-gray-400">Skills</p>
        <p className="font-mono text-2xl">Coming Soon</p>
      </div>
    </div>
  );
};

export default SkillsBox;
