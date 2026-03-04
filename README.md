# DSA Visualizer

An interactive web application for visualizing sorting and searching algorithms with real-time state synchronization. Built with HTML, CSS, and JavaScript.

## Features

- **Interactive sorting and searching algorithms** – Real-time visualizations with synchronized state updates
- **Dynamic UI controls** – Adjust array size (up to 5000 elements), animation speed, and algorithm selection
- **Performance optimized** – Smooth frame rates during O(n log n) sorts (Quick Sort) and large arrays via efficient bar rendering
- **Modular algorithm plug-in system** – Add new algorithms without refactoring the UI

## Algorithms

| Sorting | Searching |
|---------|-----------|
| Bubble Sort | Linear Search |
| Insertion Sort | Binary Search |
| Quick Sort | |

## Technologies

- HTML5
- CSS3
- JavaScript
- Canvas API

## Project Structure

```
DSA Visualizer/
├── website/
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   ├── visualizer/           # Unified visualizer (recommended)
│   │   ├── visualizer.html
│   │   ├── visualizer.js
│   │   ├── visualizer.css
│   │   ├── algorithms/       # Modular plug-in system
│   │   │   ├── algorithmRegistry.js
│   │   │   ├── bubbleSort.js
│   │   │   ├── insertionSort.js
│   │   │   ├── quickSort.js
│   │   │   ├── linearSearch.js
│   │   │   └── binarySearch.js
│   │   ├── Column.js
│   │   ├── BarRenderer.js
│   │   └── utils.js
│   ├── bubblesort/           # Legacy individual pages
│   ├── insertionsort/
│   ├── quicksort/
│   └── images/
└── README.md
```

## Adding New Algorithms

Register a new algorithm in `website/visualizer/algorithms/`:

```javascript
AlgorithmRegistry.register({
    id: 'myAlgo',
    name: 'My Algorithm',
    type: 'sort',  // or 'search'
    run(arr, moves) {
        // Push { indices: [i, j], swap: true/false } for each step
    }
});
```

Then add a `<script>` tag in `visualizer.html`. No UI changes required.
