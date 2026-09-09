/* Vivanet — scripts de index.html.
   Van en archivo aparte, no dentro del HTML, para que la politica de
   seguridad de contenido (CSP) pueda prohibir el script inline. */

(function(){
  var P = "";
  var fab = document.querySelector('.wsp-fab');
  var panel = document.getElementById('ayuPanel');
  var body = document.getElementById('ayuBody');
  var hola = document.getElementById('ayuHola');
  var MAIL = 'contacto@vivanet.cl';
  var WSP = 'https://wa.me/56942760906';

  var R = {
    menu: { texto: '¿En qué más te puedo ayudar?', ops: [['q','¿Qué hace Vivanet?'],['p','Conocer los productos'],['c','Pedir una cotización'],['s','Soporte / Mesa de ayuda']] },
    q: { texto: 'Construimos software a medida: aplicaciones web, automatización con inteligencia artificial e integraciones — para empresas e instituciones de todo Chile, con plazos por hitos y soporte.',
         acciones: [[P ? P + '#servicios' : '#servicios', 'Ver servicios']] },
    p: { texto: 'Tenemos una familia de plataformas propias listas para operar: un ERP completo para su empresa, anonimización de documentos, control de bodegas e inventario, flotas y más.',
         acciones: [[P ? 'productos.html' : 'productos.html', 'Ir a Productos']] },
    c: { texto: '¡Buenísimo! Cuéntanos qué necesitas y te respondemos en menos de 24 horas hábiles con una propuesta seria.',
         acciones: [['mailto:' + MAIL + '?subject=Cotizaci%C3%B3n%20Vivanet', 'Escribir correo'], [WSP + '?text=Hola%20Vivanet%2C%20quiero%20una%20cotizaci%C3%B3n', 'WhatsApp']] },
    s: { texto: 'Si ya trabajas con nosotros, escríbenos directo — tu caso queda registrado y lo tomamos con prioridad.',
         acciones: [[P ? 'index.html#soporte' : '#soporte', 'Ver la Mesa de ayuda'], ['mailto:' + MAIL + '?subject=Soporte%20Vivanet', 'Correo de soporte'], [WSP + '?text=Hola%20Vivanet%2C%20necesito%20soporte', 'WhatsApp']] }
  };

  function burbujaBot(texto){ var m = document.createElement('div'); m.className = 'ayu-msg';
    m.innerHTML = '<span class="ayu-mini"><svg width="16" height="17" viewBox="0 0 40 44"><g class="ojo"><circle cx="12.5" cy="20" r="4.5" fill="#7FD4FF"/></g><g class="ojo ojo2"><circle cx="27.5" cy="20" r="4.5" fill="#7FD4FF"/></g><path d="M13 29l7 5.5 7-5.5" stroke="#7FD4FF" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div class="ayu-burb">' + texto + '</div>';
    body.appendChild(m); body.scrollTop = body.scrollHeight; }
  function burbujaUsuario(texto){ var m = document.createElement('div'); m.className = 'ayu-msg usuario';
    m.innerHTML = '<div class="ayu-burb">' + texto + '</div>'; body.appendChild(m); body.scrollTop = body.scrollHeight; }
  function opciones(lista, acciones){ var w = document.createElement('div'); w.className = 'ayu-ops';
    (acciones || []).forEach(function(a){ var el = document.createElement('a'); el.className = 'ayu-op accion'; el.href = a[0]; el.textContent = a[1];
      if (a[0].indexOf('http') === 0 || a[0].indexOf('mailto') === 0) { el.target = '_blank'; el.rel = 'noopener'; } w.appendChild(el); });
    (lista || []).forEach(function(o){ var el = document.createElement('button'); el.className = 'ayu-op'; el.textContent = o[1];
      el.addEventListener('click', function(){ w.remove(); responder(o[0], o[1]); }); w.appendChild(el); });
    body.appendChild(w); body.scrollTop = body.scrollHeight; }
  function escribir(cb){ var t = document.createElement('div'); t.className = 'ayu-msg';
    t.innerHTML = '<span class="ayu-mini"></span><span class="ayu-typing"><i></i><i></i><i></i></span>';
    body.appendChild(t); body.scrollTop = body.scrollHeight;
    setTimeout(function(){ t.remove(); cb(); }, 650); }
  function responder(clave, etiqueta){ burbujaUsuario(etiqueta);
    escribir(function(){ var r = R[clave]; burbujaBot(r.texto); opciones(R.menu.ops, r.acciones); }); }

  var iniciado = false;
  function abrir(){ panel.classList.add('open'); if (hola) hola.remove();
    if (!iniciado) { iniciado = true;
      escribir(function(){ burbujaBot('¡Hola! 👋 Soy <b>Vito</b>, el ayudante de Vivanet. ¿En qué te puedo ayudar?'); opciones(R.menu.ops); }); } }
  function cerrar(){ panel.classList.remove('open'); }
  fab.addEventListener('click', function(e){ e.preventDefault(); panel.classList.contains('open') ? cerrar() : abrir(); });
  document.getElementById('ayuCerrar').addEventListener('click', cerrar);
  if (hola) hola.addEventListener('click', abrir);
})();

