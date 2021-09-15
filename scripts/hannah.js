const phrases = [
  "O Bruno prefere perguntar a cada 6 meses",
  "Tu não tá me ajudando hahahah",
  "tenho que atender a porta aqui",
  "Muito show Thiago!",
  "seus hackerzinho",
  "Manoo, documentação do strapi é muito boa",
  "Pessoal, alguém tem um curso bom de Vue para indicar?",
  "diz pra mim que tem jQuery por favor",
  "A Cara de julgamento do Floriano é a melhor",
  "Meu time (que agora é do bruno) é lindo",
  "Gente, não sei quem foi, mas pode chamar sempre que precisar",
  "Muitissimo obrigada",
  "BEM VINDOSSS!!!",
  "esse é pior que a galinha de armadura",
  "onde eu acho o peixe?",
  "Só tem artista como front",
  "Se prepara que toda edição tem essas doideiras",
  "acho que não fui convidado",
  "Sim, o time técnico mandou benzasso",
  "é isso, tem que aprender com os erros tbm",
  "pq o joao começou a fazer a reuniao? kkk nera o Bruno",
  "yuujd0xhhh´",
  "qdo vi isso a primeira vez, até assustei",
  "Nao, meu cachorro tava latindo aqui do lado",
  "Cara, faço nem ideia de como faz isso",
  "to deprimida demais pra xingar",
  "e nóis alinhando div",
  "https://codepen.io/jackiecard/pen/abpMwdW",
  "respeita que aqui é barça",
  "Galinha do zodíaco",
  "robococóp",
  "galinha blindada kkkkkkk",
  "Me deixa",
  "Fiz um comentario com o mic ligado",
  "hoje não vão gravar a apresentação?"
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
    phrase = phrases[Math.floor(Math.random() * phrases.length)]
  }
  var written = document.getElementById('written');
  written.innerHTML = "";
  written.style.marginTop = `${window.innerHeight/2 - fontSize}px`;
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
  const speakerEl = document.querySelector('#speaker');
  speakerEl.addEventListener('click', e => {
    e.preventDefault();
    if (speakerEl.classList.contains('mute')) {
      speakerEl.classList.remove('mute');
      audio.muted = false;
      return
    }
    speakerEl.classList.add('mute');
    audio.muted = true;
  });
  
  audio.load();
  document.body.addEventListener('mousedown', (e) => {
      audio.play();
      nonlinearOrtography();
  })
  document.body.addEventListener('keyup', (e) => {
    if(e.code === 'Space'){
      audio.play();
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
