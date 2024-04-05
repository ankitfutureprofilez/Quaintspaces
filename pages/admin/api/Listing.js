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

async getrating() {
    return Api.get("/admin/get-all-rating")
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


  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Listing;
