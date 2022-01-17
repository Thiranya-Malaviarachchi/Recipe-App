import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";








//production manager routes
import AddRecipe from "./ProductionManager/AddRecipe";
import VIewRecipeDetails from "./ProductionManager/VIewRecipeDetails";






import ProManagerNav from "../components/ProductionManager/ProManagersideNav/EmpSidebar";


import ProductionManagerDashboard from "./ProductionManager/ProManagerDashboard";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      superAdmin: false,
    };
    this.renderSideNavigation = this.renderSideNavigation.bind(this);
    this.renderDashboard = this.renderDashboard.bind(this);
  }

  renderSideNavigation() {
    const user_role = localStorage.getItem("user_role");
    const is_login = localStorage.getItem("is_login");
    if (is_login != "1") {
      return false;
    } else {
      
      if (user_role == "production team member") {
        return <ProManagerNav />;
      }
      else {
        return false;
      }
    }
  }

  renderDashboard() {
    const user_role = localStorage.getItem("user_role");
    const is_login = localStorage.getItem("is_login");
    if (is_login != "1") {
      return (
        <div>
          {/* <Route path="/" exact component={login} /> */}
          <Route path="/" exact component={ProductionManagerDashboard} />
        </div>
      );
    } else {
      // <Route path="/" exact component={ProductionManagerDashboard} />
      
      
      if (user_role == "production team member") {
        return (
          <div>
            <div>
              {/* <Route path="/myprofile" component={MyProfile}></Route> */}
              <Route path="/" exact component={ProductionManagerDashboard} />
              <Route
                path="/add-recipe"
                exact
                component={AddRecipe}
              />
              <Route
                path="/view-recipe"
                exact
                component={VIewRecipeDetails}
              />
             
            </div>
          </div>
        );
      }
      
       else {
        return false;
      }
    }
  }

  render() {
    return (
      <div>
        {this.renderSideNavigation()}
        {this.renderDashboard()}
      </div>
    );
  }
}

export default Dashboard;
