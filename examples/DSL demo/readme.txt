This example shows the possibilities allowed by the DSL.

DSL:
dynamic sum(in : #ins_nl) { in.weight * #outdeg_nl } + sum(out : #outs_nl) { out.weight * #indeg_nl } + #nloops * (#indeg_nl * #outdeg_nl);
dynamic #indeg + #outdeg;
0, 1, 2, 3, 4, 5;