import { Component } from "react";
import Api from "../../api/admin/Api"
class Listing extends Component {
  // Signup api
  async adminlogin(data) {
    return Api.post("/admin/login",data);
}
async addproperty(data) {
    return Api.post("/admin/add-property",data);
}
async city_list(id){
    return Api.get(`/admin/city-list/${id}`)
}
async area_list(id){
    return Api.get(`/admin/area-list/${id}`)
}
async UserMessages(page){
    return Api.get(`/admin/contact-list?page=${page}`)
}

async Adminprofile(){
    return Api.get("/admin/admin-profile")
}

async booking(id){
    return Api.get(`/admin/user-booking-detail/${id}`)
}

async Adminproperty(){
    return Api.get("/admin/property-list")
}

async Adminpropertydetails(uuid){
    return Api.get("/admin/property-details/" +uuid)
}

async propertydelete(uuid){
    return Api.get("/admin/delete-property/" +uuid)
}

async Adminpasschange(data){
    return Api.post("/admin/change-password" ,data)
}
async AdminProfileUpdate(data){
    return Api.post("/admin/update-profile",data)
}

async propertyedit(uuid,data){
    return Api.post("/admin/updateProperty/" +uuid ,data)
}
async  userListing (page){
    return Api.get(`/admin/user-lists?page=${page}`)
}
async userStauts(id,newStatus){
    return  Api.get(`/admin/user-active-inactive/${id}/${newStatus}`)
}

async propertyImagedelete (uuId ,imgUid){
    return Api.get(`/admin/property-image-delete/${uuId}/${imgUid}` 
   )
}
async userAdd(data){
    return Api.post("/admin/add-user" ,data)
}

async userdetails (id) {
    return  Api.get("/admin/user-detail/" +id)
}

async getrating(page) {
    return Api.get(`/admin/get-all-rating?page=${page}`)
}

async Paymentuser(id) {
    return Api.get(`admin/user-payment-history/${id}`);
} 
async reviewaccept(user_id,property_id, status) {
    return  Api.get(`admin/reject-approve-ratings/${user_id}/${property_id}/${status}`)
} 


async forget(data) {
    return  Api.post("admin/forgot-password" ,data)
} 


async forgetpass(data) {
    return  Api.post("admin/reset-password" ,data)
} 

async forgetopt(data) {
    return  Api.post("admin/verify-reset-password-otp" ,data)
} 

async bookinghistory(page){
    return Api.get(`admin/booking-history?page=${page}`)
}

async statistics(){
    return Api.get("admin/statistics")
}

async booking_confirm_cancelled(user_id,booking_id,booking_status) {

    return Api.post(`admin/booking-confirm-cancelled/${user_id}/${booking_id}` , booking_status)
}

async all_user_payment_history(page){
    return Api.get(`admin/all-user-payment-history?page=${page}`)
}

async user_payment_history(user_id){
    return Api.get(`admin/all-user-payment-history/${user_id}`)  
}

async Top3Properties(){
    return Api.get(`admin/top-property-listing`)  
}

async Top3Bookings(booking_status){
    return Api.get(`admin/top-booking/${booking_status}`)  
}

async Top3rating(){
    return Api.get(`admin/top-rating`)  
}

async Top3Users(){
    return Api.get(`admin/top-user-booking-user`)  
}

async Top3Payments(){
    return Api.get(`admin/top-payment`)  
}

async ActiveUser(){
    return Api.get(`admin/month-user-active`)  
}

// user-payment-history/4
  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Listing;
