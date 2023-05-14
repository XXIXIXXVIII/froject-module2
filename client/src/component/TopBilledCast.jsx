
import tmdbConfigClient from "../api/tmdbConfigClient";

function TopBilledCast(prop) {

  let data = prop?.prop?.slice(0,14);



  return (
    <div className="w-full grid grid-cols-5 gap-10 my-16">
      {data && data.length > 0 ? (
        data.map((item, index) => {
          return (
            <div key={index} className="rounded-t-md overflow-hidden flex flex-col items-center gap-5">
              <div>
                <img  src={tmdbConfigClient.poster(item.profile_path)} />
              </div>
                <span className="text-xl font-medium ">{item.name||item.original_name}</span>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default TopBilledCast;
