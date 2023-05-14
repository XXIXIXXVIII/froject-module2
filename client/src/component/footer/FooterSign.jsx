function FooterSign(prop) {
  
  return ( 
    <div style={{background:`${prop.bg}`, color:`${prop.color}`}} className="absolute bottom-0 w-full">
      <div className="w-full xl:w-2/3 m-auto hidden md:block my-2 lg:w-2/3 xl:my-8">
        <div className="xl:mb-8 text-base">
          <a href="https://help.netflix.com/contactus">Bạn có câu hỏi? Liên hệ với chúng tôi.</a>
        </div>
        <ul className="grid grid-cols-4 xl:gap-y-4 xl:text-[13px]">
          <li><a className="no-underline hover:underline" href="">Câu hỏi thường gặp</a></li>
          <li><a className="no-underline hover:underline" href="">Trung tâm trợ giúp</a></li>
          <li><a className="no-underline hover:underline" href="">Điều khoản sử dụng</a></li>
          <li><a className="no-underline hover:underline" href="">Quyền riêng tư</a></li>
          <li><a className="no-underline hover:underline" href="">Tùy chọn cookie</a></li>
          <li><a className="no-underline hover:underline" href="">Thông tin doanh nghiệp</a></li>
        </ul>
      </div>
    </div>

   );
}

export default FooterSign;