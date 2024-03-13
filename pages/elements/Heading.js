function Heading({text}) {
    return (
        <div className="container mx-auto px-4 flex flex-wrap items-center">
        <div className="flex items-center">
          <div className="flex justify-center items-center h-10 w-10 rounded-full border-2 border-black" style={{BackgroudColor :"#3F2A17"}}>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ color: '#3F2A17' }} role="presentation" focusable="false" className="h-5 w-5 stroke-current ">
              <g fill="none">
                <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136L20 4"></path>
              </g>
            </svg>
          </div>
          <h2 className="text-3xl font-medium ml-4 text-bold" style={{ color: '#3F2A17' }}>{text}</h2>
        </div>
      </div>
      
    );
}

export default Heading;