/* ---------------------------------------------------------------- */

(function(){
  // Sombra del nav al hacer scroll
  var nav = document.getElementById('nav');
  var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 10); };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Menú móvil
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  toggle.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); });
  });

  // Aparición suave de secciones
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target);
          setTimeout(function(){ e.target.classList.add('done'); }, 800); }
      });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); el.classList.add('done'); });
  }

  // Presentación animada del hero
  var stage = document.getElementById('stage');
  if (stage) {
    var scenes = stage.querySelectorAll('.scene');
    var dots = stage.querySelectorAll('.sdot');
    var cur = 0, timer = null;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show(i){
      scenes[cur].classList.remove('active'); dots[cur].classList.remove('active');
      cur = (i + scenes.length) % scenes.length;
      scenes[cur].classList.add('active'); dots[cur].classList.add('active');
    }
    function play(){ if (!reduced) timer = setInterval(function(){ show(cur + 1); }, 4400); }
    function stop(){ if (timer) { clearInterval(timer); timer = null; } }
    dots.forEach(function(d, i){ d.addEventListener('click', function(){ stop(); show(i); play(); }); });
    stage.addEventListener('mouseenter', stop);
    stage.addEventListener('mouseleave', function(){ stop(); play(); });
    play();
  }

  // Video del hero: se carga despues de la pintura inicial, y no en pantallas chicas
  // ni con "menos movimiento" — ahi queda el poster, que es lo que mide Google (LCP).
  var hv = document.querySelector('.hero-video');
  if (hv) {
    var mq = window.matchMedia;
    var quieto = mq && mq('(prefers-reduced-motion: reduce)').matches;
    var chica  = mq && mq('(max-width: 900px)').matches;
    var lento  = navigator.connection && (navigator.connection.saveData ||
                 /2g/.test(navigator.connection.effectiveType || ''));
    if (!quieto && !chica && !lento) {
      var arranca = function () {
        var mp4 = document.createElement('source');
        mp4.src = hv.dataset.mp4; mp4.type = 'video/mp4';
        var webm = document.createElement('source');
        webm.src = hv.dataset.webm; webm.type = 'video/webm';
        hv.appendChild(webm); hv.appendChild(mp4);
        hv.load();
        var p = hv.play();
        if (p && p.catch) p.catch(function () {});
      };
      if ('requestIdleCallback' in window) requestIdleCallback(arranca, {timeout: 2500});
      else setTimeout(arranca, 1200);
    }
  }

  // Año automático
  document.getElementById('year').textContent = new Date().getFullYear();
})();

/* ---------------------------------------------------------------- */

