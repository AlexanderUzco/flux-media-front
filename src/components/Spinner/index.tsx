const Spinner = () => {
  return (
    <div className='flex items-center justify-center h-full w-full'>
      <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-e-transparent align-[-0.125em] text-black dark:text-white'>
        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Spinner;
