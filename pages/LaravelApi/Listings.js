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
  async PropertyListing() {
    return Api.get("/property-list");
  }
  async PropertyDetail(uuid){
    return Api.get("/property-details/"+uuid)
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
