import { EventEmitter } from "events";
import { nullNode } from "./Node";
import IO from "socket.io-client";

export default function Adapter() {
  const emitter = new EventEmitter();
  IO("");
  /**
   * @type {Map<String, Node>}
   */
  const current_nodes = new Map();

  const updateNode = (id, node) => {
    current_nodes.set(id, node);

    emitter.emit(id, node);
  };

  const subscribe = (nodeid, callback) => {
    emitter.on(nodeid, callback);
  };

  const unsubscribe = (nodeid, subscribed_callback) => {
    emitter.off(nodeid, subscribed_callback);
  };

  const currentNode = nodeid => {
    return current_nodes.get(nodeid) || nullNode;
  };

  return {
    subscribe,
    unsubscribe,
    updateNode,
    currentNode
  };
}
