import React, { useState } from "react";
import { Button } from "bootstrap";

//include images into your bundle

//create your first component
export function Home() {
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);
	const [indice, setIndice] = useState(-1);

	const generarLista = () => {
		return taskList.map((detalle, indice) => {
			return generarItem(detalle, indice);
		});
	};

	const clasesBtn = index => {
		if (index === indice) {
			return "btn btn-outline-secondary float-right visible";
		} else {
			return "btn btn-outline-secondary float-right invisible";
		}
	};

	const hideItem = (eventoHide, index) => {
		setIndice(index);
	};

	const mouseOut = () => {
		setIndice(-1);
	};

	const deleteItem = (evento, index) => {
		const posicion = index;
		let arrayResultado = [];
		for (let i = 0; i < taskList.length; i++) {
			if (i !== posicion) {
				arrayResultado.push(taskList[i]);
			}
		}

		setTaskList(arrayResultado);
	};

	const generarItem = (detalle, index) => {
		return (
			<li
				className="list-group-item"
				key={index}
				onMouseOver={eventoHide => {
					hideItem(eventoHide, index);
				}}
				onMouseOut={eventoMouseOut => {
					mouseOut();
				}}>
				<p className="d-inline-block text-secondary ml-5">{detalle}</p>
				<button
					className={clasesBtn(index)}
					onClick={evento => {
						deleteItem(evento, index);
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
