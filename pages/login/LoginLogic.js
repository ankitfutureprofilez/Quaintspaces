import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Listings from "../api/laravel/Listings";
import { Context } from "../_app";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

export default function LoginLogic({isPopup}) {

  const { setAuth, setOpenLogin } = useContext(Context);
  const router = useRouter();
  // console.log("router asPath",router.asPath);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading == true) {
      return;
    }
    setLoading(true);
    const main = new Listings();
    const response = main.Login({
      email: formData.email,
      password: formData.password,
    });
    response
      .then((res) => {
        if (res && res.data && res.data.status) {
          if(isPopup){
            setOpenLogin(false);
          } else {
            router.push("/");
          }
          setAuth(res?.data?.data || null);
          localStorage && localStorage.setItem("token", res?.data?.token);
          toast.success(res.data.message);
          setFormData({
            email: "",
            password: "",
          });
        } else {
          toast.error(res?.data.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.message);
        toast.error(error?.response.data);
        setLoading(false);
      });
  };
  return (
    <>

        <div className="right-signup-form flex justify-end">
          <div className="signup-form w-full max-h-screen overflow-y-auto">
            <div className="formbgcolor"></div>
            <div className="quainttay">
              <h2>Welcome to Quaint Stay Jaipur </h2>
              <h3>
                Don't have an account? <Link href="/signup">Sign up</Link>
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-md w-full "
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-md w-full "
                  required
                />
              </div>
              <h3 className="text-white text-md  font-medium mb-4">
                <a href="/forgot-password">Forgot Password?</a>
              </h3>
              <button type="submit" className="submint-btn">
                {loading ? "Logging in.." : "Log In"}
              </button>
            </form>
          </div>
        </div>

    </>
  );
}
