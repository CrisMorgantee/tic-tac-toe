/**
 * Jogo da Velha Interativo - UC9
 * Lógica de Programação e Algoritmos
 * 
 * Este arquivo implementa:
 * - Variáveis e constantes
 * - Estruturas de controle (if/else, loops)
 * - Funções e modularização
 * - Arrays para representação do tabuleiro
 * - Objetos para organização do código
 * - Eventos e manipulação do DOM
 * - Algoritmos de verificação de vitória/empate
 */

// ===== CONSTANTES =====
const SIMBOLO_X = 'X';
const SIMBOLO_O = 'O';
const CELULA_VAZIA = '';
const TAMANHO_TABULEIRO = 3;

// ===== VARIÁVEIS GLOBAIS =====
let tabuleiro = [];
let jogadorAtual = SIMBOLO_X;
let jogoAtivo = true;
let celulas = [];

// ===== ELEMENTOS DO DOM =====
const tabuleiroElement = document.getElementById('tabuleiro');
const jogadorAtualElement = document.getElementById('jogadorAtual');
const statusMensagemElement = document.getElementById('statusMensagem');
const btnReiniciarElement = document.getElementById('btnReiniciar');

// ===== INICIALIZAÇÃO DO JOGO =====
document.addEventListener('DOMContentLoaded', () => {
  inicializarJogo();
  configurarEventListeners();
});

/**
 * Inicializa o estado inicial do jogo
 */
function inicializarJogo() {
  // Inicializa o tabuleiro como array 2D vazio
  tabuleiro = [];
  for (let i = 0; i < TAMANHO_TABULEIRO; i++) {
    tabuleiro[i] = [];
    for (let j = 0; j < TAMANHO_TABULEIRO; j++) {
      tabuleiro[i][j] = CELULA_VAZIA;
    }
  }

  // Reseta variáveis do jogo
  jogadorAtual = SIMBOLO_X;
  jogoAtivo = true;

  // Cria as células do tabuleiro
  criarCelulasTabuleiro();

  // Atualiza a interface
  atualizarInterface();
}

/**
 * Cria dinamicamente as células do tabuleiro
 */
function criarCelulasTabuleiro() {
  tabuleiroElement.innerHTML = '';
  celulas = [];

  for (let i = 0; i < TAMANHO_TABULEIRO; i++) {
    for (let j = 0; j < TAMANHO_TABULEIRO; j++) {
      const celula = document.createElement('div');
      celula.className = 'cell';
      celula.setAttribute('data-row', i);
      celula.setAttribute('data-col', j);
      celula.setAttribute('tabindex', '0');
      celula.setAttribute('role', 'button');
      celula.setAttribute('aria-label', `Célula ${i + 1}, ${j + 1}`);

      tabuleiroElement.appendChild(celula);
      celulas.push(celula);
    }
  }
}

/**
 * Configura todos os event listeners do jogo
 */
function configurarEventListeners() {
  // Event listener para cliques nas células
  tabuleiroElement.addEventListener('click', lidarComClique);

  // Event listener para navegação por teclado
  tabuleiroElement.addEventListener('keydown', lidarComTeclado);

  // Event listener para o botão de reinício
  btnReiniciarElement.addEventListener('click', reiniciarJogo);
}

/**
 * Manipula cliques nas células do tabuleiro
 * @param {Event} evento - Evento de clique
 */
function lidarComClique(evento) {
  const celula = evento.target;

  // Verifica se o clique foi em uma célula válida
  if (!celula.classList.contains('cell') || !jogoAtivo) {
    return;
  }

  const row = parseInt(celula.getAttribute('data-row'));
  const col = parseInt(celula.getAttribute('data-col'));

  // Verifica se a célula está vazia
  if (tabuleiro[row][col] === CELULA_VAZIA) {
    fazerJogada(row, col);
  }
}

/**
 * Manipula navegação por teclado nas células
 * @param {KeyboardEvent} evento - Evento de teclado
 */
function lidarComTeclado(evento) {
  if (evento.key === 'Enter' || evento.key === ' ') {
    evento.preventDefault();
    lidarComClique(evento);
  }
}

/**
 * Executa uma jogada válida
 * @param {number} row - Linha da célula
 * @param {number} col - Coluna da célula
 */
