import Home from "../Pages/Home";
import MovieDetail from "../Pages/MovieDetail";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import SignLayout from "../layout/SignLayout";
import Not404 from "../Pages/Not404";
import MediaType from "../Pages/MediaType";
import SearchPage from "../Pages/SearchPage";
import MyList from "../Pages/MyList";
import Account from "../Pages/Account";
import AccountLayout from "../layout/AccountLayout";


const privateRouter = [
  {path:"/account", component:Account, layout: AccountLayout},
  {path:"/mylist", component:MyList},
  {path:"/search/:mediaType", component: SearchPage,},
  {path:"/:mediaType/detail/:mediaId", component: MovieDetail,},
  {path:"/:mediaType", component: MediaType},
  {path:"/", component:Home, } ,
  {path:"/*", component:Not404}
]
const publicRouter = [
  {path:"/signup", component: Signup, layout: SignLayout},
  {path:"/login", component: Login, layout: SignLayout},
]

export {privateRouter, publicRouter};