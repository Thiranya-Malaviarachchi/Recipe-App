import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import swal from "sweetalert";
import { EditRecipeDetailsModal } from "../Modals/EditRecipeDetailsModal";

export class RecipeDetailsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { editModalShow: false };
  }

  deleteCat(id) {
    swal({
      title: "Are you sure you want to delete the recipe?",
      text: "Once deleted, you will not be able to recover this Recode!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("http://localhost:5000/api/prevProRound-details", {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            username: "chathura",
          },
          body: JSON.stringify({
            id: id,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            swal({
              title: "Details Deleted Succesfully",
              icon: "success",
              button: "Done",
            });
            setTimeout(
              function () {
                window.location.reload();
              }.bind(this),
              1500
            );
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }

  render() {
    const { id, recipeName, ingredients, description } = this.state;
    let EditModelClose = () => this.setState({ editModalShow: false });
    return (
      <div>
        <ButtonToolbar>
          <EditRecipeDetailsModal
            show={this.state.editModalShow}
            onHide={EditModelClose}
            id={id}
            recipeName={recipeName}
            ingredients={ingredients}
            description={description}
          />
        </ButtonToolbar>
        <table
          className="table table-bordered table-sm"
          style={{ width: "1200px" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#7121AD", color: "white" }}>
              <th scope="col">Id</th>
              <th scope="col">Recipe Name</th>
              <th scope="col">Ingredients</th>
              <th scope="col">Description</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.preproductionRound.map((i) => (
              <tr key={i._id}>
                <td>{i.recipeId}</td>
                <td>{i.recipeName}</td>
                <td>{i.ingredients}</td>
                <td>{i.description}</td>

                <td>
                  <button
                    className="btn-sm"
                    style={{
                      backgroundColor: "#7121AD",
                      color: "white",
                      marginRight: "4px",
                    }}
                    onClick={() =>
                      this.setState({
                        editModalShow: true,
                        id: i._id,
                        recipeName: i.recipeName,
                        quantity: i.quantity,
                        ingredients: i.ingredients,
                        description: i.description,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn-sm"
                    style={{ backgroundColor: "#dc3545 ", color: "white" }}
                    onClick={() => this.deleteCat(i._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
