AlgorithmRegistry.register({
    id: 'bubbleSort',
    name: 'Bubble Sort',
    type: 'sort',
    run(arr, moves) {
        do {
            let swapped = false;
            for (let i = 1; i < arr.length; i++) {
                if (arr[i - 1] > arr[i]) {
                    swapped = true;
                    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                    moves.push({ indices: [i - 1, i], swap: true });
                } else {
                    moves.push({ indices: [i - 1, i], swap: false });
                }
            }
        } while (swapped);
    }
});
