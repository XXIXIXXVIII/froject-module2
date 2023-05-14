import HeaderAcount from "../component/header/HeaderAcount";
import FooterSign from "../component/footer/FooterSign";

function AccountLayout({children}) {
  return ( 
    <div className="relative min-h-screen bg-gay">
        <HeaderAcount/>
        <div>{children}</div>
        <FooterSign bg={"rgb(243, 244, 246)"} color={"black"}/>
    </div>
   );
}

export default AccountLayout;