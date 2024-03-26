import { Component } from 'react'
import Api from './../../api/laravel/Api';
class Listing extends Component {
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

    async Adminproperty(){
        return Api.get("/admin/property-list")
    }

    async Adminpropertydetails(uuid){
        return Api.get("/admin/property-details/" +uuid)
    }

    async propertydelete(uuid){
        return Api.get("/admin/delete-property/" +uuid)
    }

    async propertyedit(uuid,data){
        return Api.post("/admin/updateProperty/" +uuid ,data)
    }
    async  userListing (){
        return Api.get("/admin/user-lists")
    }
    async userStauts(id,newStatus){
        return  Api.get(`/admin/user-active-inactive/${id}/${newStatus}`)
    }
    
    async userAdd(data){
        return Api.post("/admin/add-user" ,data)
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