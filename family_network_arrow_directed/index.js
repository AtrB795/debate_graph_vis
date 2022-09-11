let width = 1000,
    height = 1000;

// build nodes; important to create variables because two objects(dictionaries) with the same values are not equal to
// each other in js
const q0 = {name: 'question0', color: 'blue'};
const sol0 = {name: 'solution0', color: 'red'};
const sol1 = {name: 'solution1', color: 'red'};
const sol2 = {name: 'solution2', color: 'red'};
const sol3 = {name: 'solution3', color: 'red'};
const q1 = {name: 'question1', color: 'blue'};

const nodes = [q0, sol0, sol1, sol2, q1, sol3];

const links = [
    {source: q0, target: sol0, color: 'green'},
    {source: q0, target: sol1, color: 'green'},
    {source: q0, target: sol2, color: 'green'},
    {source: sol1, target: q1, color: 'green'},
    {source: q1, target: sol2, color: 'green'},
    {source: q1, target: sol3, color: 'green'},
];

visualizeNetwork(width, height, nodes, links);