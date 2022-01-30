const Section = (props) => {
  return (
    <div className="flex justify-center w-3/5 space-x-20 mt-64">
      <p className="w-1/3 text-right text-xl font-jetbrains uppercase text-purple">
        {props?.title}
      </p>
      <div className="w-2/3 text-lg font-mono">{props?.children}</div>
    </div>
  );
};

export default Section;
