import { MdDeleteForever } from "react-icons/md";

function ModelAlertCheck(prop) {
  const { handleShowModel, onModel, checked, dataList, handleRemove } = prop;

  const handleCancel = () => {
    handleShowModel();
  };
  const handleClickRemove =()=>{
    handleRemove()
    
  }

  return (
    <div
      style={{ display: !onModel ? "none" : "auto" }}
      className="fixed  left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 w-1/3 h-1/3 bg-[rgb(32,35,41)] rounded-xl"
    >
      <div className="flex gap-5 flex-col items-center">
        <div className=" w-full">
          <MdDeleteForever className=" text-red-600 mt-6 w-full text-7xl " />
        </div>
        <span className="text-white text-xl font-semibold ">
          You definitely want to delete{" "}
          {dataList.length === checked.length ? "All" : checked.length} movies?
        </span>
        <div className="">
          <button
            onClick={handleCancel}
            className="border-2 mr-6 border-[rgb(0,204,54)] text-[rgb(0,204,54)] rounded-md py-3 px-6"
          >
            Cancel
          </button>
          <button onClick={handleClickRemove} className="bg-[rgb(0,204,54)] hover:bg-[rgb(0,184,48)] rounded-md py-3 px-6">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModelAlertCheck;
