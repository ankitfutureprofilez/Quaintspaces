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
  async GetUserProfile() {
    return Api.get("/get-user-profile");
  }
  async UpdateUserProfile(data) {
    return Api.post("/update-profile", data);
  }
  async ResetPassword(data) {
    return Api.post("/update-password", data);
  }
  async ForgotPassword(data) {
    return Api.post("/forgot-password", data);
  }
  async ForgotPasswordOTP(data) {
    return Api.post("/verify-reset-password-otp", data);
  }
  async UpdateForgotPassword(data) {
    return Api.post("/reset-password", data);
  }
  async PropertyBooking(data) {
    return Api.post("/add-booking", data);
  }
  async BookingHistory() {
    return Api.get("/user-booking-history");
  }
  // async GetUser(data) {
  //   return Api.post("/get-user-profile", data);
  // }
  // async UpdateProfile(data) {
  //   return Api.post("/update-profile", data);
  // }
  async TopPropertyListing(data) {
    return Api.get("/top-places-Property-list", data);
  }
  async PropertyListing(data) {
    return Api.get("/property-list?" + data);
  }
  async PropertyDetail(uuid) {
    return Api.get("/property-details/" + uuid);
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
