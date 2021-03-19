import React, { useState } from "react";
import { Button } from "bootstrap";

//include images into your bundle

//create your first component
export function Home() {
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);
	let itemsLita = 0;
	const generarLista = () => {
		return taskList.map((detalle, indice) => {
			return generarItem(detalle, indice);
		});
	};

	const deleteItem = (evento, indice) => {
		const posicion = indice;
		let arrayResultado = [];
		for (let i = 0; i < taskList.length; i++) {
			if (i !== posicion) {
				arrayResultado.push(taskList[i]);
			}
		}
		console.log(arrayResultado);
		setTaskList(arrayResultado);
	};

	const generarItem = (detalle, indice) => {
		return (
			<li className="list-group-item" key={indice}>
				<p className="d-inline-block text-secondary ml-5">{detalle}</p>
				<button
					className="btn btn-outline-secondary float-right"
					onClick={evento => {
						deleteItem(evento, indice);
					}}>
					<i className="fas fa-times float-right"></i>
				</button>
			</li>
		);
	};

	const handleOnKeyPress = e => {
		if (e.key === "Enter") {
			setTaskList([...taskList, task]), setTask("");
		}
	};
	return (
		<div className="container">
			<h1 className="text-muted text-center"> TODOS </h1>
			<input
				type="text"
				className="form-control mb-2  text-secondary "
				placeholder="write your task"
				value={task}
				onChange={e => setTask(e.target.value)}
				onKeyPress={e => handleOnKeyPress(e)}
			/>
			<ul className="list-group"> {generarLista()} </ul>
			<div className="card">
				<ul className="list-group list-group-flush">
					<li className="list-group-item text-secondary">
						{taskList.length} Items left
					</li>
				</ul>
			</div>
		</div>
	);
}