(function(){
  var b = document.getElementById('btnSubir');
  var barra = document.getElementById('barraMovil');
  var secContacto = document.getElementById('contacto');
  var pidiendo = false;

  function alScroll(){
    if (b) b.classList.toggle('ver', window.scrollY > 700);
    if (barra) {
      // Aparece una vez pasado el hero, y se retira sobre el formulario:
      // ahi la barra sobra y solo tapa campos.
      var enContacto = false;
      if (secContacto) {
        var r = secContacto.getBoundingClientRect();
        enContacto = r.top < window.innerHeight * 0.8 && r.bottom > 0;
      }
      barra.classList.toggle('ver', window.scrollY > 420 && !enContacto);
    }
  }
  window.addEventListener('scroll', function(){
    if (pidiendo) return;
    pidiendo = true;
    requestAnimationFrame(function(){ alScroll(); pidiendo = false; });
  }, {passive:true});
  alScroll();

  if (b) b.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });

  var bmA = document.getElementById('bmAyuda');
  if (bmA) bmA.addEventListener('click', function(){
    var fab = document.querySelector('.wsp-fab'); if (fab) fab.click();
  });
  document.querySelectorAll('.abrir-ayuda').forEach(function(a){
    a.addEventListener('click', function(e){ e.preventDefault();
      var fab = document.querySelector('.wsp-fab'); if (fab) fab.click();
      setTimeout(function(){ var p = document.getElementById('ayuPanel'); if (p) p.scrollIntoView({behavior:'smooth', block:'end'}); }, 150);
    });
  });
})();

/* ---------------------------------------------------------------- */

(function(){
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Contadores animados (cifras)
  var nums = document.querySelectorAll('.stat .num');
  if (nums.length && 'IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        var el = e.target, target = parseInt(el.getAttribute('data-target'), 10) || 0, t0 = null;
        function paso(t){ if (!t0) t0 = t; var p = Math.min((t - t0) / 1100, 1); p = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * p); if (p < 1) requestAnimationFrame(paso); }
        el.textContent = '0'; requestAnimationFrame(paso);
      });
    }, {threshold:.6});
    nums.forEach(function(n){ io.observe(n); });
  }

  // Barrido de luz en secciones oscuras
  var cines = document.querySelectorAll('.public, .about, .banda-cta');
  if (cines.length && 'IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target); } });
    }, {threshold:.25});
    cines.forEach(function(s){ s.classList.add('cine');
      var luz = document.createElement('i'); luz.className = 'luz'; luz.setAttribute('aria-hidden','true'); s.appendChild(luz);
      io2.observe(s); });
  }

  // Tilt 3D con suavizado (tarjetas de productos)
  var fino = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fino && !reduced) {
    document.querySelectorAll('.mini-grid, .build-grid').forEach(function(g){ g.classList.add('tilt-wrap'); });
    document.querySelectorAll('.mini-grid .mini-card, .build-grid .build-card').forEach(function(card){
      card.classList.add('tilt');
      var rx = 0, ry = 0, tx = 0, ty = 0, lift = 0, tl = 0, raf = null, sobre = false;
      function frame(){
        rx += (tx - rx) * .12; ry += (ty - ry) * .12; lift += (tl - lift) * .12;
        card.style.transform = 'perspective(900px) translateY(' + (-4 * lift).toFixed(2) + 'px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
        if (Math.abs(tx - rx) > .02 || Math.abs(ty - ry) > .02 || Math.abs(tl - lift) > .01 || sobre) { raf = requestAnimationFrame(frame); }
        else { raf = null; card.style.transform = ''; card.classList.remove('tilting'); }
      }
      card.addEventListener('pointerenter', function(){ sobre = true; tl = 1; card.classList.add('tilting'); if (!raf) raf = requestAnimationFrame(frame); });
      card.addEventListener('pointermove', function(ev){
        var r = card.getBoundingClientRect();
        var px = (ev.clientX - r.left) / r.width - .5, py = (ev.clientY - r.top) / r.height - .5;
        tx = py * -7; ty = px * 8;
      });
      card.addEventListener('pointerleave', function(){ sobre = false; tx = 0; ty = 0; tl = 0; if (!raf) raf = requestAnimationFrame(frame); });
    });
  }
})();
