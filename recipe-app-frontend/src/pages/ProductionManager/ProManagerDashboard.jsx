import React, { Component } from "react";
import axios from "axios";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import "../ProductionManager/dashboard.css";
import hello from "../assets/hello.png";
import clock from "../assets/clock.png";
import Clock from "../../components/ProductionManager/common/clock";

class Dashboard extends Component {
  state = {
    factoryDetails: [],
    user_name: "",
    addModalShow: true,
    //create a component to save the tickets values to be rendered to genrate the report
    productionRound: [],

    //create components to render the error messages
    
    recipeCount: [],
    cookedRecipeCount: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/newProRound-details")
      .then((result) => {
        const productionRound = result.data;

        this.setState({ productionRound: productionRound });
      })
      .catch((err) => console.log(err.message));

    const user_name = localStorage.getItem("user_full_name");
    this.setState({ user_name: user_name });

   

    axios
      .get("http://localhost:5000//api/prevProRound-details")
      .then((result) => {
        const recipeCount = result.data;

        this.setState({ recipeCount: recipeCount });
      })
      .catch((err) => console.log(err.message));

    axios
      .get("http://localhost:5000/api/prevProRound-details")
      .then((result) => {
        const cookedRecipeCount = result.data;

        this.setState({ cookedRecipeCount: cookedRecipeCount });
      })
      .catch((err) => console.log(err.message));
  }

  logout() {
    localStorage.removeItem("user_full_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("is_login");
    window.location.reload();
  }

  render() {
   
    let AddModelClose = () => this.setState({ addModalShow: false });
    return (
      <React.Fragment>
        <ButtonToolbar>
          
        </ButtonToolbar>
        <main>
          
            {/* <!-- MAIN TITLE STARTS HERE --> */}

            <div className="main__title">
              <img src={hello} alt="hello" />
              <div className="main__greeting">
                <h1>Hello, {this.state.user_name}</h1>
                <p>Welcome to your profile.</p>
              </div>
              <button
                style={{
                  backgroundColor: "#7121AD",
                  color: "white",
                  width: "100px",
                }}
                onClick={this.logout}
              >
                Log Out
              </button>
            </div>

            <div className="charts">
              <div className="charts__left">
                <div className="charts__left__title">
                  <div>
                    <h1>Date and Time</h1>
                  </div>
                  <i className="fa fa-usd" aria-hidden="true"></i>
                </div>
                <div className="row mt-5">
                  <div className="col-md-6">
                    <img src={clock} alt="clock" />
                  </div>
                  <div className="col-md-6">
                    <Clock />
                  </div>
                </div>
              </div>

             
            {/* <!-- MAIN TITLE ENDS HERE --> */}

            {/* <!-- MAIN CARDS STARTS HERE --> */}
            <div className="main__cards">
              <div className="carda">
                <div className="card_inner">
                  <p className="text-primary-p">Number Of Recipes</p>
                  <span className="font-bold text-title">
                    {this.state.recipeCount.length}
                  </span>
                </div>
              </div>

              <div className="cardd">
                <div className="card_inner">
                  <p className="text-primary-p">No Of Cooked Recipes</p>
                  <span className="font-bold text-title">
                    {this.state.cookedRecipeCount.length}
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- MAIN CARDS ENDS HERE --> */}

            {/* <!-- CHARTS STARTS HERE --> */}

            {/* <!-- CHARTS ENDS HERE --> */}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Dashboard;
