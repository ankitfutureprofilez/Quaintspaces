import { Component } from "react";
import Api from "./Api";
class Listings extends Component {
    
    // Signup api
  async Signup(data) {
    return Api.post("/register", data);
  }
  async Login(data) {
    return Api.post("/login", data);
  }
  async GetUser(data) {
    return Api.post("/get-user-profile", data);
  }
  async UpdateProfile(data) {
    return Api.post("/update-profile", data);
  }
  async ResetPassword(data) {
    return Api.post("/update-password", data);
  }
  async ForgotPassword(data) {
    return Api.post("/forgot-password", data);
  }
  async VerifyResetPassword(data) {
    return Api.post("/verify-reset-password-otp", data);
  }
  async UpdateForgotPassword(data) {
    return Api.post("/reset-password", data);
  }

  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Listings;
