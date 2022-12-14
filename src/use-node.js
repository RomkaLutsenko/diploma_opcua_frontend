import { useState, useContext, useEffect } from "react";
import { OPCUAContext } from "./OPCUAContext";
import { nullNode } from "./Node";

/**
 * @param {String} node_id
 */
export function useNode(node_id) {
	const opcua = useContext(OPCUAContext);
	const [node, setNode] = useState(nullNode); //Это пустой узел в виде OPCUA

	useEffect(() => {
		const handleNodeUpdate = new_node => {
			setNode(new_node);
		};
		opcua.subscribe(node_id, handleNodeUpdate); //Берётся из контекста OPCUAContext
		setNode(opcua.currentNode(node_id));

		return () => {
			opcua.unsubscribe(node_id, handleNodeUpdate);
		};
	}, [node_id, opcua]);
	return node;
}
