import { useRouter } from "next/router";

function Heading({ text, value, handleClick }) {
  const router = useRouter();

  // const record = value ? value:"/account"
  // const handleClick = () => {
  //   router.push(record);
  // };

  return (
    <div className="flex px-3 flex-wrap items-center">
      <div className="flex items-center ">
        <div
          className="flex cursor-pointer justify-center items-center h-10 w-10 rounded-full border border-gray-800"
          style={{ color: "#000" }}
          onClick={handleClick}
        >
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ color: "#000" }}
            role="presentation"
            focusable="false"
            className="h-5 w-5 stroke-current"
          >
            <g fill="none">
              <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136L20 4"></path>
            </g>
          </svg>
        </div>
        <h2
          className="sm:text-3xl text-lg font-medium ml-4 text-bold"
          style={{ color: "#3F2A17" }}
        >
          {text}
        </h2>
      </div>
    </div>
  );
}

export default Heading;
