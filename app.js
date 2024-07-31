document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');
  const sliderInput = document.getElementById('slider-input');
  const sliderValue = document.getElementById('slider-value');
  let squares = [];
  let isRainbowMode = false; // Flag to track rainbow mode
  let isDarkenMode = false; // Flag to track darken mode
  let isHoverMode = false; // Flag to track hover mode

  function createGrid(rows, columns) {
    // Remove existing square elements and their event listeners
    while (container.firstChild) {
      container.firstChild.removeEventListener(
        'mouseenter',
        changeColorOnHover
      );
      container.firstChild.removeEventListener('click', changeColorOnClick);
      container.removeChild(container.firstChild);
    }

    squares = []; // Clear the squares array

    // Calculate the square size based on the slider value and container width
    const containerWidth = container.clientWidth;
    const squareSize = containerWidth / columns;

    // Create and append the grid squares with adjusted size and new event listeners
    for (let i = 0; i < rows * columns; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.style.width = squareSize + 'px';
      square.style.height = squareSize + 'px';
      container.appendChild(square);
      squares.push(square); // Add the square to the array
      // Add event listeners for the new square
      square.addEventListener('mouseenter', function () {}); // So that 'nothing happens initially
      square.addEventListener('click', changeColorOnClick);
    }
  }

  // Event listener to update the slider value display and create the grid
  sliderInput.addEventListener('input', function () {
    createGrid(sliderInput.value, sliderInput.value);
    sliderValue.textContent = `${sliderInput.value}x${sliderInput.value}`;
  });

  createGrid(1, 1);

  // Function to generate a random color in hex format (#RRGGBB)
  function getRandomColor() {
    if (isRainbowMode) {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    } else {
      return 'black'; // Return black in black mode
    }
  }

  function changeColorOnHover() {
    // Change the background color to a random color on hover
    this.style.backgroundColor = getRandomColor();
  }

  function changeColorOnClick() {
    // Change the background color to a random color on click
    this.style.backgroundColor = getRandomColor();
  }

  function darkenColor(color) {
    // Darken the color by 10%
    let colorObj = new Option().style;
    colorObj.color = color;
    let rgb = colorObj.color.match(/\d+/g).map(Number);

    // Reduce each RGB component by 10%
    rgb = rgb.map(component =>
      Math.max(component - Math.round(component * 0.1), 0)
    );

    return `rgb(${rgb.join(',')})`;
  }

  function changeColorOnHoverDarken() {
    // Gradually darken the background color on hover
    this.style.backgroundColor = darkenColor(this.style.backgroundColor);
  }

  function changeColorOnClickDarken() {
    // Gradually darken the background color on click
    this.style.backgroundColor = darkenColor(this.style.backgroundColor);
  }

  function toggleHover() {
    isHoverMode = true;
    isDarkenMode = false;
    squares.forEach(square => {
      square.removeEventListener('click', changeColorOnClick);
      square.removeEventListener('mouseenter', changeColorOnHover);
      square.removeEventListener('click', changeColorOnClickDarken);
      square.removeEventListener('mouseenter', changeColorOnHoverDarken);
      if (isRainbowMode) {
        square.addEventListener('mouseenter', changeColorOnHover);
      } else {
        square.addEventListener('mouseenter', changeColorOnHoverDarken);
      }
      square.style.cursor = 'pointer'; // Add pointer cursor on hover
    });
  }

  function toggleClick() {
    isHoverMode = false;
    isDarkenMode = false;
    squares.forEach(square => {
      square.removeEventListener('click', changeColorOnClick);
      square.removeEventListener('mouseenter', changeColorOnHover);
      square.removeEventListener('click', changeColorOnClickDarken);
      square.removeEventListener('mouseenter', changeColorOnHoverDarken);
      if (isRainbowMode) {
        square.addEventListener('click', changeColorOnClick);
      } else {
        square.addEventListener('click', changeColorOnClickDarken);
      }
      square.style.cursor = 'default'; // Remove pointer cursor
    });
  }

  function toggleDarken() {
    isDarkenMode = !isDarkenMode;
    isHoverMode = false;
    isRainbowMode = false;
    squares.forEach(square => {
      square.removeEventListener('click', changeColorOnClick);
      square.removeEventListener('mouseenter', changeColorOnHover);
      square.removeEventListener('click', changeColorOnClickDarken);
      square.removeEventListener('mouseenter', changeColorOnHoverDarken);
      if (isDarkenMode) {
        square.addEventListener('click', changeColorOnClickDarken);
      } else {
        square.addEventListener('click', changeColorOnClick);
      }
      square.style.cursor = 'default'; // Remove pointer cursor
    });
  }

  function toggleRainbow() {
    isRainbowMode = !isRainbowMode;
    isDarkenMode = false;
    squares.forEach(square => {
      square.removeEventListener('click', changeColorOnClick);
      square.removeEventListener('mouseenter', changeColorOnHover);
      square.removeEventListener('click', changeColorOnClickDarken);
      square.removeEventListener('mouseenter', changeColorOnHoverDarken);
      if (isHoverMode) {
        square.addEventListener('mouseenter', changeColorOnHover);
      } else {
        square.addEventListener('click', changeColorOnClick);
      }
      square.style.cursor = 'default'; // Remove pointer cursor
    });
  }

  // Reset function to reset everything to blank
  function reset() {
    squares.forEach(square => {
      square.style.backgroundColor = 'white'; // Reset to white background
    });

    sliderInput.value = 1;
    sliderValue.textContent = '1x1';
    createGrid(1, 1);
  }

  // Event listener to change the behavior when the hoverColorBtn is clicked
  document
    .getElementById('hoverColorBtn')
    .addEventListener('click', toggleHover);

  // Event listener to change the behavior when the clickColorBtn is clicked
  document
    .getElementById('clickColorBtn')
    .addEventListener('click', toggleClick);

  // Event listener for the black button
  document.getElementById('blackBtn').addEventListener('click', function () {
    isRainbowMode = false; // Set to black mode
    isDarkenMode = false; // Disable darken mode
    toggleClick();
  });

  // Event listener for the rainbow button
  document
    .getElementById('rainbowBtn')
    .addEventListener('click', toggleRainbow);

  // Event listener for the reset button
  document.getElementById('resetBtn').addEventListener('click', reset);

  // Event listener for the darken button
  document.getElementById('darkenBtn').addEventListener('click', toggleDarken);
});
