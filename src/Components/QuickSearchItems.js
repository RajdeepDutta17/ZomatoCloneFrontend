import React from "react";
import { withRouter } from "react-router-dom";

class QuickSearchItems extends React.Component {
  handleNavigate = (mealTypeId) => {
    const locationId = sessionStorage.getItem("LocationId");
    if (locationId) {
      this.props.history.push(
        `/filter?mealtype=${mealTypeId}&location=${locationId}`
      );
    } else {
      this.props.history.push(`/filter?mealtype=${mealTypeId}`);
    }
  };

  render() {
    const { name, content, image, meal_type } = this.props.quickSearchItemsData;

    return (
      <div
        className={`box-${meal_type}`}
        onClick={() => this.handleNavigate(meal_type)}
        style={{ cursor: "pointer" }}
      >
        <img src={image} alt="Food Items" className={`boxImage-${meal_type}`} />
        <div className="contentContainer">
          <div className={`boxHeading-${meal_type}`}>{name}</div>
          <div className={`boxContent-${meal_type}`}>{content}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(QuickSearchItems);
