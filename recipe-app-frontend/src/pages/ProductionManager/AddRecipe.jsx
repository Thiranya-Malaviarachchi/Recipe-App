import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, FormGroup } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
import "./styles.css";
import addorder from "../../pages/assets/addorderpic.png";
class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbaropen: false,
      snackbarmsg: "",
      
      recipeCodeError: "",
      recipeNameError: "",
      ingredientsError: "",
      descriptionError: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(event, props) {
    console.log(event.target.proId.value);
    console.log(event);
    const isValid = this.validate(event);
    event.preventDefault();
    //alert(event.target.name.value);

    if (isValid) {
      fetch("http://localhost:5000/api/prevProRound-details", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          username: "thirnaya",
        },
        body: JSON.stringify({
          recipeId: event.target.proId.value,
          recipeName: event.target.recName.value,
          ingredients: event.target.ingred.value,
          description: event.target.descrip.value,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            swal({
              title: "Recipe Details Added Succesfully",
              icon: "success",
              button: "Done",
            });
            setTimeout(
              function () {
                window.location.reload();
              }.bind(this),
              1500
            );
          },
          (error) => {
            this.setState({ snackbaropen: true, snackbarmsg: "Failed" });
          }
        );
    }
  }

  validate(event) {
    let recipeCodeError = "";
    let recipeNameError = "";
    let ingredientsError = "";
    let descriptionError = "";

    if (!event.target.proId.value) {
      recipeCodeError = "Recipe Id Field Can Not Be Blank";
    }
    if (!event.target.recName.value) {
      recipeNameError = "Recipe Name Field Can Not Be Blank";
    }
    if (!event.target.ingred.value) {
      ingredientsError = "Ingredients Field Can Not Be Blank";
    }
    if (!event.target.descrip.value) {
      descriptionError = "Description Field Can Not Be Blank";
    }

    if (
      recipeCodeError ||
      recipeNameError ||
      ingredientsError ||
      descriptionError
    ) {
      this.setState({
        recipeCodeError: recipeCodeError,
        recipeNameError: recipeNameError,
        ingredientsError: ingredientsError,
        descriptionError: descriptionError,
      });
      return false;
    }

    return true;
  }
  render() {
    return (
      <React.Fragment>
        <h1 className="heading">Add Recipe Details</h1>

        <div className="center">
          <img src={addorder} alt="leavepic" />
        </div>

        <div className="row">
          <div className="col-3"></div>

          <div className="col">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Group controlId="proId">
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Recipe Id
                  </Form.Label>
                  <Form.Control
                    style={{ border: "1px solid #050139" }}
                    type="text"
                    name="proId"
                    placeholder="Recipe Id"
                  />
                  <div style={{ background: "#f8d7da" }}>
                    {this.state.recipeCodeError}
                  </div>
                </Form.Group>
              </Form.Group>
              <Form.Group controlId="recName">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Recipe Name
                </Form.Label>
                <Form.Control
                  style={{ border: "1px solid #050139" }}
                  type="text"
                  name="recName"
                  placeholder="Recipe Name"
                />
                <div style={{ background: "#f8d7da" }}>
                  {this.state.recipeNameError}
                </div>
              </Form.Group>
              <Form.Group controlId="ingred">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Ingredients
                </Form.Label>
                <Form.Control
                  style={{ border: "1px solid #050139" }}
                  type="text"
                  name="ingred"
                  placeholder="Ingredients"
                />
                <div style={{ background: "#f8d7da" }}>
                  {this.state.ingredientsError}
                </div>
              </Form.Group>
              <Form.Group controlId="descrip">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Description
                </Form.Label>
                <Form.Control
                  style={{ border: "1px solid #050139" }}
                  type="text"
                  name="descrip"
                  placeholder="Description"
                />
                <div style={{ background: "#f8d7da" }}>
                  {this.state.descriptionError}
                </div>
              </Form.Group>

              <Form.Group>
                <Button
                  className="my-1"
                  style={{ backgroundColor: "#7121AD", color: "white" }}
                  type="submit"
                >
                  Add Details
                </Button>
              </Form.Group>
            </Form>
          </div>

          <div className="col-1"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddRecipe;
