AlgorithmRegistry.register({
    id: 'quickSort',
    name: 'Quick Sort',
    type: 'sort',
    run(arr, moves) {
        quickSort(arr, 0, arr.length - 1, moves);
    }
});

function quickSort(arr, low, high, moves) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high, moves);
        quickSort(arr, low, pivotIndex - 1, moves);
        quickSort(arr, pivotIndex + 1, high, moves);
    }
}

function partition(arr, low, high, moves) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        moves.push({ indices: [j, high], swap: false });
        if (arr[j] <= pivot) {
            i++;
            if (i !== j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                moves.push({ indices: [i, j], swap: true });
            }
        }
    }
    if (i + 1 !== high) {
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        moves.push({ indices: [i + 1, high], swap: true });
    }
    return i + 1;
}
