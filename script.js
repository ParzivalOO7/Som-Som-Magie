import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

const CelA1 = document.getElementById("inp_A1");
const CelA2 = document.getElementById("inp_A2");
const CelA3 = document.getElementById("inp_A3");
const CelA4 = document.getElementById("inp_A4");

const CelB1 = document.getElementById("inp_B1");
const inpB2 = document.getElementById("inp_B2");
const inpB3 = document.getElementById("inp_B3");
const CelB4 = document.getElementById("inp_B4");

const CelC1 = document.getElementById("inp_C1");
const inpC2 = document.getElementById("inp_C2");
const inpC3 = document.getElementById("inp_C3");
const CelC4 = document.getElementById("inp_C4");

const CelD1 = document.getElementById("inp_D1");
const CelD2 = document.getElementById("inp_D2");
const CelD3 = document.getElementById("inp_D3");
const CelD4 = document.getElementById("inp_D4");

let ansB2, ansB3, ansC2, ansC3;
let mode;

function spawnFloatingNumbers() {
  const layer = document.getElementById("floating-layer") || (() => {
    const newLayer = document.createElement("div");
    newLayer.id = "floating-layer";
    document.body.appendChild(newLayer);
    return newLayer;
  })();

  const glyphs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "=", "×", "÷", "∑", "∞", "✦"];

  const count = 18;

  for (let i = 0; i < count; i += 1) {
    const number = document.createElement("span");
    number.className = "floating-number";
    number.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];

    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight * (0.25 + Math.random() * 0.45);
    const driftX = (Math.random() - 0.5) * 180;
    const driftY = -(60 + Math.random() * 160);
    const rotation = (Math.random() - 0.5) * 40;

    number.style.left = `${startX}px`;
    number.style.top = `${startY}px`;

    layer.appendChild(number);

    animate(number, {
      opacity: [0, 1, 0],
      x: [0, driftX],
      y: [0, driftY],
      rotate: [0, rotation],
      scale: [0.8, 1.2, 1]
    }, {
      duration: 1.8 + Math.random() * 1.2,
      easing: "ease-out",
      delay: i * 0.02,
      onComplete: () => number.remove(),
    });
  }
}

function bindButtonActions() {
  const generateBtn = document.getElementById("generate-btn");
  const checkBtn = document.getElementById("check-btn");
  const revealBtn = document.getElementById("reveal-btn");
  const themeToggle = document.getElementById("theme-toggle");

  generateBtn.addEventListener("click", MakeProblem);
  checkBtn.addEventListener("click", CheckAnswer);
  revealBtn.addEventListener("click", FakeSolve);

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    const icon = themeToggle.querySelector(".theme-toggle__icon");
    const label = themeToggle.querySelector(".theme-toggle__label");

    icon.textContent = isDark ? "◑" : "◐";
    label.textContent = "Contrast";
  });

  window.MakeProblem = MakeProblem;
  window.CheckAnswer = CheckAnswer;
  window.FakeSolve = FakeSolve;
}

function addMotionEffects() {
  const card = document.querySelector(".game-shell");
  const inputs = [...document.querySelectorAll(".number-grid input")];
  const buttons = [...document.querySelectorAll(".button")];

  animate(card, { opacity: [0, 1], y: [24, 0], scale: [0.98, 1] }, {
    duration: 0.7,
    easing: [0.16, 1, 0.3, 1],
  });

  animate(inputs, { opacity: [0, 1], x: [12, 0], filter: ["blur(3px)", "blur(0px)"] }, {
    duration: 0.45,
    delay: stagger(0.04),
    easing: "ease-out",
  });

  animate(buttons, { opacity: [0, 1], y: [10, 0] }, {
    duration: 0.45,
    delay: stagger(0.06),
    easing: [0.16, 1, 0.3, 1],
  });

  buttons.forEach((button) => {
    button.addEventListener("pointerenter", () => {
      animate(button, { scale: 1.03, y: -2 }, { duration: 0.18, easing: "ease-out" });
    });

    button.addEventListener("pointerleave", () => {
      animate(button, { scale: 1, y: 0 }, { duration: 0.18, easing: "ease-out" });
    });

    button.addEventListener("click", () => {
      animate(button, { scale: [1, 0.96, 1] }, { duration: 0.22, easing: "ease-out" });
    });
  });
}

addMotionEffects();
bindButtonActions();
MakeProblem();

function clearInputs() {
  inpB2.value = "";
  inpB3.value = "";
  inpC2.value = "";
  inpC3.value = "";
}

function MakeProblem() {
  const explanation = document.getElementById("explanation");
  explanation.style.animation = "none";
  explanation.offsetHeight;
  explanation.style.animation = "";

  clearInputs();

  // Randomly pick addition or multiplication — player has to figure it out
  mode = Math.random() < 0.5 ? 'add' : 'mul';

  ansB2 = Math.floor(Math.random() * 9 + 1);
  ansB3 = Math.floor(Math.random() * 9 + 1);
  ansC2 = Math.floor(Math.random() * 9 + 1);
  ansC3 = Math.floor(Math.random() * 9 + 1);

  if (mode === 'add') {
    CelA1.value = ansC3 + ansB2;
    CelB4.value = ansB2 + ansB3;
    CelD3.value = ansB3 + ansC3;
    CelC4.value = ansC2 + ansC3;
    CelD2.value = ansB2 + ansC2;
    CelA4.value = ansC2 + ansB3;
  } else {
    CelA1.value = ansC3 * ansB2;
    CelB4.value = ansB2 * ansB3;
    CelD3.value = ansB3 * ansC3;
    CelC4.value = ansC2 * ansC3;
    CelD2.value = ansB2 * ansC2;
    CelA4.value = ansC2 * ansB3;
  }

}

function showToast(message, type) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show " + type;
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function CheckAnswer() {
  const vB2 = parseInt(inpB2.value, 10);
  const vB3 = parseInt(inpB3.value, 10);
  const vC2 = parseInt(inpC2.value, 10);
  const vC3 = parseInt(inpC3.value, 10);

  const correct =
    vB2 === ansB2 && vB3 === ansB3 && vC2 === ansC2 && vC3 === ansC3;

  if (correct) {
    showToast("Correct! Well done.", "toast-correct");
  } else {
    showToast("Not quite. Try again!", "toast-wrong");
  }
}

function FakeSolve() {
  inpB2.value = ansB2;
  inpB3.value = ansB3;
  inpC2.value = ansC2;
  inpC3.value = ansC3;
}
