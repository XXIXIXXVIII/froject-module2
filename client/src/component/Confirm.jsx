function Confirm({handleshowConfirm, handleSubmitPass}) {
  const handleCancel =()=>{
    handleshowConfirm()
  }
  const handleSubmid =()=>{
    handleSubmitPass()
  }
  return ( 
    <div className="fixed flex flex-col items-center justify-center top-1/2 left-1/2 z-30 bg-gray-200 w-2/5 h-1/4 text-black rounded-md -translate-y-1/2 -translate-x-1/2 ">
      <span className="text-2xl font-semibold">Have you confirmed to cancel Member?</span>
      <div className="flex  gap-6 mt-5">
            <button
              onClick={handleCancel}
              className=" border-2 border-[rgb(0,204,54)] hover:border-[rgb(19,91,38)] mr-6 rounded text-base px-7 py-[10px]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmid}
              className="bg-red-500 hover:bg-red-700 rounded text-base px-7 py-3"
            >
              Change
            </button>
          </div>
    </div>
   );
}

export default Confirm;