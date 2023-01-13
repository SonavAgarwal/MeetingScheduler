import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useForm } from "react-hook-form";

import logo from "./assets/When2EatLogo.png";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router";
import { createMeeting } from "./firebase";

function CreatePage() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	async function onSubmit(data) {
		setLoading(true);
		// console.log(data);
		let docRef = await createMeeting(
			data.startDate.replace(/-/g, "/"),
			data.endDate.replace(/-/g, "/")
		);
		navigate(docRef.id);
	}

	const [loading, setLoading] = useState(false);

	return (
		<div className="page" onSubmit={handleSubmit(onSubmit)}>
			<img src={logo} className="logo"></img>
			<h1>When 2 Eat</h1>
			<form>
				{/* <label>Title</label>
				<input placeholder="title" {...register("title")}></input> */}
				<label>First Day</label>
				<input
					type="date"
					{...register("startDate", { required: true })}
					min={new Date().toISOString().split("T")[0]}
				></input>
				<label>Last Day</label>
				<input
					type="date"
					{...register("endDate", { required: true })}
					min={watch("startDate")}
				></input>
				<button
					type="submit"
					disabled={Object.keys(errors).length !== 0 || loading}
				>
					{loading ? (
						<ThreeDots color="black" height={"2rem"}></ThreeDots>
					) : (
						"Create"
					)}
				</button>
			</form>
		</div>
	);
}

export default CreatePage;
