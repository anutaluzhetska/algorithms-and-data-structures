function countThreeSumZero(arr) {
    arr.sort((a, b) => a -b);
    let count = 0;
    const n = arr.length;

    for (let i = 0; i < n - 2; i++) {
        let left = i + 1;
        let right = n -1;

        while (left < right) {
            const total = arr[i] + arr[left] + arr[right];

            if (total < 0) {
                left++;
            } else if (total > 0) {
                right--;
            } else {
                if (arr[left] === arr[right]) {
                    const numElements = right - left + 1;
                    count += Math.floor((numElements * (numElements - 1)) /2);
                    break;
                } else {
                    let leftCount = 1;
                    while (left + 1 < right && arr[left] === arr[left +1 ]) {
                        leftCount++;
                        left++;
                    }

                    let rightCount = 1;
                    while (right - 1 > left && arr[right] === arr[right - 1]) {
                        rightCount++;
                        right--;
                    }

                    count += leftCount * rightCount;
                    left++;
                    right--;
                }
            }
        }
    }
    return count;
}

const arr1 = [-1, 0, 1, 2, -1, -4];
console.log("Test1: ", countThreeSumZero(arr1));

const arr2 = [0, 0, 0, 0];
console.log("Test2: ", countThreeSumZero(arr2));

const arr3 = [1, 2, 3, 4, 5];
console.log("Test3: ", countThreeSumZero(arr3));


const length = Math.floor(Math.random() * 11) + 5;
const randomArray = [];

for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * 11) - 5;
    randomArray.push(randomNum);
}

console.log("Generated array: ", [...randomArray]);
console.log("Combinations found: ", countThreeSumZero(randomArray));
