const SocialNetwork = ({ name, url, username, Icon }) => {
  return (
    <li className="flex items-center space-x-2">
      <Icon className="h-5 w-5" />
      <div>
        {name}:{" "}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-violet-500 cursor-pointer link link-underline link-underline-violet-500"
        >
          {username}
        </a>
      </div>
    </li>
  );
};

export default SocialNetwork;
