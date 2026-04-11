// ---- COLOR PALETTE ----
const colorBoxes = document.querySelectorAll(".color");
const generateBtn = document.getElementById("generate-btn");
const hexValues = document.querySelectorAll(".hex-value");
const paletteContainer = document.getElementById("main-container");

const colors = [];

function generateHexValue() {
  let hexNumerals = "0123456789ABCDEF";
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hexNumerals[Math.floor(Math.random() * 16)];
  }
  return hexColor;
}

function generateColors() {
  colors.length = 0;
  for (let i = 0; i < 6; i++) {
    colors.push(generateHexValue());
  }
}

function updateColorBoxes() {
  generateColors();
  colorBoxes.forEach((box, i) => {
    box.style.background = colors[i];
    hexValues[i].textContent = colors[i];
  });
}

generateBtn.addEventListener("click", updateColorBoxes);

// ---- GRADIENT SECTION ----
const gradientBoxes = document.querySelectorAll(".gradient");
const gradientValues = document.querySelectorAll(".gradient-value");
const generateGradientBtn = document.getElementById("generate-gradient-btn");

function generateGradient() {
  const c1 = generateHexValue();
  const c2 = generateHexValue();
  const angle = Math.floor(Math.random() * 360);

  return `linear-gradient(${angle}deg, ${c1}, ${c2})`;
}

function updateGradientBoxes() {
  gradientBoxes.forEach((box, i) => {
    const gradient = generateGradient();
    box.style.background = gradient;
    gradientValues[i].textContent = gradient;
  });
}

function copyState(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");

  element.style.color = "#48bb78";

  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 1500);
}

generateGradientBtn.addEventListener("click", updateGradientBoxes);

// ---- HSL SECTION ----
const hslBoxes = document.querySelectorAll(".hsl-color");
const hslValues = document.querySelectorAll(".hsl-value");
const generateHslBtn = document.getElementById("generate-hsl-btn");

function generateHslPalette() {
  const hue = Math.floor(Math.random() * 360);

  hslBoxes.forEach((box, i) => {
    const lightness = 20 + i * 15;
    const hsl = `hsl(${hue}, 80%, ${lightness}%)`;

    box.style.background = hsl;
    hslValues[i].textContent = hsl;
  });
}

generateHslBtn.addEventListener("click", generateHslPalette);

// ---- COPY BUTTON ----
paletteContainer.addEventListener("click", (e) => {
  const target = e.target;

  const colorBox = target.closest(".color-box");
  const gradientBox = target.closest(".gradient-box");
  const hslBox = target.closest(".hsl-box");

  if (colorBox) {
    const copyBtn = colorBox.querySelector(".copy-btn");

    const hexInfo = colorBox.querySelector(".hex-value").textContent;

    navigator.clipboard
      .writeText(hexInfo)
      .then(() => copyState(copyBtn))
      .catch((err) => console.log("Copy failed:", err));
  } else if (gradientBox) {
    const copyBtn = gradientBox.querySelector(".copy-btn");

    const gradientInfo =
      gradientBox.querySelector(".gradient-value").textContent;

    navigator.clipboard
      .writeText(gradientInfo)
      .then(() => copyState(copyBtn))
      .catch((err) => console.log("Copy failed:", err));
  } else if (hslBox) {
    const copyBtn = hslBox.querySelector(".copy-btn");

    const hslInfo = hslBox.querySelector(".hsl-value").textContent;

    navigator.clipboard
      .writeText(hslInfo)
      .then(() => copyState(copyBtn))
      .catch((err) => console.log("Copy failed:", err));
  }
});

/* ---- UNCOMMENT THIS FOR DIFFERENT GENERATED PALETTES ON REFRESH ----
updateColorBoxes();
updateGradientBoxes();
generateHslPalette(); 
*/
