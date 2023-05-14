import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangePassSlice, ClearState } from "../redux/userSlice";
import Alert from "./Notification/Alert";
import loading from "../assets/img/loading.gif";

function ChangePass({ setShowChangePass, username }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatNewPass, setRepeatNewPass] = useState("");
  const { status, error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(ClearState());
  }, []);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setShowChangePass();
  };

  const handleSubmid = () => {
    dispatch(ChangePassSlice({ oldPass, newPass, repeatNewPass, username }));
  };
  useEffect(() => {
    if (status == "succeededChangePass") {
      setShowChangePass();
    }
  }, [status]);

  return (
    <>
      {status === "loading" && (
        <img
          className="w-[8vw] fixed left-1/2 z-50 -translate-x-1/2"
          src={loading}
        />
      )}
     
      {error && <Alert title={error} success={false} />}
      <div className="fixed flex z-20 flex-col pt-12 items-center gap-5 w-1/3 h-3/4 bg-gray-700 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2">
        <h3 className="text-4xl text-white">Change Password</h3>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col  gap-4">
            <label
              htmlFor="old-pass"
              className=" text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Old Password
            </label>
            <input
              onChange={(e) => setOldPass(e.target.value)}
              type="password"
              id="old-pass"
              autoComplete="off"
              className=" text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2   border-gray-700 bg-gray-800  font-normal w-64 h-10 flex items-center pl-3 text-sm  rounded border shadow"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="newPass"
              className=" text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              New Password
            </label>
            <input
              onChange={(e) => setNewPass(e.target.value)}
              type="password"
              id="newPass"
              autoComplete="off"
              className=" text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2   border-gray-700 bg-gray-800  font-normal w-64 h-10 flex items-center pl-3 text-sm  rounded border shadow"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="Repeat password"
              className=" text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Repeat New Password
            </label>
            <input
              onChange={(e) => setRepeatNewPass(e.target.value)}
              type="password"
              id="Repeat password"
              autoComplete="off"
              className=" text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2   border-gray-700 bg-gray-800  font-normal w-64 h-10 flex items-center pl-3 text-sm  rounded border shadow"
            />
          </div>
          <div className="flex text-white gap-6 mt-5">
            <button
              onClick={handleCancel}
              className=" border-2 border-[rgb(0,204,54)] hover:border-[rgb(19,91,38)] mr-6 rounded text-base px-7 py-[10px]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmid}
              className="bg-[rgb(0,204,54)] hover:bg-[rgb(19,91,38)] rounded text-base px-7 py-3"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePass;
