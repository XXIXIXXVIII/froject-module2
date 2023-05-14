import { Link } from "react-router-dom";
import logo from "../../assets/img/Netflix_logo.svg.png";

function HeaderSign() {
  return (
    <div>
      <Link to="/" className="absolute w-52 top-5 left-5 z-40">
        <img src={logo}/>
      </Link>
    </div>
  );
}

export default HeaderSign;
