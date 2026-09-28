// Anime le terminal du hero comme si chaque commande/résultat était tapé.
// Le conteneur est masqué en amont par un petit script inline dans portfolio.html,
// exécuté avant ce fichier dans index.html pour éviter tout flash de contenu non animé.
(function () {
  var container = document.getElementById('hero-body');
  if (!container) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    container.classList.remove('hero-anim');
    return;
  }

  var lines = Array.prototype.slice.call(container.querySelectorAll('.line'));
  var last = lines[lines.length - 1];
  var cursor = last ? last.querySelector('.cursor') : null;
  if (cursor) cursor.remove();

  var data = lines.map(function (el) {
    var isIn = el.classList.contains('in');
    return { el: el, isIn: isIn, plain: el.textContent, html: el.innerHTML };
  });

  data.forEach(function (d) {
    d.el.textContent = '';
  });

  var i = 0;
  function next() {
    if (i >= data.length) {
      if (cursor && last) last.appendChild(cursor);
      container.classList.remove('hero-anim');
      return;
    }

    var d = data[i];
    d.el.style.visibility = 'visible';
    var chars = d.plain.split('');
    var idx = 0;

    (function typeChar() {
      d.el.textContent = chars.slice(0, idx + 1).join('');
      idx++;

      if (idx < chars.length) {
        var delay = d.isIn ? 26 + Math.random() * 34 : 9 + Math.random() * 14;
        setTimeout(typeChar, delay);
      } else {
        d.el.innerHTML = d.html;
        i++;
        setTimeout(next, d.isIn ? 180 : 260);
      }
    })();
  }

  setTimeout(next, 260);
})();
