import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./app.css";
import trashIcn from "./assets/trash-can.png";

interface InputData {
	data: string;
	date: string;
}

function App() {
	const [data, setData] = useState<InputData[]>([]);
	const [activityData, setActivity] = useState<string>("");

	const COOKIE_KEY = "inputData";

	const inputData = () => {
		if (activityData.trim() === "") {
			return; // Ignore empty input
		}

		setData((currentData) => {
			const newData = [...currentData, input];
			Cookies.set(COOKIE_KEY, JSON.stringify(newData));
			return newData;
		});

		const input: InputData = {
			data: activityData.trim(),
			date: new Date().toLocaleString("id", {
				dateStyle: "full",
				timeStyle: "short",
			}),
		};

		setActivity("");
	};

	useEffect(() => {
		const storedData = Cookies.get(COOKIE_KEY);
		if (storedData) {
			setData(JSON.parse(storedData));
		}
	}, []);

	const clearData = () => {
		Cookies.remove(COOKIE_KEY);
		setData([]);
	};

const removeItemFromCookie = (indexToRemove: number) => {
	const storedData = Cookies.get(COOKIE_KEY);
	if (storedData) {
		const parsedData: InputData[] = JSON.parse(storedData);

		// Remove the specific item from the data array
		const updatedData = parsedData.filter(
			(_, index) => index !== indexToRemove
		);

		setData(updatedData);
		Cookies.set(COOKIE_KEY, JSON.stringify(updatedData));
	}
};

	return (
		<>
			<div className="container">
				<div className="table-container">
					<table>
						<thead>
							<th>activity</th>
							<th>Date</th>
						</thead>
						{data.map((index, key) => {
							return (
								<tr key={key}>
									<td>
										<input
											type="checkbox"
											placeholder="Hello"
											name={index.data}
											onChange={(e) => console.log(e.target.checked)}
										/>
										<label htmlFor={index.data}>{index.data}</label>
									</td>
									<td>{index.date}</td>
									<button onClick={() => removeItemFromCookie(key)}>
										<img src={trashIcn} alt="delete" />
									</button>
								</tr>
							);
						})}
					</table>
				</div>

				<form>
					<input
						type="text"
						title="activities"
						placeholder="put your activities"
						value={activityData}
						onInput={(e: React.FormEvent<HTMLInputElement>) =>
							setActivity(e.currentTarget.value)
						}
					/>
					<button type="button" onClick={() => inputData()}>
						submit
					</button>
					<button type="button" onClick={() => clearData()}>
						clear
					</button>
				</form>
			</div>
		</>
	);
}

export default App;
