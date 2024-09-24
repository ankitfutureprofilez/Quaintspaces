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
  async ContactUs(data) {
    return Api.post("/contact-us", data);
  }
  async PropertyBooking(data) {
    return Api.post("/booking", data);
  }
  async BookingHistory(page, data) {
    return Api.get(`/user-booking-history?page=${page}&` + data);
  }
  async Booking_cancel(id, amount) {
    return Api.get(`/booking-cancel/${id}/${amount}`);
  }
  async bookingpayment(data) {
    return Api.post("/payment", data);
  }
  async activateAccount(data) {
    return Api.post("/user-account-activate", data);
  }

  async DeactivateAccount() {
    return Api.get("/user-account-deactivate");
  }
  async TopPropertyListing(data) {
    return Api.get("/top-places-Property-list", data);
  }
  async PropertyListing(data) {
    return Api.get("/property-list?" + data);
  }
  async PropertyDetail(uuid) {
    return Api.get("/property-details/" + uuid);
  }

  async Propertycustom(customlink) {
    return Api.get(`/property-custom-link-details/${customlink}`);
  }

  async cancelpolicy(data) {
    return Api.post("/check-cancellation-policy-before-booking", data);
  }

  async AddRating(data) {
    return Api.post("/add-rating", data);
  }
  async GetUserReview(data) {
    return Api.get("/rating-Review-listing/" + data);
  }
  async AllReviews(data, page = 1) {
    return Api.get(`/property-Rating/${data}?page=${page}`);
  }
  async PaymentHistory(page) {
    return Api.get(`/user-payment-history?page=${page}`);
  }
  async user_success_payment(data) {
    return Api.post("/user-success-payment", data);
  }

  async user_house_rule(data) {
    return Api.post("/user-house-rule-detail", data);
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
