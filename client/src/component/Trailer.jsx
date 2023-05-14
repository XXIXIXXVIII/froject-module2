import tmdbConfigClient from "../api/tmdbConfigClient";

function Trailer(prop) {
  let trailer = prop.trailer.slice(0,15);
  return (
    <div className="grid grid-cols-3 gap-5 my-14">
      {trailer&&trailer.length>0?trailer.map((item,index)=>{
      return <div className="w-full h-[340px]" key={index}>
         <iframe
          src={tmdbConfigClient.videos(item.key)}
          allowfullscreen
          className="w-full h-full"
        ></iframe>
      </div>
      }):<h1>aaaa</h1>}
    </div>
  );
}

export default Trailer;
