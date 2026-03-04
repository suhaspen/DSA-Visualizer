AlgorithmRegistry.register({
    id: 'binarySearch',
    name: 'Binary Search',
    type: 'search',
    run(arr, target, moves) {
        let left = 0, right = arr.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            moves.push({ indices: [left, right], swap: false, mid });
            if (arr[mid] === target) {
                moves.push({ indices: [mid, mid], swap: false, found: true });
                return;
            }
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        moves.push({ indices: [-1, -1], swap: false, found: false });
    }
});
