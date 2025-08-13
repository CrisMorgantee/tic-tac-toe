// UC9 – Jogo da Velha Interativo
// Requisitos atendidos: alternância automática, vitória/empate, reinício, responsividade, acessibilidade, tema, sons, modularização.

// Constantes
const SIMBOLO_X = 'X';
const SIMBOLO_O = 'O';
const CELULA_VAZIA = '';

// Estado/Placar
const game = {
  tabuleiro: Array(9).fill(CELULA_VAZIA),
  jogadorAtual: SIMBOLO_X,
  jogoAtivo: true,
  placar: { X: 0, O: 0, draw: 0 },
};

// Seletores
const boardEl = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const themeToggleBtn = document.getElementById('theme-toggle');
const scoreXEl = document.getElementById('score-x');
const scoreOEl = document.getElementById('score-o');
const scoreDrawEl = document.getElementById('score-draw');

// Áudio: usar Web Audio API para evitar assets binários
let audioCtx;
function playTone(freq = 440, duration = 0.08, type = 'sine', volume = 0.04) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch { /* ignore for environments w/o audio */ }
}

function playMoveSound(symbol) {
  // Diferenciar X e O
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // opt-out simples
  const isX = symbol === SIMBOLO_X;
  playTone(isX ? 520 : 380, 0.07, isX ? 'square' : 'triangle', 0.05);
}
function playWinSound() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  playTone(660, 0.11, 'sine', 0.06);
  setTimeout(() => playTone(880, 0.12, 'sine', 0.05), 120);
}
function playDrawSound() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  playTone(300, 0.08, 'sawtooth', 0.04);
}

// Inicialização
function inicializarJogo() {
  game.tabuleiro = Array(9).fill(CELULA_VAZIA);
  game.jogadorAtual = SIMBOLO_X;
  game.jogoAtivo = true;
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.disabled = false;
    cell.classList.remove('x', 'o', 'win');
    cell.setAttribute('aria-disabled', 'false');
  });
  atualizarStatus(`Vez do jogador: ${game.jogadorAtual}`);
  destacarJogadorAtivo();
}

// Utilidades UI
function atualizarStatus(texto) {
  statusEl.textContent = texto;
}
function atualizarPlacar() {
  scoreXEl.textContent = String(game.placar.X);
  scoreOEl.textContent = String(game.placar.O);
  scoreDrawEl.textContent = String(game.placar.draw);
}
function destacarJogadorAtivo() {
  // Atualiza atributo data-state para CSS/tema, se desejado (poderia alterar cores)
  boardEl.dataset.turn = game.jogadorAtual;
}

// Lógica de vitória/empate
const COMBINACOES_VENCEDORAS = [
  [0,1,2], [3,4,5], [6,7,8], // linhas
  [0,3,6], [1,4,7], [2,5,8], // colunas
  [0,4,8], [2,4,6],          // diagonais
];

function verificarVitoria(tab, simbolo) {
  for (const [a,b,c] of COMBINACOES_VENCEDORAS) {
    if (tab[a] === simbolo && tab[b] === simbolo && tab[c] === simbolo) {
      return [a,b,c];
    }
  }
  return null;
}

function verificarEmpate(tab) {
  return tab.every(v => v !== CELULA_VAZIA);
}

function alternarJogador() {
  game.jogadorAtual = (game.jogadorAtual === SIMBOLO_X) ? SIMBOLO_O : SIMBOLO_X;
  destacarJogadorAtivo();
}

// Eventos
function lidarComClique(e) {
  const cell = e.currentTarget;
  const index = Number(cell.dataset.index);
  if (!game.jogoAtivo) return;
  if (game.tabuleiro[index] !== CELULA_VAZIA) return; // inválido

  // Jogada
  game.tabuleiro[index] = game.jogadorAtual;
  cell.textContent = game.jogadorAtual;
  cell.classList.add(game.jogadorAtual.toLowerCase());
  playMoveSound(game.jogadorAtual);

  // Checar vitória
  const linhaVencedora = verificarVitoria(game.tabuleiro, game.jogadorAtual);
  if (linhaVencedora) {
    game.jogoAtivo = false;
    linhaVencedora.forEach(i => {
      cells[i].classList.add('win');
      cells[i].setAttribute('aria-label', `célula ${i+1}, parte da linha vencedora`);
    });
    atualizarStatus(`Vitória do jogador ${game.jogadorAtual}!`);
    if (game.jogadorAtual === SIMBOLO_X) game.placar.X++; else game.placar.O++;
    atualizarPlacar();
    bloquearTabuleiro();
    playWinSound();
    return;
  }

  // Checar empate
  if (verificarEmpate(game.tabuleiro)) {
    game.jogoAtivo = false;
    atualizarStatus('Empate!');
    game.placar.draw++;
    atualizarPlacar();
    bloquearTabuleiro();
    playDrawSound();
    return;
  }

  // Alternar turno
  alternarJogador();
  atualizarStatus(`Vez do jogador: ${game.jogadorAtual}`);
}

function bloquearTabuleiro() {
  cells.forEach((c) => { c.disabled = true; c.setAttribute('aria-disabled', 'true'); });
}

function reiniciarJogo() {
  // Resetar somente tabuleiro, manter placar
  inicializarJogo();
}

// Teclado/Acessibilidade: Enter/Espaço marca jogada; atalhos R/L
function onKeyDown(e) {
  const key = e.key.toLowerCase();
  if (key === 'r') {
    e.preventDefault();
    reiniciarJogo();
  } else if (key === 'l') {
    e.preventDefault();
    alternarTema();
  }
}

// Tema claro/escuro via data-theme + CSS custom properties
function alternarTema() {
  const html = document.documentElement;
  const atual = html.getAttribute('data-theme') || 'dark';
  const novo = atual === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', novo);
  themeToggleBtn.setAttribute('aria-pressed', String(novo === 'dark'));
}

// Ligação de eventos
function conectarEventos() {
  cells.forEach((cell) => {
    cell.addEventListener('click', lidarComClique);
  });
  resetBtn.addEventListener('click', reiniciarJogo);
  themeToggleBtn.addEventListener('click', alternarTema);
  document.addEventListener('keydown', onKeyDown);
}

// Bootstrap
(function main(){
  conectarEventos();
  atualizarPlacar();
  inicializarJogo();
})();