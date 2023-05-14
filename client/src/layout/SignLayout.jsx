import HeaderSign from "../component/header/HeaderSign";
import FooterSign from "../component/footer/FooterSign";

function SignLayout({children}) {
  return ( 
    <div className="relative xl:min-h-full">
        <HeaderSign/>
        <div>{children}</div>
        <FooterSign bg={"rgba(0,0,0,.75)"} color={"#737373"}/>
    </div>
   );
}

export default SignLayout;