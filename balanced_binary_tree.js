import { mergesort } from "./mergesort.js";

function binaryTreeMake(passedArray) {
    function createNode() {
        let value = null;
        let leftNode = null;
        let rightNode = null;
        return { value, leftNode, rightNode };
    }

    function BuildTree(passedArray) {
        if (passedArray.length === 0) return null;
        if (passedArray.length <= 1) {
            const newNode = createNode();
            newNode.value = passedArray[0];
            console.log([newNode.value])
            return newNode;
        }
        const start = 0;
        const end = passedArray.length - 1;
        const mid = Math.floor((passedArray.length) / 2);
        // console.log(mid)

        const newNode = createNode();
        newNode.value = passedArray[mid];

        console.log(passedArray)
        console.log("start: " + start + " mid: " + mid);
        newNode.leftNode = BuildTree([...passedArray.slice(start, mid)])
        newNode.rightNode = BuildTree([...passedArray.slice(mid + 1)])

        return newNode;
    }

    let tree = BuildTree(passedArray);

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null || node === undefined) {
            return;
        }

        prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }

    // function returnTree(){
    //     return prettyPrint(root);
    // }


    return { tree, prettyPrint }
}

function binaryTree(passedArray) {
    const sortedArray = [...mergesort(passedArray)]
    const noDuplicatesArray = [...new Set(sortedArray)]
    // console.log(noDuplicatesArray)
    return binaryTreeMake(noDuplicatesArray);
};



// [1, 2, 3, 4, 5, 6, 7, 8]
// [1, 2, 3, 4][5, 6, 7, 8]

// const testArray = [4, 5, 2, 7, 7, 7, 7, 7, 7, 7, 5, 34, 23423, 765, 4];
// const testArray = [4, 5, 2, 0, 7, 332, 7, 98, 76, 7645, 5, 34, 23423, 765, 4];
const testArray = [4, 5, 2, 0, 7, 332, 7, 8, 9, 98, 76, 7645, 5, 34, 23423, 765, 4];
// console.log(mergesort(testArray));

const newTree = binaryTree(testArray);
console.log(newTree.tree)
newTree.prettyPrint(newTree.tree)

// console.log(...testArray.slice(0, 0))
//

