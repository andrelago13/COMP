This example shows the basic procedure for the state elimination algorithm.
State A is the start one and only state C is final. Therefore, we delete state B.
When B is deleted, a new transition between A and C is created in the following format:

beforeLabel loopLabel* afterLabel + directLabel

Where:
beforeLabel = A -> B = x
loopLabel   = B -> B = z
afterLabel  = B -> C = y
diretLabel  = A -> C = w

The converted regular expression is therefore: xz*y + w.