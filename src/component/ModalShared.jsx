// @ts-ignore
const ModalShared = ({ showModal, children, size, onClose}) => {
  // @ts-ignore
 
  // @ts-ignore
  const handleModalClick = (e) => {
    console.log("presionado",e.target)
    if (!e.target.className.includes("modal-overlay")) {     
      onClose();
    }
  };

  if (showModal) {
    return (
      <>     
        <div
          onClick={(e)=>handleModalClick(e)}
          className="  w-full  flex mx-auto items-center justify-center  overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none "
        >
           <div onClick={(e)=>handleModalClick(e)} className=" opacity-10 w-full h-full items-center justify-center absolute inset-0 z-60 bg-black"></div>
          <div className=" z-70 h-[400px] justify-center my-6 mx-auto p-2">
            <div
              className={` shadow-2xl modal-overlay w-[60%] mx-auto  overflow-y-auto relative h-[300px] max-h-screen bg-white items-center justify-center rounded-md pt-4 px-8 py-6`}
            >
              {children}
            </div>
          </div>
        </div>
      </>  
    );
  }
  return null;
};

export default ModalShared;
