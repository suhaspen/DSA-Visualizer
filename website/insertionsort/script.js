myCanvas.width = 400; 
myCanvas.height = 300;
const margin = 30;
const n = 20; 
const array = []; 
let moves = []; 
const cols = []; 
const spacing = (myCanvas.width - margin * 2) / n;
const ctx = myCanvas.getContext("2d");

const maxcolHeight = 200;

function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    moves = [];
    for (let i = 0; i < array.length; i++) {
        const x = i * spacing + spacing / 2 + margin; 
        const y = myCanvas.height - margin;
        const width = spacing - 4;
        const height = (maxcolHeight - margin * 2) * array[i];
        cols[i] = new Column(x, y, width, height); 
        cols[i].draw(ctx);
    }
}

function play() {
    moves = insertionSort(array.slice()); // swap to bubbleSort(array.slice()) if needed
}

animate();

function insertionSort(arr) {
    const moves = [];

    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > current) {
            moves.push({ indices: [j, j + 1], swap: true });
            arr[j + 1] = arr[j];
            j--;
        }

        moves.push({ indices: [j + 1, i], swap: true });
        arr[j + 1] = current;
    }

    return moves;
}

function animate() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    let changed = false; 
    for (let i = 0; i < cols.length; i++) {
        changed = cols[i].draw(ctx) || changed; 
    }

    if (!changed && moves.length > 0) {
        const move = moves.shift(); 
        const [i, j] = move.indices; 
        if (move.swap) {
            cols[i].moveTo(cols[j]);
            cols[j].moveTo(cols[i]);
            [cols[i], cols[j]] = [cols[j], cols[i]];
        } else {
            cols[i].jump(); 
            cols[j].jump();
        }
    }

    requestAnimationFrame(animate);
}
