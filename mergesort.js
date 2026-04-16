export function mergesort(passedArray) {
    if (passedArray.length === 1) {
        // console.log("returned passed array");
        return passedArray;
    } else {
        const chunksize = passedArray.length/2;
        const a1 = [...passedArray].slice(0, chunksize); //from index 0 to middle (passedarray.length/2)
        const a2 = [...passedArray].slice(chunksize, chunksize + passedArray.length); //from middle to end
        // console.log("a1: "+ a1)
        // console.log("a2: "+ a2)
        const sortedA1 = mergesort(a1);
        const sortedA2 = mergesort(a2);
        let array1Index = 0;
        let array2Index = 0;
        let sortedArray = [];
        for (let i = 0; i < passedArray.length; i++){
            if (array1Index+1 > sortedA1.length){
                sortedArray.push(sortedA2[array2Index]);
                array2Index += 1;
            }
            else if (array2Index+1 > sortedA2.length){
                sortedArray.push(sortedA1[array1Index]);
                array1Index += 1;
            }
            else if (sortedA1[array1Index] <= sortedA2[array2Index]){
                sortedArray.push(sortedA1[array1Index]);
                array1Index += 1;
            } else{
                sortedArray.push(sortedA2[array2Index]);
                array2Index += 1;
            }
        }
        // console.log("returned sorted array");
        return sortedArray;        
        
    }
}

// const test_array = [42, -10, 15, 7, 0, 88, 15, 3, -5, 22, 104, 1, 67, -2, 19, 54, 31, 8, -15, 42, 12, 99, 4, 27, 50]
// console.log(mergesort(test_array));

// console.log(mergesort([1,3,54,6,4,3]))
// mergesort([1,3,54,6,4,3])

// console.log(mergesort([1,3,54,6]))

// 1,3,54
// 6,4,3

//1,3,3

//4,6,54