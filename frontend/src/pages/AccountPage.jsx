import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";

export default function AccountPage() {
    const [redirect, setRedirect, setUser] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  // const {ready, user} = useContext(UserContext);
  // if(!ready){
  //     return "Loading...";
  // }
  // if(ready && !user && !redirect) {
  //     return <Navigate to={"/login"} />
  // }

  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage || (subpage === undefined && type === "profile")) {
      classes += "bg-primary text-white rounded-full";
    }
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if(redirect){
    <Navigate to={redirect} /> 
  }
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as Ashar Ali Khan contactashar4@gmail.com<br/>
          <button className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
    </div>
  );
}
