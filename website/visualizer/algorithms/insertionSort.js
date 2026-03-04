AlgorithmRegistry.register({
    id: 'insertionSort',
    name: 'Insertion Sort',
    type: 'sort',
    run(arr, moves) {
        for (let i = 1; i < arr.length; i++) {
            let current = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > current) {
                moves.push({ indices: [j, j + 1], swap: true });
                arr[j + 1] = arr[j];
                j--;
            }
            if (j + 1 !== i) moves.push({ indices: [j + 1, i], swap: true });
            arr[j + 1] = current;
        }
    }
});
