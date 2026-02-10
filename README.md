# DSA Visualizer

A modern, interactive web application for visualizing Data Structures and Algorithms. This project helps users understand how sorting algorithms work through real-time animated visualizations.

![DSA Visualizer](website/images/dsaLogo.png)

## 🚀 Features

- **Bubble Sort Visualization** - Watch how bubble sort compares and swaps adjacent elements
- **Insertion Sort Visualization** - See how insertion sort builds a sorted array one element at a time
- **Quick Sort Visualization** - Observe the divide-and-conquer approach of quick sort with partitioning
- **Interactive Controls** - Generate new random arrays and play/pause animations
- **3D Column Visualization** - Beautiful 3D column representations with smooth animations
- **Modern UI** - Clean, responsive design with smooth animations and hover effects

## 🛠️ Technologies Used

- **HTML5** - Structure and markup
- **CSS3** - Styling and animations
- **JavaScript** - Algorithm implementation and canvas rendering
- **Canvas API** - For drawing and animating the visualizations

## 📁 Project Structure

```
DSA Visualizer/
├── website/
│   ├── index.html          # Main landing page
│   ├── app.js              # Main application logic
│   ├── styles.css          # Global styles
│   ├── bubblesort/         # Bubble sort visualization
│   │   ├── bubble.html
│   │   ├── script.js
│   │   ├── column.js
│   │   ├── math.js
│   │   └── style.css
│   ├── insertionsort/      # Insertion sort visualization
│   │   ├── insertion.html
│   │   ├── script.js
│   │   ├── column.js
│   │   ├── math.js
│   │   └── style.css
│   ├── quicksort/          # Quick sort visualization
│   │   ├── quick.html
│   │   ├── script.js
│   │   ├── column.js
│   │   ├── math.js
│   │   └── style.css
│   └── images/             # Assets and images
└── README.md
```

## 🎮 How to Use

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "DSA Visualizer"
   ```

2. **Open the project**
   - Simply open `website/index.html` in your web browser
   - Or use a local development server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

3. **Navigate the visualizations**
   - Click on "Bubble", "Insertion", or "Quick" in the navigation menu
   - Click **"New"** to generate a new random array
   - Click **"Play"** to start the sorting animation

## 🎨 Features in Detail

### Bubble Sort
- Compares adjacent elements and swaps them if they're in the wrong order
- Visualizes each comparison and swap with animated column movements
- Shows the sorting process step-by-step

### Insertion Sort
- Builds the sorted array one element at a time
- Shows how elements are inserted into their correct positions
- Demonstrates the algorithm's efficiency on nearly sorted arrays

### Quick Sort
- Implements the divide-and-conquer approach
- Visualizes the partitioning process
- Shows how the algorithm recursively sorts sub-arrays

## 🎯 Key Components

- **Column Class** - Represents each bar/column in the visualization with 3D rendering
- **Animation System** - Smooth frame-by-frame animation using `requestAnimationFrame`
- **Move Tracking** - Records all algorithm steps for playback
- **Responsive Design** - Works on different screen sizes

## 🔮 Future Enhancements

- [ ] Add more sorting algorithms (Merge Sort, Heap Sort, etc.)
- [ ] Add data structure visualizations (Binary Trees, Graphs, etc.)
- [ ] Speed control for animations
- [ ] Step-by-step mode with explanations
- [ ] Comparison mode to visualize multiple algorithms side-by-side
- [ ] Custom array input option
- [ ] Algorithm complexity information display


---

**Note**: This project is designed for educational purposes to help visualize and understand how sorting algorithms work. The animations are optimized for clarity and learning rather than performance benchmarking.
