myCanvas.width = 400; 
myCanvas.height = 300
const margin = 30;
const n = 20; 
const array = []; 
let moves = []; 
const cols = []; 
const spacing = (myCanvas.width-margin*2)/n;
const ctx=myCanvas.getContext("2d");

const maxcolHeight = 200;


function init(){
    for (let i=0; i < n; i++){
        array[i] = Math.random();
    }
    moves = []; //stop animation thats already occurring
    for (let i=0; i<array.length; i++){
        const x = i * spacing+spacing/2+margin; 
        const y = myCanvas.height-margin - i * 3; //remove i *3 to take away slant 
        const width=spacing - 4;
        const height=(maxcolHeight-margin*2)*array[i];
        cols[i]= new Column(x,y,width,height); 
        cols[i].draw(ctx);
    }
}


function play(){
    const arrCopy = array.slice();
    moves = [];
    quickSort(arrCopy, 0, arrCopy.length - 1, moves);
}


animate();

function quickSort(arr, low, high, moves) {
    if (low < high) {
        // Partition the array and get the pivot index
        const pivotIndex = partition(arr, low, high, moves);
        
        // Recursively sort elements before and after partition
        quickSort(arr, low, pivotIndex - 1, moves);
        quickSort(arr, pivotIndex + 1, high, moves);
    }
}

function partition(arr, low, high, moves) {
    // Choose the rightmost element as pivot
    const pivot = arr[high];
    
    // Index of smaller element (indicates right position of pivot)
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        // Record comparison with pivot
        moves.push({ indices: [j, high], swap: false });
        
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            
            if (i !== j) {
                // Swap arr[i] and arr[j]
                [arr[i], arr[j]] = [arr[j], arr[i]];
                moves.push({ indices: [i, j], swap: true });
            }
        }
    }
    
    // Swap pivot with element at i+1
    if (i + 1 !== high) {
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        moves.push({ indices: [i + 1, high], swap: true });
    }
    
    return i + 1;
}

function animate(){
    ctx.clearRect(0,0,myCanvas.width, myCanvas.height);
    let changed = false; 
    for (let i = 0; i < cols.length; i++){
        changed = cols[i].draw(ctx) || changed; 
    }

    if (!changed && moves.length>0){
        const move = moves.shift(); 
        const [i, j] = move.indices; 
        if (move.swap){
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
