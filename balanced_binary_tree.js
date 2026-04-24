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
            if (base.leftNode === null || base.leftNode === undefined) {
            } else {
                if (deleteValue === base.value) {

                    if (base.leftNode === null && base.rightNode === null) { //target has no children (both NULL)
                        if (previousNode.leftNode === base) {
                            previousNode.leftNode = null;
                            return true;
                        }
                        else if (previousNode.rightNode === base) {
                            previousNode.rightNode = null;
                            return true;
                        }
                    }

                    else if ((base.leftNode === null && base.rightNode !== null) || (base.rightNode === null && base.leftNode !== null)) { //target has 1 valid child and 1 null child (left or right)
                        let validNode;
                        if (base.leftNode !== null) validNode = base.leftNode;
                        else validNode = base.rightNode;

                        if (previousNode.leftNode === base) {
                            previousNode.leftNode = validNode;
                            return true;
                        }
                        else if (previousNode.rightNode === base) {
                            previousNode.rightNode = validNode;
                            return true;
                        }
                    }

                    else if (base.leftNode !== null || base.rightNode !== null) { //target has 2 children (both non-null)
                        // console.log("swap removal")
                        return swapRemoval(base, base, previousNode, previousNode, "left");
                    }
                }

                if (deleteValue > base.value) {
                    return deleteInner(deleteValue, base.rightNode, base)
                }

                else if (deleteValue < base.value) {
                    return deleteInner(deleteValue, base.leftNode, base)
                }
            }
            return false;
        }

        function swapRemoval(base, swapNode, reattachNode, previousNode, direction, rightOnce = true) { //function used to remove a node that has 2 children (left and right)
            if (direction === "left") {
                if (base.leftNode === null || base.leftNode === undefined) {

                    // console.log(base.value)
                    // if (swapNode === tree) { console.log("base.leftnode is " + base.leftnode + " swapNode is " + swapNode.value + " direction is " + direction) }
                    // else { console.log("base.leftnode is " + base.leftnode + " swapNode is " + swapNode.value + " reattachNode is " + reattachNode.value + " direction is " + direction) }

                    if (base.rightNode !== null) {
                        previousNode.leftNode = base.rightNode; // if the innermost leftnode we are going to swap has a child right node, we need to assign it to the previous node's left child so that the data doesn't get lost
                    } else {
                        previousNode.leftNode = null;
                    }

                    swapNode.value = base.value; //replace the delete node's value with the left innermost child 

                    return true;
                }
                else {
                    // console.log(base.value)
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

            return true;

        }


        return deleteInner(deleteValue);
    }

    function levelOrderForEach(callback) {
        if (!callback) {
            throw new Error("Error: missing callback function")
        }
        if (tree === null || tree === undefined) return;

        const queue = [tree]; //create the queue and place the tree at the front

        while (queue.length > 0) {
            const currentNode = queue.shift();

            callback(currentNode.value);

            if (currentNode.leftNode !== null && currentNode.leftNode !== undefined) {
                queue.push(currentNode.leftNode);
            }

            if (currentNode.rightNode !== null && currentNode.rightNode !== undefined) {
                queue.push(currentNode.rightNode);
            }
        }
    }

    function preOrderForEach(callback) {
        if (!callback) {
            throw new Error("Error: missing callback function")
        }
        if (tree === null || tree === undefined) return;


        function preorder(base) {
            if (base === null || base === undefined) return;

            callback(base.value);
            preorder(base.leftNode);
            preorder(base.rightNode);
        }

        preorder(tree);
    }

    function inOrderForEach(callback) {
        if (!callback) {
            throw new Error("Error: missing callback function")
        }
        if (tree === null || tree === undefined) return;


        function inorder(base) {
            if (base === null || base === undefined) return;

            inorder(base.leftNode);
            callback(base.value);
            inorder(base.rightNode);
        }

        inorder(tree);
    }

    function postOrderForEach(callback) {
        if (!callback) {
            throw new Error("Error: missing callback function")
        }
        if (tree === null || tree === undefined) return;


        function postorder(base) {
            if (base === null || base === undefined) return;

            postorder(base.leftNode);
            postorder(base.rightNode);
            callback(base.value);
        }

        postorder(tree);
    }

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null || node === undefined) {
            return;
        }

        prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }


    return { tree, prettyPrint, includes, insert, deleteItem, levelOrderForEach, preOrderForEach, inOrderForEach, postOrderForEach }
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
// console.log(newTree.tree.value);
console.log(newTree.deleteItem(0));

//

function basicLog(value) {
    console.log("value is: " + value);
}
// newTree.levelOrderForEach(basicLog);
// newTree.levelOrderForEach();

newTree.postOrderForEach(basicLog);
//