// Terminal interactif de la section #playground.
// Dépend de TERMINAL_DATA / TERMINAL_UNKNOWN définis dans data.js (chargé avant ce fichier).

(function () {
  const input = document.getElementById("term-input");
  const output = document.getElementById("term-output");
  if (!input || !output || typeof TERMINAL_DATA === "undefined") return;

  const MAX_LINES = 60;

  function printLine(text, cssClass) {
    const p = document.createElement("p");
    p.className = "line " + (cssClass || "out faint");
    p.textContent = text;
    output.appendChild(p);
    while (output.children.length > MAX_LINES) {
      output.removeChild(output.firstElementChild);
    }
  }

  const history = [];
  let historyIndex = -1;

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    printLine("$ " + raw, "in");

    if (cmd === "clear") {
      output.innerHTML = "";
      return;
    }

    const lines = TERMINAL_DATA[cmd];
    if (lines) {
      lines.forEach((line) => printLine(line));
    } else {
      printLine(TERMINAL_UNKNOWN(raw));
    }
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (input.value.trim()) {
        history.push(input.value);
        historyIndex = history.length;
      }
      runCommand(input.value);
      input.value = "";
      output.scrollTop = output.scrollHeight;
      return;
    }
    if (e.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex -= 1;
        input.value = history[historyIndex];
        requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
      }
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        historyIndex += 1;
        input.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        input.value = "";
      }
      e.preventDefault();
    }
  });
})();