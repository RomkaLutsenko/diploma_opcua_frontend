import React, { createContext } from "react";

/**
 * @typedef {OPCUAContext}
 * @property {Function} subscribe
 * @property {Function} unsubscribe
 */

/**
 * @type {OPCUAContext}
 */
export const OPCUAContext = createContext({
	subscribe: () => { },
	unsubscribe: () => { }
});

export function OPCUAProvider({ children, adapter }) {
	if (!adapter) {
		throw new Error("No adapter");
	}
	const subscribe = adapter.subscribe;
	const unsubscribe = adapter.unsubscribe;
	const currentNode = adapter.currentNode;

	const provided = {
		subscribe,
		unsubscribe,
		currentNode
	};

	return (
		<OPCUAContext.Provider value={provided}>{children}</OPCUAContext.Provider>
		//{children} - отвечает за отрисовку	<DisplayNode nodeid={node_id_1} /> в index.js
		//										<DisplayNode nodeid={node_id_2} />
		//adapter={test_adapter}  =====>  value={provided}
		//
	);
}
