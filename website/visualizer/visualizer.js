/**
 * DSA Visualizer - Main application
 * Real-time state synchronization with modular algorithm plug-in system.
 */
(function() {
    const BAR_MODE_THRESHOLD = 150;
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 400;
    const MARGIN = 30;

    let array = [];
    let moves = [];
    let cols = [];
    let barRenderer = null;
    let useBarMode = false;
    let canvas, ctx;
    let speed = 5;
    let arraySize = 50;
    let currentAlgoId = 'bubbleSort';
    let isSearchMode = false;
    let searchTarget = 0;
    let frameCounter = 0;
    let movesPerFrame = 1;
    let highlightIndices = [];
    let highlightFrames = 0;

    function init() {
        array = [];
        for (let i = 0; i < arraySize; i++) {
            array[i] = Math.random();
        }
        moves = [];
        highlightIndices = [];
        highlightFrames = 0;
        useBarMode = arraySize > BAR_MODE_THRESHOLD;

        const spacing = (CANVAS_WIDTH - MARGIN * 2) / arraySize;
        const maxHeight = CANVAS_HEIGHT - MARGIN * 2;
        const frameCount = arraySize > 500 ? 5 : arraySize > 200 ? 10 : 20;

        if (useBarMode) {
            barRenderer = new BarRenderer(CANVAS_WIDTH, CANVAS_HEIGHT, arraySize, array, MARGIN);
        } else {
            cols = [];
            for (let i = 0; i < array.length; i++) {
                const x = i * spacing + spacing / 2 + MARGIN;
                const y = CANVAS_HEIGHT - MARGIN;
                const width = Math.max(2, spacing - 4);
                const height = maxHeight * array[i];
                cols[i] = new Column(x, y, width, height, frameCount);
            }
        }
    }

    function play() {
        const algo = AlgorithmRegistry.get(currentAlgoId);
        if (!algo) return;
        moves = [];

        if (algo.type === 'search') {
            const sorted = [...array].sort((a, b) => a - b);
            searchTarget = sorted[Math.floor(Math.random() * sorted.length)];
            algo.run(sorted, searchTarget, moves);
            if (useBarMode) {
                barRenderer.update(sorted);
            } else {
                const spacing = (CANVAS_WIDTH - MARGIN * 2) / arraySize;
                const maxHeight = CANVAS_HEIGHT - MARGIN * 2;
                const frameCount = 20;
                cols = [];
                for (let i = 0; i < sorted.length; i++) {
                    const x = i * spacing + spacing / 2 + MARGIN;
                    const y = CANVAS_HEIGHT - MARGIN;
                    const width = Math.max(2, spacing - 4);
                    const height = maxHeight * sorted[i];
                    cols[i] = new Column(x, y, width, height, frameCount);
                }
            }
        } else {
            const arrCopy = [...array];
            algo.run(arrCopy, moves);
        }
    }

    function animate() {
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (useBarMode) {
            const changed = barRenderer.lerpPositions(speed * 0.03 + 0.1);
            if (!changed && moves.length > 0) {
                const toProcess = Math.min(movesPerFrame, moves.length);
                for (let k = 0; k < toProcess; k++) {
                    const move = moves.shift();
                    if (!move) continue;
                    if (move.swap && move.indices[0] >= 0) {
                        barRenderer.swap(move.indices[0], move.indices[1]);
                    } else if (!move.swap && !move.found && move.indices[0] >= 0) {
                        highlightIndices = move.mid !== undefined ? [move.mid] : move.indices.filter(x => x >= 0);
                        highlightFrames = 8;
                    }
                }
            }
            barRenderer.draw(ctx, highlightIndices);
        } else {
            let changed = false;
            for (let i = 0; i < cols.length; i++) {
                changed = cols[i].draw(ctx, highlightIndices.includes(i)) || changed;
            }
            if (!changed && moves.length > 0) {
                const toProcess = Math.min(movesPerFrame, moves.length);
                for (let k = 0; k < toProcess; k++) {
                    const move = moves.shift();
                    if (move && move.swap && move.indices[0] >= 0) {
                        cols[move.indices[0]].moveTo(cols[move.indices[1]], moves.length > 500 ? 5 : undefined);
                        cols[move.indices[1]].moveTo(cols[move.indices[0]], moves.length > 500 ? 5 : undefined);
                        [cols[move.indices[0]], cols[move.indices[1]]] = [cols[move.indices[1]], cols[move.indices[0]]];
                    } else if (move && !move.swap && !move.found) {
                        highlightIndices = move.mid !== undefined ? [move.mid] : move.indices.filter(x => x >= 0);
                        highlightFrames = 8;
                    }
                }
            }
        }

        if (highlightFrames > 0) {
            highlightFrames--;
            if (highlightFrames === 0) highlightIndices = [];
        }

        requestAnimationFrame(animate);
    }

    function updateSpeed(val) {
        speed = parseInt(val, 10);
        movesPerFrame = Math.max(1, Math.floor(speed / 2) + 1);
    }

    function updateArraySize(val) {
        arraySize = parseInt(val, 10);
        document.getElementById('arraySizeValue').textContent = arraySize;
        init();
    }

    function updateAlgorithm(id) {
        currentAlgoId = id;
        const algo = AlgorithmRegistry.get(id);
        const searchControls = document.getElementById('searchNote');
        if (algo && algo.type === 'search') {
            searchControls.style.display = 'block';
        } else {
            searchControls.style.display = 'none';
        }
        init();
    }

    function setupUI() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        const algoSelect = document.getElementById('algorithmSelect');
        const sortAlgos = AlgorithmRegistry.getByType('sort');
        const searchAlgos = AlgorithmRegistry.getByType('search');
        algoSelect.innerHTML = '';
        const optgroup1 = document.createElement('optgroup');
        optgroup1.label = 'Sorting';
        sortAlgos.forEach(a => {
            const opt = document.createElement('option');
            opt.value = a.id;
            opt.textContent = a.name;
            optgroup1.appendChild(opt);
        });
        const optgroup2 = document.createElement('optgroup');
        optgroup2.label = 'Searching';
        searchAlgos.forEach(a => {
            const opt = document.createElement('option');
            opt.value = a.id;
            opt.textContent = a.name;
            optgroup2.appendChild(opt);
        });
        algoSelect.appendChild(optgroup1);
        algoSelect.appendChild(optgroup2);

        document.getElementById('arraySize').addEventListener('input', e => updateArraySize(e.target.value));
        document.getElementById('speed').addEventListener('input', e => updateSpeed(e.target.value));
        document.getElementById('algorithmSelect').addEventListener('change', e => updateAlgorithm(e.target.value));
        document.getElementById('newBtn').addEventListener('click', init);
        document.getElementById('playBtn').addEventListener('click', play);

        updateArraySize(50);
        updateSpeed(5);
        updateAlgorithm('bubbleSort');
        init();
        animate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupUI);
    } else {
        setupUI();
    }
})();
