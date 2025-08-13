# Instruções de Uso e Desenvolvimento

## **Como Executar o Projeto**

### **Opção 1: Servidor Local (Recomendado)**

```bash
# No diretório do projeto
python3 -m http.server 8000
# ou
npm start
```

Acesse: `http://localhost:8000`

### **Opção 2: Abrir Direto no Navegador**

- Duplo clique no arquivo `index.html`
- Ou arraste o arquivo para o navegador

## **Estrutura dos Arquivos**

### **index.html**

- Estrutura HTML semântica
- Elementos de acessibilidade (ARIA)
- IDs e classes para JavaScript

### **style.css**

- CSS com variáveis customizadas
- Tema claro/escuro
- Design responsivo (mobile-first)
- Animações e transições

### **script.js**

- Lógica completa do jogo
- Implementa todos os conceitos da UC9
- Código modularizado e comentado

## **Funcionalidades Implementadas**

### **✅ Básicas**

- [x] Tabuleiro 3x3 interativo
- [x] Alternância automática X/O
- [x] Detecção de vitória (linha/coluna/diagonal)
- [x] Detecção de empate
- [x] Botão de reinício
- [x] Indicador de jogador ativo

### **✅ Avançadas**

- [x] Destaque visual da linha vencedora
- [x] Animações suaves
- [x] Navegação por teclado
- [x] Acessibilidade completa
- [x] Design responsivo
- [x] Tema claro/escuro

### **✅ Extras**

- [x] Som simulado (console.log)
- [x] Persistência de tema
- [x] Feedback visual rico
- [x] Código limpo e documentado

## **Conceitos da UC9 Aplicados**

### **Aula 1-2: Fundamentos**

- ✅ Regras do jogo documentadas
- ✅ Requisitos funcionais e não funcionais
- ✅ Layout HTML/CSS pronto

### **Aula 3: Estado e Variáveis**

- ✅ Constantes (`SIMBOLO_X`, `SIMBOLO_O`)
- ✅ Variáveis (`tabuleiro`, `jogadorAtual`)
- ✅ Função `inicializarJogo()`

### **Aula 4: Eventos**

- ✅ Event listeners para células
- ✅ Event listener para botão de reinício
- ✅ Validação de jogadas

### **Aula 5: Lógica de Vitória**

- ✅ `verificarVitoria()` com todas as combinações
- ✅ `verificarEmpate()`
- ✅ Destaque visual da linha vencedora

### **Aula 6: Alternância e Mensagens**

- ✅ `alternarJogador()`
- ✅ Atualização de status
- ✅ Destaque do jogador ativo

### **Aula 7: Modularização**

- ✅ Funções puras e separadas
- ✅ Arrays para representar tabuleiro
- ✅ Código organizado e legível

### **Aula 8: Objetos (Opcional)**

- ✅ Estrutura preparada para objetos
- ✅ Comentários explicativos
- ✅ Organização clara

### **Aula 9: Funcionalidades Extras**

- ✅ Sistema de som simulado
- ✅ Tema claro/escuro
- ✅ Animações avançadas
- ✅ Testes de responsividade

## **Como Jogar**

1. **Início**: O jogador X sempre começa
2. **Jogada**: Clique em uma célula vazia
3. **Alternância**: Jogadores alternam automaticamente
4. **Vitória**: 3 símbolos iguais em linha/coluna/diagonal
5. **Empate**: Todas as células preenchidas sem vencedor
6. **Reinício**: Clique em "Nova Partida"

## **Desenvolvimento e Customização**

### **Adicionar Novas Funcionalidades**

- **Placar**: Implementar contadores de vitórias
- **Som Real**: Substituir console.log por Web Audio API
- **IA**: Adicionar jogador computador
- **Histórico**: Salvar partidas anteriores

### **Modificar Estilo**

- **Cores**: Alterar variáveis CSS em `:root`
- **Animações**: Modificar keyframes no CSS
- **Layout**: Ajustar grid e flexbox

### **Extender Lógica**

- **Tabuleiro Maior**: Modificar `TAMANHO_TABULEIRO`
- **Novas Regras**: Adicionar condições de vitória
- **Modos de Jogo**: Implementar variantes

## **Testes e Validação**

### **Funcionalidades a Testar**

- [ ] Jogadas válidas e inválidas
- [ ] Detecção de vitória em todas as direções
- [ ] Detecção de empate
- [ ] Reinício do jogo
- [ ] Responsividade em diferentes dispositivos
- [ ] Acessibilidade por teclado
- [ ] Tema claro/escuro

### **Navegadores Suportados**

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## **Próximos Passos**

1. **Testar todas as funcionalidades**
2. **Implementar placar de pontuação**
3. **Adicionar sons reais**
4. **Criar modo IA simples**
5. **Implementar histórico de partidas**
6. **Adicionar modo multiplayer local**

## **Suporte e Dúvidas**

Para dúvidas sobre o código ou implementação:

- Revisar comentários no JavaScript
- Verificar console do navegador para logs
- Consultar documentação da UC9
- Testar funcionalidade por funcionalidade
