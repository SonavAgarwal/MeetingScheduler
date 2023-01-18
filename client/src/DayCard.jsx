import { useState } from "react";
import { emojiFrom } from "./utils";

const mealsNames = [
	"🍳 Breakfast",
	"🥪 Brunch",
	"🥗 Lunch",
	"🥨 Snack",
	"🍝 Dinner",
	"🍕 Late Night",
];

var days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

function useForceUpdate() {
	const [value, setValue] = useState(0); // integer state
	return () => setValue((value) => value + 1); // update state to force render
	// A function that increment 👆🏻 the previous state like here
	// is better than directly setting `setValue(value + 1)`
}

function DayCard(props) {
	// function isSelected() {
	// 	return props.selections
	// }

	// const forceUpdate = useForceUpdate();

	function getAvailable(mealNum) {
		let people = props.allData.people;
		if (!people) people = [];
		let availablePeople = [];
		// let count = 0;
		people.map(function (name, index) {
			if (props.allData?.[name]?.[props.index]?.includes(mealNum)) {
				// count += 1;
				availablePeople.push(name);
			}
		});

		return availablePeople;
	}

	return (
		<div className="dayCardContainer" key={"day-" + props.index}>
			<h1>
				{days[props.date.getDay()]} - {props.date.toLocaleDateString()}
			</h1>
			<div className="dayCard">
				{mealsNames.map((name, index) => {
					return (
						<div key={name + "all"}>
							<div
								key={name + "bar"}
								className="availablePercentBar"
								style={{
									width:
										(getAvailable(index).length /
											props.allData?.people?.length) *
											100 +
										"%",
								}}
							></div>
							<button
								onClick={() => {
									props.toggleSelect(props.index, index);
									// forceUpdate();
								}}
								key={name}
								className={`mealButton ${
									props?.selections?.includes(index) && "mBSelecteds"
								}`}
							>
								<span className="mBText">{name}</span>
								{/* <div style={{ flex: 1 }}></div> */}
								<div className="availableEmojiList">
									<div></div>
									{
										getAvailable(index).map(function (name, index) {
											return (
												<span
													key={index + "emoji"}
													className="availableEmoji"
													title={name}
												>
													{emojiFrom(name)}
												</span>
											);
										})
										// .slice(0, 3)
									}
								</div>
								<span
									className={`checkedEmoji ${
										props?.selections?.includes(index) && "checkedEmojiShown"
									}`}
								>
									✅
								</span>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default DayCard;
