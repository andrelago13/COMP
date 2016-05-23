var EvalResult = require('dsl/ast/EvalResult').EvalResult;

function EO_AST_Node(father) {
	this.children = [];
	this.father = father;
	
	if(typeof father != 'undefined') {
		father.addChild(this);
	}
	
	return this;
}

EO_AST_Node.prototype.constructor = EO_AST_Node;

EO_AST_Node.prototype.addChild = function(son) {
	this.addUnrepeated(son);
};

EO_AST_Node.prototype.addUnrepeated = function(node) {
	var found = false;
	for(var i = 0; i < this.children.length; ++i) {
		if(this.children[i] == node) {
			found = true;
			break;
		}
	}
	if(!found)
		this.children.push(node);
};

EO_AST_Node.prototype.removeChildIfExists = function(child) {
	var index = -1;
	
	for(var i = 0; i < this.children.length; ++i) {
		if(child === this.children[i]) {
			index = i;
			break;
		}
	}
	
	if(index >= 0) {
		this.children.splice(index, 1);
	}
}

// MUST BE OVERRIDEN BY EVERY NODE
EO_AST_Node.prototype.eval = function(graph, result) {
	for(var i = 0; i < this.children.length; ++i) {
		if(i === 0) {	// First child
			this.children[i].eval(graph, result);
			
			var sorted = this.sort(result.getScores(), result.getOrder());
			result.setScores(sorted[0]);
			result.setOrder(sorted[1]);
			
			if(!this.hasTie(result.scores)) {
				return;
			}
		} else {		// Other children
			var temp_result = new EvalResult();
			temp_result.init(graph.nodes.length);
			
			this.children[i].eval(graph, temp_result);
			
			this.solveTies(result.scores, result.order, temp_result.getScores(), temp_result.getOrder());
			
			
		}
	}
}

EO_AST_Node.prototype.swap = function(array, index1, index2) {
	var temp = array[index1];
	array[index1] = array[index2];
	array[index2] = temp;
}

EO_AST_Node.prototype.solveTies = function(scores, orders, new_scores, new_orders) {
	var tie_value = null;
	var first_tie = -1;
	var last_tie = -1;
	
	var current_tie = 0;
	
	while(true) {
		var start = last_tie + 1;
		tie_value = null;
		first_tie = -1;
		last_tie = -1;
		
		for(var i = start; i < scores.length; ++i) {
			if(tie_value === null) {
				if(scores[i] !== null) {
					tie_value = scores[i];
					first_tie = i;
				}
			} else {
				if(tie_value === scores[i]) {
					last_tie = i;
				} else {
					this.solveTie(scores, orders, new_scores, new_orders, first_tie, last_tie);
					
					current_tie = this.createTempTies(scores, orders, first_tie, last_tie, current_tie);
					
					first_tie = -2;
					break;
				}
			}
		}
		if(first_tie === -1)
			break;
		
		if(first_tie !== -2) {
			this.solveTie(scores, orders, new_scores, new_orders, first_tie, last_tie);
			
			current_tie = this.createTempTies(scores, orders, first_tie, last_tie, current_tie);
		}
	}
}

EO_AST_Node.prototype.createTempTies = function(scores, orders, first_tie, last_tie, current_tie) {
	var tie_on_previous = false;
	for(var i = first_tie; i < last_tie; ++i) {
		if(scores[i] === scores[i+1] && scores[i] !== null) {
			tie_on_previous = true;
			scores[i] = current_tie;
		} else {
			if(!tie_on_previous) {
				scores[i] = null;
			} else {
				scores[i] = current_tie;
				++current_tie;
			}			
			
			tie_on_previous = false;
		}
	}
	if(!tie_on_previous) {
		scores[last_tie] = null;
	} else {
		scores[last_tie] = current_tie;	
		++current_tie;	
	}
	return current_tie;
}

EO_AST_Node.prototype.solveTie = function(scores, orders, new_scores, new_orders, first_tie, last_tie) {
	var temp_scores = [];
	var temp_orders = [];
	
	for(var i = first_tie; i <= last_tie; ++i) {
		var position = new_orders.indexOf(orders[i]);
		temp_scores.push(new_scores[position]);
		temp_orders.push(new_orders[position]);
	}

	var temp = this.sort(temp_scores, temp_orders);
	temp_scores = temp[0];
	temp_orders = temp[1];
	
	var current = 0;
	for(var i = first_tie; i <= last_tie; ++i) {
		scores[i] = temp_scores[current];
		orders[i] = temp_orders[current];
		++current;
	}
}

EO_AST_Node.prototype.hasTie = function(scores) {
	var found_tie = false;
	var tie_on_previous = false;
	for(var i = 0; i < scores.length - 1; ++i) {
		if(scores[i] === scores[i+1] && scores[i] !== null) {
			found_tie = true;
			tie_on_previous = true;
		} else {
			if(!tie_on_previous) {
				scores[i] = null;
			}			
			
			tie_on_previous = false;
		}
	}
	if(!tie_on_previous) {
		scores[scores.length-1] = null;
	}
	
	return found_tie;
}

EO_AST_Node.prototype.sort = function(values, orders) {
	if (values.length <= 1) {
        return [values, orders];
    }
 
    var leftSize = Math.floor(values.length / 2);
    var rightSize = values.length - leftSize;
 
    var leftValues = [];
    var rightValues = [];
    var leftOrders = [];
    var rightOrders = [];
 
    for(var i = 0; i < leftSize; ++i) {
    	leftValues.push(values[i]);
    	leftOrders.push(orders[i]);
    }
    for(var i = leftSize; i < values.length; ++i) {
    	rightValues.push(values[i]);
    	rightOrders.push(orders[i]);
    }
 
    var r1 = this.sort(leftValues, leftOrders);
    var r2 = this.sort(rightValues, rightOrders);
    return this.merge(r1[0], r2[0], r1[1], r2[1]);
}

EO_AST_Node.prototype.merge = function(values_left, values_right, orders_left, orders_right) {
	var leftIndex = 0;
    var rightIndex = 0;
    var targetIndex = 0;
 
    var remaining = values_left.length + values_right.length;
    
    var new_values = [];
    var new_orders = [];
   
    while(remaining > 0) {
        if (leftIndex >= values_left.length) {
        	new_values[targetIndex] = values_right[rightIndex];
        	new_orders[targetIndex] = orders_right[rightIndex++];
        } else if (rightIndex >= values_right.length) {
        	new_values[targetIndex] = values_left[leftIndex];
        	new_orders[targetIndex] = orders_left[leftIndex++];
        } else if (values_left[leftIndex] < values_right[rightIndex]) {
        	new_values[targetIndex] = values_left[leftIndex];
        	new_orders[targetIndex] = orders_left[leftIndex++];
        } else {
        	new_values[targetIndex] = values_right[rightIndex];
        	new_orders[targetIndex] = orders_right[rightIndex++];
        }
 
        targetIndex++;
        remaining--;
    }
    
    return [new_values, new_orders];
}


exports.EO_AST_Node = EO_AST_Node;