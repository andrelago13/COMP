function isNodeFinal(node) {
	return node.peripheries === 2 || node.shape === "doublecircle"
}