function fazerJogada(row, col) {
  // Atualiza o tabuleiro
  tabuleiro[row][col] = jogadorAtual;

  // Atualiza a interface da célula
  const celula = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  celula.textContent = jogadorAtual;
  celula.classList.add(jogadorAtual.toLowerCase());

  // Verifica condições de fim de jogo
  if (verificarVitoria(row, col)) {
    finalizarJogo('vitoria');
  } else if (verificarEmpate()) {
    finalizarJogo('empate');
  } else {
    // Alterna para o próximo jogador
    alternarJogador();
    atualizarInterface();
  }
}

/**
 * Verifica se a jogada atual resultou em vitória
 * @param {number} row - Linha da última jogada
 * @param {number} col - Coluna da última jogada
 * @returns {boolean} True se houve vitória
 */
function verificarVitoria(row, col) {
  const simbolo = tabuleiro[row][col];

  // Verifica linha
  if (verificarLinha(row, simbolo)) {
    destacarLinhaVencedora(row, 'horizontal');
    return true;
  }

  // Verifica coluna
  if (verificarColuna(col, simbolo)) {
    destacarLinhaVencedora(col, 'vertical');
    return true;
  }

  // Verifica diagonais (apenas se a jogada foi em uma diagonal)
  if (row === col && verificarDiagonalPrincipal(simbolo)) {
    destacarLinhaVencedora(null, 'diagonal-principal');
    return true;
  }

  if (row + col === TAMANHO_TABULEIRO - 1 && verificarDiagonalSecundaria(simbolo)) {
    destacarLinhaVencedora(null, 'diagonal-secundaria');
    return true;
  }

  return false;
}

/**
 * Verifica se uma linha está completa com o mesmo símbolo
 * @param {number} row - Índice da linha
 * @param {string} simbolo - Símbolo a verificar
 * @returns {boolean} True se a linha está completa
 */
function verificarLinha(row, simbolo) {
  for (let col = 0; col < TAMANHO_TABULEIRO; col++) {
    if (tabuleiro[row][col] !== simbolo) {
      return false;
    }
  }
  return true;
}

/**
 * Verifica se uma coluna está completa com o mesmo símbolo
 * @param {number} col - Índice da coluna
 * @param {string} simbolo - Símbolo a verificar
 * @returns {boolean} True se a coluna está completa
 */
function verificarColuna(col, simbolo) {
  for (let row = 0; row < TAMANHO_TABULEIRO; row++) {
    if (tabuleiro[row][col] !== simbolo) {
      return false;
    }
  }
  return true;
}

/**
 * Verifica se a diagonal principal está completa
 * @param {string} simbolo - Símbolo a verificar
 * @returns {boolean} True se a diagonal está completa
 */
function verificarDiagonalPrincipal(simbolo) {
  for (let i = 0; i < TAMANHO_TABULEIRO; i++) {
    if (tabuleiro[i][i] !== simbolo) {
      return false;
    }
  }
  return true;
}

/**
 * Verifica se a diagonal secundária está completa
 * @param {string} simbolo - Símbolo a verificar
 * @returns {boolean} True se a diagonal está completa
 */
function verificarDiagonalSecundaria(simbolo) {
  for (let i = 0; i < TAMANHO_TABULEIRO; i++) {
    if (tabuleiro[i][TAMANHO_TABULEIRO - 1 - i] !== simbolo) {
      return false;
    }
  }
  return true;
}

/**
 * Verifica se o jogo terminou em empate
 * @returns {boolean} True se é empate
 */
