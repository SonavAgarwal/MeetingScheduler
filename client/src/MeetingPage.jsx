import { useCallback, useEffect } from "react";
import { useState } from "react";
import DayCard from "./DayCard";
import { useDocument, useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { addName, db, updateAvailability } from "./firebase";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import AnimateHeight from "react-animate-height";
import { cloneDeep, debounce } from "lodash";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { isEqual } from "lodash";
import { emojiFrom } from "./utils";

function MeetingPage() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	function signIn(data) {
		let n = data.name.toLowerCase();
		if (!snapshot?.people?.includes(n)) {
			addName(n, meetId);
		}
		setName(n);
	}

	const [name, setName] = useState(null);

	const [allDates, setAllDates] = useState([]);
	const [selectedDates, setSelectedDates] = useState([]);

	let { meetId } = useParams();

	const [snapshot, loading, error, fullSnapshot] = useDocumentData(
		doc(db, "/meetings/" + meetId)
	);

	const [localData, setLocalData] = useState(null);

	useEffect(
		function () {
			setLocalData(cloneDeep(snapshot));
		},
		[snapshot]
	);

	function saveChanges(newLocalData) {
		if (!name) return;
		if (isEqual(newLocalData, snapshot)) return;
		updateAvailability(name, newLocalData[name], meetId);
	}

	// meslint-disable-next-line
	const saveChangesDebounced = useCallback(debounce(saveChanges, 2000), [
		name,
		meetId,
		snapshot,
	]);

	useEffect(
		function () {
			saveChangesDebounced(localData);
		},
		[localData] // TODO add snapshot
	);

	function getMeetingTitle() {
		let people = snapshot?.people;
		if (!snapshot?.people) people = [];
		people = people.map((n) => n + " " + emojiFrom(n));

		let returnText = "";
		if (people.length == 0) {
			returnText += "No One 😔";
		} else if (people.length == 1) {
			returnText += "just " + people.join(" ");
		} else if (people.length == 2) {
			returnText += people.join(" and ");
		} else if (people.length <= 4) {
			for (let i = 0; i < people.length - 1; i++) {
				returnText += people[i] + ", ";
			}
			returnText += " and " + people[people.length - 1];
		} else {
			for (let i = 0; i < 3; i++) {
				returnText += people[i] + ", ";
			}
			returnText += "and Others 🥱";
		}
		return returnText;
	}

	useEffect(
		function () {
			if (error || loading) return;

			let newAllDates = [];

			let d = new Date(snapshot?.startDate);
			let ed = new Date(snapshot?.endDate);

			while (d <= ed) {
				newAllDates.push(new Date(d));
				d.setDate(d.getDate() + 1);
			}

			setAllDates(newAllDates);
		},
		[snapshot, loading, error]
	);

	function addSelectedDate(date) {
		let newSelectedDates = [...selectedDates];
		newSelectedDates.push(date);
		setSelectedDates(newSelectedDates);
	}

	function removeSelectedDate(date) {
		let newSelectedDates = [...selectedDates];
		newSelectedDates.filter((d) => d != date);
		setSelectedDates(newSelectedDates);
	}

	function toggleSelect(day, meal) {
		if (!name) return;
		if (!localData[name]?.[day]) {
			localData[name][day] = [];
		}
		if (localData[name]?.[day]?.includes(meal)) {
			localData[name][day] = localData[name]?.[day].filter(
				(item) => item !== meal
			);
		} else localData[name]?.[day].push(meal);
		setLocalData({ ...localData });
	}

	const navigate = useNavigate();

	// const [pageUrl, setPageUrl] = useState("");
	// useEffect(function() {

	// }, [])

	if (loading) {
		return (
			<div className="page">
				<h1>😋</h1>
			</div>
		);
	}

	if (error || !fullSnapshot?.exists()) {
		return (
			<div className="page">
				<h1>Sorry, something went wrong 😭.</h1>
			</div>
		);
	}

	return (
		<div className="page meetingPage">
			<h1>Meal with {getMeetingTitle()}</h1>
			<div className="topButtons">
				<button
					onClick={() => {
						navigate("/");
					}}
				>
					New When2Eat
				</button>
				{/* <div style={{ flex: 1 }}></div> */}
				<CopyToClipboard text={window.location.href}>
					<button>Copy Link</button>
				</CopyToClipboard>
			</div>
			<AnimateHeight delay={0} duration={300} height={name ? "auto" : 0}>
				{name && (
					<h2>
						You are {name} {emojiFrom(name)}
					</h2>
				)}
			</AnimateHeight>
			<AnimateHeight duration={300} height={name ? 0 : "auto"}>
				<form onSubmit={handleSubmit(signIn)}>
					<label>Name</label>
					<input
						placeholder="Enter your name..."
						{...register("name", { required: true })}
					></input>
					<button type="submit">Sign In</button>
				</form>
			</AnimateHeight>

			<div className="dayGrid">
				{allDates.map((date, index) => {
					return (
						<DayCard
							date={date}
							index={index}
							key={index + "dayCard"}
							toggleSelect={toggleSelect}
							selections={localData[name]?.[index]}
							allData={localData}
						></DayCard>
					);
				})}
			</div>
		</div>
	);
}

export default MeetingPage;
