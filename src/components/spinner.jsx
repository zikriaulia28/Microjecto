function Spinner() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-black opacity-60 flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-[6px] border-t-4 h-20 w-20 mb-4 border-primary  animate-spin"></div>
      <h2 className="text-center text-white text-xl font-semibold">
        Loading...
      </h2>
      <p className="w-1/3 text-center text-white">
        This may take a few seconds, please don`t close this page.
      </p>
    </div>
  );
}

export default Spinner;
