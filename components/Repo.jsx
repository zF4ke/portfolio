import { IoIosRocket } from "react-icons/io";

const Repo = ({ repo }) => {
  return (
    <div
      key={repo.id}
      className="border-2 rounded-md border-solid border-violet-500 p-4 space-y-2"
    >
      <h5 className="flex items-center path-purple">
        {repo.homepage && <IoIosRocket className="mr-2 fill-violet-600" />}
        <a
          href={repo.svn_url}
          target="_blank"
          rel="noreferrer"
          className="text-violet-400 hover:opacity-75 transition-all duration-150"
        >
          {repo.name}
        </a>
      </h5>

      <p className="text-violet-300 text-sm md:text-md lg:text-lg">
        {repo.description ? repo.description : "Sem descrição."}
      </p>

      {repo.homepage && (
        <div className="pt-2 pb-2">
          <a
            href={`//${repo.homepage}`}
            target="_blank"
            rel="noreferrer"
            className="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 transitions-all duration-100 px-5 py-2 text-sm rounded-full font-semibold text-white"
          >
            Open
          </a>
        </div>
      )}
    </div>
  );
};

export default Repo;
