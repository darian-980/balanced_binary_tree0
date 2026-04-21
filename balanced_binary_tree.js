import { mergesort } from "./mergesort.js";

function binaryTreeMake(passedArray) {
    function createNode() {
        let value = null;
        let leftNode = null;
        let rightNode = null;
        return { value, leftNode, rightNode };
    }

    let tree = BuildTree(passedArray);

    function BuildTree(passedArray) {
        if (passedArray.length === 0) return null;
        if (passedArray.length <= 1) {
            const newNode = createNode();
            newNode.value = passedArray[0];
            // console.log([newNode.value])
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

    function includes(searchValue) {
        function includesInner(searchValue, base = tree) {
            if (base === null | base === undefined) return false;
            if (base.value === searchValue) return true;
            // console.log(base, base.value);

            if (searchValue > base.value) {
                if (includesInner(searchValue, base.rightNode)) {
                    return true;
                }
            }
            if (searchValue < base.value) {
                if (includesInner(searchValue, base.leftNode)) {
                    return true;
                }
            }

            return false;
        }
        return includesInner(searchValue);
    }

    function insert(insertValue) {
        function insertInner(insertValue, base = tree) {
            if (base.value === insertValue) {
                console.log("error value already exists")
                return false;
            }

            // console.log(base, base.value);

            if (insertValue > base.value) {
                if (base.rightNode === null) {
                    console.log("adding new node on the right")
                    const newNode = createNode();
                    newNode.value = insertValue;
                    base.rightNode = newNode;
                    return true;
                } else {
                    return insertInner(insertValue, base.rightNode)
                }
            }

            else if (insertValue < base.value) {
                if (base.leftNode === null) {
                    console.log("adding new node on the left")
                    const newNode = createNode();
                    newNode.value = insertValue;
                    base.leftNode = newNode;
                    return true;
                } else {
                    return insertInner(insertValue, base.leftNode)
                }

            }

        }
        return insertInner(insertValue);
    }

    function deleteItem(deleteValue) {
        function deleteInner(deleteValue, base = tree, previousNode = null) {
            if (deleteValue === base.value) {

                if (base.leftNode === null && base.rightNode === null) { //target has no children (both NULL)
                    if (previousNode.leftNode === base) {
                        previousNode.leftNode = null;
                    }
                    else if (previousNode.rightNode === base) {
                        previousNode.rightNode = null;
                    }
                }

                else if ((base.leftNode === null && base.rightNode !== null) || (base.rightNode === null && base.leftNode !== null)) { //target has 1 valid child and 1 null child (left or right)
                    let validNode;
                    if (base.leftNode !== null) validNode = base.leftNode;
                    else validNode = base.rightNode;

                    if (previousNode.leftNode === base) {
                        previousNode.leftNode = validNode;
                    }
                    else if (previousNode.rightNode === base) {
                        previousNode.rightNode = validNode;
                    }
                }

                else if (base.leftNode !== null || base.rightNode !== null) { //target has 2 children (both non-null)
                    console.log("swap removal")
                    swapRemoval(base, base, previousNode, previousNode, "left")
                }
            }

            if (deleteValue > base.value) {
                return deleteInner(deleteValue, base.rightNode, base)
            }

            else if (deleteValue < base.value) {
                return deleteInner(deleteValue, base.leftNode, base)
            }
        }

        function swapRemoval(base, swapNode, reattachNode, previousNode, direction, rightOnce = true) { //function used to remove a node that has 2 children (left and right)
            if (direction === "left") {
                if (base.leftNode === null || base.leftNode === undefined) {

                    console.log(base.value)
                    if (swapNode === tree) { console.log("base.leftnode is " + base.leftnode + " swapNode is " + swapNode.value + " direction is " + direction) }
                    else { console.log("base.leftnode is " + base.leftnode + " swapNode is " + swapNode.value + " reattachNode is " + reattachNode.value + " direction is " + direction) }

                    if (base.rightNode !== null) {
                        previousNode.leftNode = base.rightNode; // if the innermost leftnode we are going to swap has a child right node, we need to assign it to the previous node's left child so that the data doesn't get lost
                    } else {
                        previousNode.leftNode = null;
                    }
                    if (swapNode !== tree) {
                        if (reattachNode.leftNode === swapNode) { //if the stem of the node we are replacing has it on the left side, assign it to the left side
                            reattachNode.leftNode = base;
                        }
                        else {
                            reattachNode.rightNode = base;
                        }
                    }

                    base.leftNode = swapNode.leftNode; //overrite the innermost left node's left path with the original node's LEFT path (taking it's place)
                    base.rightNode = swapNode.rightNode; //overrite the innermost left node's left path with the original node's RIGHT path (taking it's place)
                    if (swapNode === tree) {
                        console.log("tet")
                        tree = base;
                        console.log(tree.value)
                    }
                    swapNode = null; //removing the original node completely
                }
                else {
                    console.log(base.value)
                    if (rightOnce === true) {
                        swapRemoval(base.rightNode, swapNode, reattachNode, base, direction, false) // go right once and then after that only go left to get the closest greater value
                    }
                    else {
                        swapRemoval(base.leftNode, swapNode, reattachNode, base, direction, false)
                    }

                }
            }
            else if (direction === "right") {
                if (base.rightNode === null) {
                    if (base.leftNode !== null) {
                        previousNode.rightNode = base.leftNode; // if the innermost rightnode we are going to swap has a child right node, we need to assign it to the previous node's left child so that the data doesn't get lost
                    }
                    base.leftNode = swapNode.leftNode; //overrite the innermost right node's left path with the original node's LEFT path (taking it's place)
                    base.rightNode = swapNode.rightNode; //overrite the innermost right node's left path with the original node's RIGHT path (taking it's place)
                    swapNode = null; //removing the original node completely
                }
                else {
                    swapRemoval(base.rightNode, swapNode, reattachNode, base, direction)
                }
            }

            return false;

        }


        return deleteInner(deleteValue);
    }

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null || node === undefined) {
            return;
        }

        prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }


    return { tree, prettyPrint, includes, insert, deleteItem }
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

console.log(newTree.includes(7645))

console.log(newTree.insert(6))
console.log(newTree.insert(8940))
console.log(newTree.insert(332))
// newTree.prettyPrint(newTree.tree)


// console.log(newTree.deleteItem(7645));
// newTree.prettyPrint(newTree.tree)

newTree.prettyPrint(newTree.tree)
console.log(newTree.deleteItem(765));
newTree.prettyPrint(newTree.tree)
console.log(newTree.deleteItem(34));
newTree.prettyPrint(newTree.tree)
console.log(newTree.tree.value);
//