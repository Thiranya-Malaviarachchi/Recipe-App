import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, FormGroup } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import swal from "sweetalert";
import axios from "axios";
import { Redirect } from "react-router-dom";

export class EditRecipeDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = { snackbaropen: false, snackbarmsg: "", categories: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

 
  handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:5000/api/prevProRound-details", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        username: "thiranya",
      },
      body: JSON.stringify({
        id: event.target.id.value,
        ingredients: event.target.ingredients.value,
        description: event.target.description.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          swal({
            title: "Details Changed Succesfully",
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

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.snackbaropen}
          autoHideDuration={6000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="danger"
              onClick={this.snackbarClose}
            ></IconButton>,
          ]}
        />
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          //centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  
                    <Form.Group controlId="proId">
                      <Form.Control
                        type="text"
                        name="id"
                        required
                        placeholder="id"
                        defaultValue={this.props.id}
                      />
                    </Form.Group>
                    <Form.Group controlId="ingredients">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control
                      type="text"
                      name="ingredients"
                      required
                      placeholder="Ingredients"
                      defaultValue={this.props.ingredients}
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      required
                      placeholder="Description"
                      defaultValue={this.props.description}
                    />
                  </Form.Group>
                  

                  <br></br>
                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Update Details
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
