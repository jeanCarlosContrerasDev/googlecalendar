// @ts-ignore
const ModalShared = ({ showModal, children, size, onClose }) => {
  //se valida si al hacer clic se hizo sobre el div que comntiene la clase overlay
  // @ts-ignore
  const handleModalClick = (e) => {
    if (!e.target.className.includes("modal-overlay")) {     
      onClose();
    }
  };

  if (showModal) {
    return (
      <>     
        <div
          onClick={(e)=>handleModalClick(e)}
          className=" w-full bg-gray-300 flex items-center justify-center  overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none "
        >
          <div className={`w-[800px] max-w-full  h-[600px] relative my-6 mx-auto p-2`}>
            {/*content*/}
            <div
              className={` shadow-2xl modal-overlay w-full overflow-y-auto relative h-[360px] max-h-screen bg-white items-center justify-center rounded-md pt-4 px-8 py-6`}
            >
              {/* Header */}
              {children}
            </div>
          </div>
        <div className="opacity-50 w-full h-full items-center justify-center absolute inset-0 z-40 bg-black"></div>
        </div>
      </>  
    );
  }
  return null;
};

export default ModalShared;
