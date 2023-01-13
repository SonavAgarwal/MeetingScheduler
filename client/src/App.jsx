import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreatePage from "./CreatePage";
import MeetingPage from "./MeetingPage";

function App() {
	return (
		<div className="pageContainer">
			<Router>
				<Routes>
					<Route path=":meetId" element={<MeetingPage />} />
					<Route index element={<CreatePage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
