import { Component } from 'react'
import ApiAdmin from "./Api"
class Listing extends Component {
    async adminlogin(data) {
        return ApiAdmin.post("/admin/login",data);
    }
    async addproperty(data) {
        return ApiAdmin.post("/admin/add-property",data);
    }
    async city_list(id){
        return ApiAdmin.get(`/admin/city-list/${id}`)
    }
    async area_list(id){
        return ApiAdmin.get(`/admin/area-list/${id}`)
    }

    async Adminprofile(){
        return ApiAdmin.get("/admin/admin-profile")
    }

    async Adminproperty(){
        return ApiAdmin.get("/admin/property-list")
    }

    async Adminpropertydetails(uuid){
        return ApiAdmin.get("/admin/property-details/" +uuid)
    }

    async propertydelete(uuid){
        return ApiAdmin.get("/admin/delete-property/" +uuid)
    }

    async Adminpasschange(data){
        return ApiAdmin.post("/admin/change-password" ,data)
    }
    async AdminProfileUpdate(data){
        return ApiAdmin.post("/admin/update-profile",data)
    }

    async propertyedit(uuid,data){
        return ApiAdmin.post("/admin/updateProperty/" +uuid ,data)
    }
    async  userListing (page){
        return ApiAdmin.get(`/admin/user-lists?page=${page}`)
    }
    async userStauts(id,newStatus){
        return  ApiAdmin.get(`/admin/user-active-inactive/${id}/${newStatus}`)
    }
    
    async propertyImagedelete (uuId ,imgUid){
        return ApiAdmin.get(`/admin/property-image-delete/${uuId}/${imgUid}` 
       )
    }
    async userAdd(data){
        return ApiAdmin.post("/admin/add-user" ,data)
    }

    async userdetails (id) {
        return  ApiAdmin.get("/admin/user-detail/" +id)
    }

    
    render() {
        return (
            <div >
                <></>
            </div>
        )
    }
}

export default Listing;