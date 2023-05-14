import {FaFacebookF, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa"

function Footer() {
  return (
    <div className="w-4/6 mx-auto text-gray-400 text-[13px] mt-5">
      <div className="flex gap-[30px] text-white text-2xl mb-3">
        <a className="hover:underline" href="https://www.facebook.com/NetflixAsia"><FaFacebookF/></a>
        <a className="hover:underline" href="https://www.instagram.com/netflixasia/"><FaInstagram/></a>
        <a className="hover:underline" href="https://twitter.com/NetflixAsia"><FaTwitter/></a>
        <a className="hover:underline" href="https://www.youtube.com/channel/UCZoC-XeDO7HxbAdeCaRPPCw/videos"><FaYoutube/></a>        
      </div>
      <ul className="grid grid-cols-4 gap-y-4 mb-6">
        <li><a className="hover:underline" href="/">Audio Description</a></li>
        <li><a className="hover:underline" href="/">Help Center</a></li>
        <li><a className="hover:underline" href="/">Gift Cards</a></li>
        <li><a className="hover:underline" href="/">Media Center</a></li>
        <li><a className="hover:underline" href="/">Investor Relations</a></li>
        <li><a className="hover:underline" href="/">Jobs</a></li>
        <li><a className="hover:underline" href="/">Terms of Use</a></li>
        <li><a className="hover:underline" href="/">Privacy</a></li>
        <li><a className="hover:underline" href="/">Legal Notices</a></li>
        <li><a className="hover:underline" href="/">Cookie Preferences</a></li>
        <li><a className="hover:underline" href="/">Corporate Information</a></li>
        <li><a className="hover:underline" href="/">Contact Us</a></li>
      </ul>
      <div className="mb-[20px]">
        <span className="border-[1px] border-gray-400 p-[6.5px] hover:text-white cursor-pointer" >Service Code</span>
      </div>
      <div className="mb-5">
        <span>© 1997-2023 Netflix, Inc.</span>
      </div>
    </div>
  );
}

export default Footer;
