AlgorithmRegistry.register({
    id: 'linearSearch',
    name: 'Linear Search',
    type: 'search',
    run(arr, target, moves) {
        for (let i = 0; i < arr.length; i++) {
            moves.push({ indices: [i, i], swap: false });
            if (arr[i] === target) {
                moves.push({ indices: [i, i], swap: false, found: true });
                return;
            }
        }
        moves.push({ indices: [-1, -1], swap: false, found: false });
    }
});
