// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	addDoc,
	arrayUnion,
	collection,
	doc,
	getFirestore,
	updateDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC5Uns91IexWLwxyyWh1eCk6TCplAfersg",
	authDomain: "sonaviscool.firebaseapp.com",
	projectId: "sonaviscool",
	storageBucket: "sonaviscool.appspot.com",
	messagingSenderId: "199606803575",
	appId: "1:199606803575:web:87fd9f0e047856f145fa72",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export async function createMeeting(startDate, endDate) {
	console.log(startDate, endDate);
	const docRef = await addDoc(collection(db, "meetings"), {
		startDate: startDate,
		endDate: endDate,
	});

	return docRef;
}

export async function addName(name, meetId) {
	let updateObject = { people: arrayUnion(name) };
	updateObject[name] = {};
	return await updateDoc(doc(db, "/meetings/" + meetId), updateObject);
}

export async function updateAvailability(name, newAvailabilityObject, meetId) {
	let updateObject = {};
	updateObject[name] = newAvailabilityObject;
	console.log("updateObject");
	console.log(updateObject);
	return await updateDoc(doc(db, "/meetings/" + meetId), updateObject);
}

// export const meetingData = {};
