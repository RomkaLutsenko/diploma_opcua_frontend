/**
 * A OPCUA node
 * @interface Node
 */

export default function Node({ status = 1, unit = "", value = null }) {
	return Object.freeze({
		value,
		unit,
		status
	});
}

export const nullNode = new Node({});
