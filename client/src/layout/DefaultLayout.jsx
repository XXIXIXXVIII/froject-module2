import Header from "../component/header/Header";
import Footer from "../component/footer/Footer";

function DefaultLayout({children}) {
  return (
    <div className="bg-black text-white overflow-hidden">
      <Header />
      <div className="children">{children}</div>
      <Footer/>
    </div>
  );
}

export default DefaultLayout;
