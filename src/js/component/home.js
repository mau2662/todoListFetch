import React, { useState, useEffect } from "react";
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

	useEffect(() => {
		getLista();
	}, []);

	const getLista = () => {
		const url = "https://assets.breatheco.de/apis/fake/todos/user/mau26";

		const requestOption = {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		};
		fetch(url, requestOption)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				if (res.status === 404) {
					return taskList;
				}
			})
			.then(data => {
				setTaskList(data);
			})
			.catch(error => console.log("error" + error));
	};

	const putLista = list => {
		const url = "https://assets.breatheco.de/apis/fake/todos/user/mau26";

		const requestOption = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(list)
		};
		fetch(url, requestOption)
			.then(res => {
				if (res.ok) {
					res.json();
				}
				if (res.status === 404) {
					postLista();
				}
			})
			.then(data => {
				console.log("Lista Actualizada");
			})
			.catch(error => console.log("error" + error));
	};

	const postLista = () => {
		const url = "https://assets.breatheco.de/apis/fake/todos/user/mau26";

		const requestOption = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify([])
		};
		fetch(url, requestOption)
			.then(res => res.json())
			.then(data => {
				console.log("Tarea Agregada");
			})
			.catch(error => console.log("error" + error));
	};

	const deleteLista = () => {
		const url = "https://assets.breatheco.de/apis/fake/todos/user/mau26";

		const requestOption = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		};
		fetch(url, requestOption)
			.then(res => res.json())
			.then(data => {
				console.log("Tarea eliminada");
			})
			.catch(error => console.log("error" + error));
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
		putLista(arrayResultado);
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
				<p className="d-inline-block text-secondary ml-5">
					{detalle.label}
				</p>
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
		const objetoApi = {
			label: task,
			done: false
		};
		if (e.key === "Enter") {
			const listaActualizada = [...taskList, objetoApi];
			setTaskList(listaActualizada);
			setTask("");
			putLista(listaActualizada);
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
			<button
				type="button"
				className="btn btn-danger"
				onClick={evento => {
					deleteLista();
				}}>
				Delete List
			</button>
		</div>
	);
}
