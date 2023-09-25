import React from "react";
import QuickSearchItems from "./QuickSearchItems";

class QuickSearch extends React.Component {
  render() {
    const { mealtypesData } = this.props;
    return (
      <div className="bottomSection">
        <div className="bottomSection__heading">
          <div className="heading-1">Quick Searches</div>
          <div className="heading-2">Discover restaurants by type of meal</div>
        </div>
        <div className="bottomSection__Container">
          <div className="Container-1">
            {mealtypesData
              .filter((item) => item.meal_type < 4)
              .map((item, index) => {
                return (
                  <QuickSearchItems key={index} quickSearchItemsData={item} />
                );
              })}

            {/* <QuickSearchItems
              boxNumber={1}
              heading={"Breakfast"}
              details={"Start your day with exclusive breakfast options."}
              imageName={"breakfast.jpg"}
            />
            <QuickSearchItems
              boxNumber={2}
              heading={"Lunch"}
              details={"Select from a wide variety of afternoon delights."}
              imageName={"lunch.jpg"}
            />
            <QuickSearchItems
              boxNumber={3}
              heading={"Snacks"}
              details={"Enjoy your evening with some delicious Snacks."}
              imageName={"snacks.webp"}
            /> */}
          </div>
          <div className="Container-2">
            {mealtypesData
              .filter((item) => item.meal_type >= 4)
              .map((item, index) => {
                return (
                  <QuickSearchItems key={index} quickSearchItemsData={item} />
                );
              })}

            {/* <QuickSearchItems
              boxNumber={4}
              heading={"Dinner"}
              details={"End your day with a delicious bowl of soup."}
              imageName={"dinner.jpg"}
            />
            <QuickSearchItems
              boxNumber={5}
              heading={"Drinks"}
              details={"Have a look at our range of offerings."}
              imageName={"drinks.jpg"}
            />
            <QuickSearchItems
              boxNumber={6}
              heading={"Nightlife"}
              details={"Enjoy your weekends with your friends."}
              imageName={"nightlife.webp"}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default QuickSearch;
