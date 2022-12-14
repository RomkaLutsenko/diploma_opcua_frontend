import React from "react";
import { useNode } from "./use-node";

export default function DisplayNode({ nodeid = "furnace_01" }) {
	const node = useNode(nodeid);

	return <p data-testid={nodeid}>{node.value}</p>;
}
