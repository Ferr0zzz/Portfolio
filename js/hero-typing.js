(function () {
  const container = document.getElementById("hero-body");
  if (!container) return;

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const lines = Array.from(container.querySelectorAll(".line"));
  const last = lines[lines.length - 1];
  const cursor = last && last.querySelector(".cursor");
  if (cursor) cursor.remove();

  const content = lines.map((element) => ({
    element,
    isCommand: element.classList.contains("in"),
    text: element.textContent,
    nodes: Array.from(element.childNodes, (node) => node.cloneNode(true)),
  }));

  container.classList.add("hero-anim");
  content.forEach(({ element }) => {
    element.textContent = "";
  });

  let lineIndex = 0;
  function typeNextLine() {
    if (lineIndex >= content.length) {
      if (cursor && last) last.appendChild(cursor);
      container.classList.remove("hero-anim");
      return;
    }

    const line = content[lineIndex];
    const characters = Array.from(line.text);
    let characterIndex = 0;
    line.element.classList.add("typing-visible");

    function typeNextCharacter() {
      line.element.textContent = characters.slice(0, characterIndex + 1).join("");
      characterIndex += 1;

      if (characterIndex < characters.length) {
        const delay = line.isCommand ? 18 + Math.random() * 16 : 7 + Math.random() * 8;
        setTimeout(typeNextCharacter, delay);
        return;
      }

      line.element.replaceChildren(...line.nodes);
      lineIndex += 1;
      setTimeout(typeNextLine, line.isCommand ? 100 : 150);
    }

    typeNextCharacter();
  }

  setTimeout(typeNextLine, 120);
})();
