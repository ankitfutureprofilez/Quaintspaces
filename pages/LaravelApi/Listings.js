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

  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Listings;
