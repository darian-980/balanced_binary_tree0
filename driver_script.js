import { binaryTree } from "./balanced_binary_tree.js";

function randomNumberGen() { // gen number from 0 to 100
    const max = 100;
    return Math.floor(Math.random() * max)
}

function generateArray() { // generate x length array with no duplicates
    const hundredArray = [];
    const arraySize = 30;

    while (hundredArray.length < arraySize) {
        const addNumber = randomNumberGen();
        if (!hundredArray.includes(addNumber)) {
            hundredArray.push(addNumber);
        }
    }
    return hundredArray;
}

function printArray(orderFunction) {
    const orderArray = [];
    orderFunction(returnArray);

    function returnArray(value) {
        orderArray.push(value);
    }
    return orderArray;
}

function printValue(value) {
    console.log(value);
}


const newArray = generateArray();
console.log(newArray);

const newTree = binaryTree(newArray);
console.log("is tree balanced: " + newTree.isBalanced());

console.log("level order: ", printArray(newTree.levelOrderForEach))
console.log("pre order: ", printArray(newTree.preOrderForEach))
console.log("post order: ", printArray(newTree.postOrderForEach))
console.log("in order: ", printArray(newTree.inOrderForEach))

newTree.insert(300);
newTree.insert(6500);
newTree.insert(160);
newTree.insert(380);
newTree.insert(340);
newTree.insert(3299);
newTree.insert(310);
newTree.insert(330);
newTree.insert(3420);

console.log("is tree balanced: " + newTree.isBalanced());

newTree.rebalance();

console.log("is tree balanced: " + newTree.isBalanced());

console.log("level order: ", printArray(newTree.levelOrderForEach))
console.log("pre order: ", printArray(newTree.preOrderForEach))
console.log("post order: ", printArray(newTree.postOrderForEach))
console.log("in order: ", printArray(newTree.inOrderForEach))

newTree.prettyPrint(newTree.tree);