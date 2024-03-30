const ListingsLoading = ({ divider = 5, css = "w-[calc(100%/2-50px)]" }) => {
  return (
    <div className={`${divider === 5 ? "w-full sm:w-3/6 md:w-2/6 sm:px-3 mb-8" : css }`} >
      <div className="rounded xl bg-borderColor w-full min-h-[250px] h-[calc(50vh/5+10px)] mb-4"></div>
      <div className="mb-1 flex items-center justify-between">
        <div className="h-6 rounded w-7/12 bg-borderColor"></div>
        <div className="h-6 rounded w-16 bg-borderColor"></div>
      </div>
      <div className="mb-1 h-6 rounded w-5/12 bg-borderColor"></div>
      <div className="mb-1 h-6 rounded w-4/12 bg-borderColor"></div>
      <div className="mb-1 h-6 rounded w-2/12 bg-borderColor"></div>
    </div>
  );
};

export default ListingsLoading;