function verificarEmpate() {
  for (let row = 0; row < TAMANHO_TABULEIRO; row++) {
    for (let col = 0; col < TAMANHO_TABULEIRO; col++) {
      if (tabuleiro[row][col] === CELULA_VAZIA) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Destaca visualmente a linha vencedora
 * @param {number|null} index - Índice da linha/coluna (null para diagonais)
 * @param {string} tipo - Tipo de linha ('horizontal', 'vertical', 'diagonal-principal', 'diagonal-secundaria')
 */
function destacarLinhaVencedora(index, tipo) {
  const celulasVencedoras = [];

  switch (tipo) {
    case 'horizontal':
      for (let col = 0; col < TAMANHO_TABULEIRO; col++) {
        const celula = document.querySelector(`[data-row="${index}"][data-col="${col}"]`);
        celulasVencedoras.push(celula);
      }
      break;

    case 'vertical':
      for (let row = 0; row < TAMANHO_TABULEIRO; row++) {
        const celula = document.querySelector(`[data-row="${row}"][data-col="${index}"]`);
        celulasVencedoras.push(celula);
      }
      break;

    case 'diagonal-principal':
      for (let i = 0; i < TAMANHO_TABULEIRO; i++) {
        const celula = document.querySelector(`[data-row="${i}"][data-col="${i}"]`);
        celulasVencedoras.push(celula);
      }
      break;

    case 'diagonal-secundaria':
      for (let i = 0; i < TAMANHO_TABULEIRO; i++) {
        const celula = document.querySelector(`[data-row="${i}"][data-col="${TAMANHO_TABULEIRO - 1 - i}"]`);
        celulasVencedoras.push(celula);
      }
      break;
  }

  // Aplica a classe de destaque
  celulasVencedoras.forEach(celula => {
    celula.classList.add('winning');
  });
}

/**
 * Alterna para o próximo jogador
 */
function alternarJogador() {
  jogadorAtual = jogadorAtual === SIMBOLO_X ? SIMBOLO_O : SIMBOLO_X;
}

/**
 * Finaliza o jogo com o resultado especificado
 * @param {string} resultado - Tipo de resultado ('vitoria' ou 'empate')
 */
function finalizarJogo(resultado) {
  jogoAtivo = false;

  if (resultado === 'vitoria') {
    statusMensagemElement.textContent = `🎉 Jogador ${jogadorAtual} venceu!`;
    statusMensagemElement.style.borderLeftColor = 'var(--accent-secondary)';
  } else if (resultado === 'empate') {
    statusMensagemElement.textContent = '🤝 Empate! Ninguém venceu.';
    statusMensagemElement.style.borderLeftColor = 'var(--accent-danger)';
  }

  // Desabilita todas as células
  celulas.forEach(celula => {
    celula.classList.add('disabled');
  });
}

/**
 * Atualiza a interface do jogo
 */
function atualizarInterface() {
  // Atualiza o símbolo do jogador atual
  jogadorAtualElement.textContent = jogadorAtual;

  // Atualiza a cor do símbolo baseada no jogador
  if (jogadorAtual === SIMBOLO_X) {
    jogadorAtualElement.style.color = 'var(--accent-primary)';
    jogadorAtualElement.style.borderColor = 'var(--accent-primary)';
  } else {
    jogadorAtualElement.style.color = 'var(--accent-secondary)';
    jogadorAtualElement.style.borderColor = 'var(--accent-secondary)';
  }

  // Atualiza a mensagem de status
  if (jogoAtivo) {
    statusMensagemElement.textContent = `Vez do jogador ${jogadorAtual}`;
    statusMensagemElement.style.borderLeftColor = 'var(--accent-primary)';
  }
}

/**
 * Reinicia o jogo para uma nova partida
 */
function reiniciarJogo() {
  // Remove classes de destaque das células
  celulas.forEach(celula => {
    celula.classList.remove('x', 'o', 'winning', 'disabled');
    celula.textContent = '';
  });

  // Reinicializa o jogo
  inicializarJogo();

  // Adiciona animação de reinício
  btnReiniciarElement.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    btnReiniciarElement.style.transform = 'rotate(0deg)';
  }, 300);
}

// ===== FUNCIONALIDADES EXTRAS (Aula 9) =====

/**
 * Alterna entre tema claro e escuro
 */
function alternarTema() {
  const temaAtual = document.documentElement.getAttribute('data-theme');
  const novoTema = temaAtual === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', novoTema);

  // Salva preferência no localStorage
  localStorage.setItem('tema', novoTema);
}

/**
 * Carrega o tema salvo do localStorage
 */
function carregarTemaSalvo() {
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo) {
    document.documentElement.setAttribute('data-theme', temaSalvo);
  }
}

/**
 * Adiciona som para jogadas (simulado com console.log)
 */
function tocarSomJogada() {
  console.log('🔊 Som de jogada tocado!');
  // Em uma implementação real, aqui seria usado Web Audio API
}

/**
 * Adiciona som para vitória (simulado com console.log)
 */
function tocarSomVitoria() {
  console.log('🎵 Som de vitória tocado!');
  // Em uma implementação real, aqui seria usado Web Audio API
}

// Carrega tema salvo ao inicializar
carregarTemaSalvo();

// Adiciona som às jogadas
const somOriginal = fazerJogada;
fazerJogada = function (row, col) {
  tocarSomJogada();
  somOriginal(row, col);
};

// Adiciona som às vitórias
const finalizarOriginal = finalizarJogo;
finalizarJogo = function (resultado) {
  if (resultado === 'vitoria') {
    tocarSomVitoria();
  }
  finalizarOriginal(resultado);
};
