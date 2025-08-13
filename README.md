# Jogo da Velha Interativo - UC9

## **1. Regras do Jogo**

- **Dois jogadores:** X e O
- **Tabuleiro:** 3x3 células
- **Objetivo:** Alinhar 3 marcas iguais em linha, coluna ou diagonal
- **Alternância:** Automática entre jogadores após cada jogada válida
- **Vitória:** Primeiro jogador a conseguir 3 em linha
- **Empate:** Quando todas as células são preenchidas sem vencedor
- **Reinício:** Botão para começar nova partida

## **2. Requisitos Funcionais**

- [x] Interface visual com tabuleiro 3x3
- [x] Alternância automática entre jogadores X e O
- [x] Validação de jogadas (célula vazia)
- [x] Detecção de vitória (linha, coluna ou diagonal)
- [x] Detecção de empate
- [x] Botão de reinício de partida
- [x] Exibição do jogador ativo
- [x] Mensagens de status do jogo
- [x] Destaque visual para linha vencedora
- [x] Modo claro/escuro
- [x] Interface responsiva

## **3. Requisitos Não Funcionais**

- [x] Performance responsiva (< 100ms para jogadas)
- [x] Acessibilidade (ARIA, contraste, foco visível)
- [x] Compatibilidade cross-browser
- [x] Design responsivo (mobile-first)
- [x] Animações suaves e feedback visual
- [x] Código limpo e modularizado
- [x] Uso de CSS Custom Properties para temas

## **4. Estrutura do Projeto**

```
tic-tac-toe/
├── index.html          # Estrutura HTML semântica
├── style.css           # Estilos CSS com tema claro/escuro
├── script.js           # Lógica JavaScript do jogo
└── README.md           # Documentação do projeto
```

## **5. Tecnologias Utilizadas**

- **HTML5:** Estrutura semântica e acessibilidade
- **CSS3:** Grid, Flexbox, Custom Properties, Animações
- **JavaScript ES6+:** Lógica do jogo, eventos, manipulação do DOM

## **6. Conceitos da UC9 Aplicados**

- ✅ Variáveis e constantes
- ✅ Estruturas de controle (if/else, loops)
- ✅ Funções e modularização
- ✅ Arrays para representação do tabuleiro
- ✅ Objetos para organização do código
- ✅ Eventos e manipulação do DOM
- ✅ Algoritmos de verificação de vitória/empate
