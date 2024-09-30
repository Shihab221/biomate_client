import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonGroupWithIcons = ({ buttons, icons, clickEvents }) => {
  return (
    <div className="py-5 flex flex-col">
      {buttons.map((item, index) => {
        return (
          <button
            key={index}
            onClick={clickEvents[index]}
            className="flex items-center text-xl mt-7 text-slate-800 hover:text-teal-400 border-none"
          >
            <FontAwesomeIcon
              icon={icons[index]}
              className="p-1 rounded-md transition duration-300 ease-in-out max-w-[20px] hover:bg-slate-500"
            />
            <p className="ml-2 text-[16px] font-poppins">{item}</p>
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGroupWithIcons;
