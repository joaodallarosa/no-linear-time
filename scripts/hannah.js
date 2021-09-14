const phrases = [
  "Language is the foundation of civilization",
  "I'm not so sure I believe in beginnings and endings",
  "Hannah... This is where your story begins",
  "Memory is a strange thing"
]
var firstTimeRun = true;
var animating = false;

let nonlinearOrtography = function() {
  if (animating) return;

  animating = true;
  const letterSpacing = 30;
  const fontSize = 24;
  var phrase = "There is no linear time";
  if(!firstTimeRun) {
    console.log('Phrases', phrases);
    phrase = phrases[Math.floor(Math.random() * phrases.length)]
  }
  var written = document.getElementById('written');
  written.innerHTML = "";
  written.style.marginTop = `${window.innerHeight/2 + fontSize}px`;
  written.style.marginLeft = `${window.innerWidth/2 - (phrase.length * letterSpacing / 2)}px`;
  document.body.appendChild(written);
  for (let i = 0; i < phrase.length/2; i++) {
    const first = phrase[i];
    const firstEl = document.createElement('span');
    firstEl.style.position = 'absolute';
    firstEl.style.marginLeft = `${i * letterSpacing}px`;
    firstEl.style.fontSize = `${fontSize}px`;
    firstEl.style.width = `${0}px`;
    firstEl.innerText = first;
    
    const last = phrase[phrase.length - (i+1)];
    const lastEl = document.createElement('span');
    lastEl.style.position = 'absolute';
    lastEl.style.marginLeft = `${(phrase.length * letterSpacing) - ((i+1) * letterSpacing)}px`;
    lastEl.style.fontSize = `${fontSize}px`;
    lastEl.style.width = `${0}px`;
    lastEl.innerText = last;

    setTimeout(() => {
      written.appendChild(firstEl);
      if (i !== (phrase.length - (i+1))) {
        written.appendChild(lastEl);
      }
      if (i+1 >= phrase.length/2) {
        animating = false;
      }
    }, i * 200);
  }
  firstTimeRun = false;
}

const blotterLetter = function (letter, appendEl) {
  var text = new Blotter.Text(letter, {
    family : "Raleway Dots, serif",
    size : 130,
    fill : "#171717"
  });

  var material = new Blotter.RollingDistortMaterial();
  material.uniforms.uSineDistortSpread.value = 0;
  material.uniforms.uSineDistortCycleCount.value = 0.0395;
  material.uniforms.uNoiseDistortVolatility.value = 70;
  material.uniforms.uNoiseDistortAmplitude.value = 0.016;
  material.uniforms.uRotation.value = 70;
  material.uniforms.uSpeed.value = 0.028;
  material.uniforms.uSineDistortAmplitude.value = 0.010;

  var blotter = new Blotter(material, { texts : text });

  var scope = blotter.forText(text);
  blotter.texts.push(new Blotter.Text('oi blotter', {
    family : "Raleway Dots, sans-serif",
    size : 130,
    fill : "#171717"
  }))

  scope.appendTo(appendEl);
}

window.onload = function() {
  var audio = new Audio('/assets/music.webm');
  audio.load();
  audio.play();
  document.body.addEventListener('mousedown', (e) => {
      nonlinearOrtography();
  })
  document.body.addEventListener('keyup', (e) => {
    if(e.code === 'Space'){
      nonlinearOrtography();
    }
  })

  if (Blotter !== undefined) {
    blotterLetter('hannah', document.getElementById('title'));
  }
  particlesJS.load('particles-js', '/scripts/particlesjs-config.json', function() {
    console.log('callback - particles.js config loaded');
  });
};
