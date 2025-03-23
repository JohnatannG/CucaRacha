const voltarPagina = document.getElementById('voltarPagina');
const totalDeMovimentos = document.getElementById('totalDeMovimentos');
const resetarJogo = document.getElementById('resetarJogo');
const ContainerJogo = document.getElementById('ContainerJogo');

let tabuleiro = []
let movimentos = 0

voltarPagina.addEventListener('click', function(){
    window.location.href = 'http://127.0.0.1:5501/index.html'
});

gerarNumerosAletorios();

function gerarNumerosAletorios(){
    let numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0 ]

    numbers.sort(() => Math.random() -0.5);
    console.log(numbers);

    for (let i = 0; i < 4; i++){
        tabuleiro.push(numbers.splice(0,4));
    }

    Tabuleiro();
}

function Tabuleiro(){
    ContainerJogo.innerHTML = "";

    tabuleiro.forEach((linha, i) => {
        linha.forEach((numero, j) => {
            const peca = document.createElement("div");
            
            peca.className = numero === 0 ? "pecavazia" : "peca";
            peca.innerText = numero === 0 ? "" : numero;
            peca.addEventListener("click", () => movepeca(i, j));
            ContainerJogo.appendChild(peca);
        });
    });
}

function encontrarPecaVazia(){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(tabuleiro[i][j] === 0 ) {
                return { x: i, y: j };
            }
        }
    }
}

function movepeca(x, y) {
    const vazio = encontrarPecaVazia();

    if((Math.abs(x - vazio.x) === 1 && y === vazio.y) || (Math.abs(y - vazio.y) === 1 && x === vazio.x)){
        [tabuleiro[x][y], tabuleiro[vazio.x][vazio.y]] = [tabuleiro[vazio.x][vazio.y], tabuleiro[x][y]];

        movimentos++;
        totalDeMovimentos.innerText = movimentos;
        Tabuleiro();
    }
}

resetarJogo.addEventListener('click', function(){
    movimentos = 0;
    totalDeMovimentos.innerText = movimentos;
    tabuleiro = []
    gerarNumerosAletorios();
})