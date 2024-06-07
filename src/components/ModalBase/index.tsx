interface IModalBase {
  open: boolean;
  closeModal: () => void;
  title: string;
  successText?: string;
  successAction?: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

const ModalBase = ({
  open,
  closeModal,
  children,
  title,
  successText,
  successAction,
  loading,
}: IModalBase) => {
  return (
    <>
      {open && (
        <>
          <div
            className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
            onClick={closeModal}
          >
            <div
              className='relative lg:w-[780px] max-h-[80vh] overflow-y-auto md:w-[500px]' // Añadido el estilo para scroll dentro del modal
              onClick={(e) => e.stopPropagation()}
            >
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                  <h3 className='text-3xl font-semibold'>{title}</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={closeModal}
                  >
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                <div className='overflow-y-auto max-h-[calc(80vh-140px)]'>
                  {children}

                  <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={closeModal}
                      disabled={loading}
                    >
                      Close
                    </button>
                    {successText && successAction && (
                      <button
                        className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                        type='submit'
                        onClick={() => successAction()}
                        disabled={loading}
                      >
                        {successText}
                      </button>
                    )}
                  </div>
                </div>{' '}
                {/* Añadido el estilo para scroll dentro del contenido del modal */}
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </>
  );
};

export default ModalBase;
