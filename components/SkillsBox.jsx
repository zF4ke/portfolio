import Image from "next/image";

import htmlIcon from "../public/images/icons/html.svg";
import cssIcon from "../public/images/icons/css.svg";
import javascriptIcon from "../public/images/icons/javascript.svg";
import typescriptIcon from "../public/images/icons/typescript.svg";
import pythonIcon from "../public/images/icons/python.svg";
import reactIcon from "../public/images/icons/react.svg";
import mongodbIcon from "../public/images/icons/mongodb.svg";
import firebaseIcon from "../public/images/icons/firebase.svg";
//import nextjsIcon from "../public/images/icons/nextjs.svg";

const Skill = ({ icon, name, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="hover:scale-110 transition duration-300 w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12"
    >
      <Image src={icon} alt={name} />
    </a>
  );
};

const SkillsBox = (props) => {
  return (
    <div className="flex flex-col rounded-md w-3/4 max-w-xs h-[8.5rem] p-4 border-2 sm:w-full sm:max-w-none md:h-[9.5rem] md:p-4 md:border-2 lg:h-40 lg:p-4 lg:border-2 border-purple items-center justify-center bg-slate-50 dark:bg-dark-blurple">
      <div className="text-center max-w-[200px] sm:max-w-none">
        <p className="font-mono text-md md:text-xl dark:text-gray-400">
          Skills
        </p>
        <div className="flex space-x-[6px] mt-4 cursor-pointer md:space-x-5">
          <Skill icon={htmlIcon} name="HTML5" url="//www.w3.org/html/" />
          <Skill icon={cssIcon} name="CSS3" url="//www.w3schools.com/css/" />
          <Skill
            icon={javascriptIcon}
            name="JavaScript"
            url="//developer.mozilla.org/en-US/docs/Web/JavaScript"
          />
          <Skill
            icon={typescriptIcon}
            name="TypeScript"
            url="//www.typescriptlang.org//"
          />
          <Skill icon={pythonIcon} name="Python" url="//www.python.org/" />
          <Skill icon={reactIcon} name="React" url="//reactjs.org/" />
          <Skill icon={mongodbIcon} name="MongoDB" url="//www.mongodb.com/" />
          <Skill
            icon={firebaseIcon}
            name="Firebase"
            url="//firebase.google.com/"
          />
          <a
            href="//nextjs.org/"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transition duration-300"
          >
            <svg
              className="dark:fill-[#eeeeee] w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 lg:w-12 lg:h-12"
              viewBox=".5 -.2 1023 1024.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m478.5.6c-2.2.2-9.2.9-15.5 1.4-145.3 13.1-281.4 91.5-367.6 212-48 67-78.7 143-90.3 223.5-4.1 28.1-4.6 36.4-4.6 74.5s.5 46.4 4.6 74.5c27.8 192.1 164.5 353.5 349.9 413.3 33.2 10.7 68.2 18 108 22.4 15.5 1.7 82.5 1.7 98 0 68.7-7.6 126.9-24.6 184.3-53.9 8.8-4.5 10.5-5.7 9.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5-102.5-151.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8 67.3-1 149.6-.3 144.1-.4 149.9-2.2 153.3-2.6 4.9-4.6 6.9-8.8 9.1-3.2 1.6-6 1.9-21.1 1.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6 3.1-3.9c1.6-2.1 5-4.8 7.4-6.1 4.1-2 5.7-2.2 23-2.2 20.4 0 23.8.8 29.1 6.6 1.5 1.6 57 85.2 123.4 185.9s157.2 238.2 201.8 305.7l81 122.7 4.1-2.7c36.3-23.6 74.7-57.2 105.1-92.2 64.7-74.3 106.4-164.9 120.4-261.5 4.1-28.1 4.6-36.4 4.6-74.5s-.5-46.4-4.6-74.5c-27.8-192.1-164.5-353.5-349.9-413.3-32.7-10.6-67.5-17.9-106.5-22.3-9.6-1-75.7-2.1-84-1.3zm209.4 309.4c4.8 2.4 8.7 7 10.1 11.8.8 2.6 1 58.2.8 183.5l-.3 179.8-31.7-48.6-31.8-48.6v-130.7c0-84.5.4-132 1-134.3 1.6-5.6 5.1-10 9.9-12.6 4.1-2.1 5.6-2.3 21.3-2.3 14.8 0 17.4.2 20.7 2z" />
              <path d="m784.3 945.1c-3.5 2.2-4.6 3.7-1.5 2 2.2-1.3 5.8-4 5.2-4.1-.3 0-2 1-3.7 2.1zm-6.9 4.5c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-7.6 4c-3.8 2-3.6 2.8.2.9 1.7-.9 3-1.8 3-2 0-.7-.1-.6-3.2 1.1z" />
            </svg>
          </a>
        </div>
        {/* <p className="font-mono text-2xl">Coming Soon</p> */}
      </div>
    </div>
  );
};

export default SkillsBox;
