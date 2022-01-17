import React, { Component } from "react";
import axios from "axios";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { RecipeDetailsTable } from "../../components/ProductionManager/Tabales/RecipeDetailsTable";
import SearchBox from "../../components/ProductionManager/common/searchBox";
import "./styles.css";
import viewpic from "../../pages/assets/viewpic4.png";

class VIewRecipeDetails extends Component {
  state = {
    preproductionRound: [],
    addModalShow: false,
    searchQuery: "",
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/prevProRound-details")
      .then((result) => {
        const preproductionRound = result.data;

        this.setState({ preproductionRound: preproductionRound });
      })
      .catch((err) => console.log(err.message));
  }

  // search details
  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
    });
  };

  filteredData() {
    const { searchQuery, preproductionRound } = this.state;

    let filtered = [];

    if (searchQuery) {
      filtered = preproductionRound.filter((r) =>
        r.recipeName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filtered = preproductionRound;
    }

    return filtered;
  }

  render() {
    //take the filtered search list
    let filtered = this.filteredData();

    console.log(filtered);

    let AddModelClose = () => this.setState({ addModalShow: false });
    return (
      <React.Fragment>
        <h1 className="heading">View Recipe Details</h1>

        <div className="center">
          <img src={viewpic} alt="leavepic" />
        </div>

        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-5">
            <SearchBox onChange={this.handleSearch} placeHolder="Search" />
          </div>
          <div className="col-md-3"></div>
        </div>

        <div className="row">
          <div className="col-2"></div>
          <div className="col">
            {/**pass the filtered data */}
            <RecipeDetailsTable preproductionRound={filtered} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VIewRecipeDetails;
