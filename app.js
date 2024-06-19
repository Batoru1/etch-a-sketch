document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');
  const sliderInput = document.getElementById('slider-input');
  const sliderValue = document.getElementById('slider-value');
  let squares = [];
  let isRainbowMode = false; //Flag to track rainow mode
  //mistral///fordarken
  let darkenFactor = 0.1; // the amount to decrease the opacity by on each interaction

  function darkenSquares() {
    squares.forEach(function (square) {
      let currentOpacity = parseFloat(square.style.opacity) || 0; // get the current opacity of the square, or use 0 if it hasn't been set yet
      currentOpacity += darkenFactor; // decrease the opacity by the darken factor
      if (currentOpacity < 0) {
        currentOpacity = 0; // don't allow the opacity to go below 0
      }
      square.style.opacity = currentOpacity; // update the square's opacity
    });
  }

  // Event listener for the darken button
  // document.getElementById('darkenBtn').addEventListener('click', darkenSquares);
  darkenBtn.addEventListener('click', () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
      square.addEventListener('click', () => {
        if (square.style.backgroundColor !== 'black') {
          square.style.backgroundColor = 'black';
        } else {
          square.style.backgroundColor = '';
        }
      });
    });
  });

  //mistral/////for darken

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
      square.addEventListener('mouseenter', function () {}); //so that 'nothing happens initially
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
      return 'black'; //return black in black mode
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

  function toggle() {
    // Toggle between rainbow and black mode
    isRainbowMode = squares[0].classList.toggle('rainbow-mode');
    // Change event listeners for squares
    squares.forEach(function (square) {
      square.removeEventListener('click', changeColorOnClick);
      square.removeEventListener('mouseenter', changeColorOnHover);
      if (isRainbowMode) {
        square.addEventListener('mouseenter', changeColorOnHover);
        square.style.cursor = 'pointer'; // Add pointer cursor on hover
      } else {
        square.addEventListener('click', changeColorOnClick);

        square.style.cursor = 'default'; // Remove pointer cursor
      }
    });
  }

  //reset function to reset everything to blank
  function reset() {
    squares.forEach(function (square) {
      square.style.backgroundColor = '';
    });

    sliderInput.value = 1;
    sliderValue.textContent = '1x1';
    createGrid(1, 1);
  }

  // Event listener to change the behavior when the hoverColorBtn is clicked
  document.getElementById('hoverColorBtn').addEventListener('click', toggle);

  // Event listener to change the behavior when the clickColorBtn is clicked
  document.getElementById('clickColorBtn').addEventListener('click', toggle);

  //event listener for the black btn
  document.getElementById('blackBtn').addEventListener('click', function () {
    isRainbowMode = false; //set to black mode
  });

  //event listener for the rainbow btn
  document.getElementById('rainbowBtn').addEventListener('click', function () {
    isRainbowMode = true; //set to rainbow mode
  });

  //event listener for the reset button
  document.getElementById('resetBtn').addEventListener('click', reset);
});
