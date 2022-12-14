import React from "react";
import ReactDOM from "react-dom";
import { OPCUAProvider } from "./OPCUAContext";
import DisplayNode from "./DisplayNode";
import Node from "./Node";

import "./styles.css";
import Adapter from "./MockAdapter";

const node_id_1 = "furnace_01";
const node_id_2 = "furnace_02";

const test_adapter = new Adapter();

test_adapter.updateNode( //Создание нового узла(датчика/адаптера)
	node_id_1,	//Объявление переменной
	new Node({	//Данные от OPCUA сервера
		value: 0,
		unit: "*C",
		status: 0
	})
);

test_adapter.updateNode(
	node_id_2,
	new Node({
		value: 256,
		unit: "*F",
		status: 0
	})
);

function App() {
	return (
		<div className="App">
			<h1>OPCUA FRONTEND</h1>
			<h2>Adapter test case</h2>
			<OPCUAProvider adapter={test_adapter}>
				<DisplayNode nodeid={node_id_1} />
				<DisplayNode nodeid={node_id_2} />
			</OPCUAProvider>
		</div>
	);
}

let temp1 = 0;

setInterval(() => {	//Эмитация работы датчика
	test_adapter.updateNode(
		node_id_1,
		new Node({
			value: temp1++,
			unit: "*C",
			status: 0
		})
	);
}, 1000);

ReactDOM.render(
	<App />,
	document.getElementById("root")
);