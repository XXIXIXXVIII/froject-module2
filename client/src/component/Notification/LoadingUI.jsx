import Loading from "../../assets/img/loading.gif";

function LoadingUI() {
  return (
    <div className="fixed z-30 w-[5vw] left-1/2 -translate-x-1/2  top-10">
      <img src={Loading}/>
    </div>
  );
}

export default LoadingUI;
