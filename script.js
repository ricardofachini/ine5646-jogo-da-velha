var grid= [0,0,0,0,0,0,0,0,0]; //na grid, 0=vazio, 1= O e 2=X
var currentPlayer=1 //1= O Azul/ 2= X Vermelho
var curColor="blue";
var active=true;
var curSymbol="O"
var p1score=0 //placares
var p2score=0

function marcarPosicao(row,col){
    if (active){ //se for permitido jogar
        if (grid[3*row+col]!=0){ //Se tiver clicado num icone já preenchido, retorna
            return;
        }
        if (currentPlayer!=0) {
            grid[3*row + col] = currentPlayer; //preenche o array representante da grid com o numero do jogador
            console.log(grid)
        }

        document.getElementById("tile" + row + col).innerHTML=curSymbol; //preenche o display com a cor e simbolo corretos
        document.getElementById("tile" + row + col).style.color=curColor;

        if (testWinCondition(row,col)){
            active=false;
            switch (currentPlayer){
                case 1:++p1score;window.alert("P1 Ganhou!"); document.getElementById("p1-score-number").innerHTML=p1score.toString();break;
                case 2:++p2score;window.alert("P2 Ganhou!");document.getElementById("p2-score-number").innerHTML=p2score.toString();
            }
        } else if (!grid.includes(0)){ //GRID não tem espaços vazios= empatou
            active=false;
            let isContinue = window.confirm("EMPATE! Desejam recomeçar?");

            if (isContinue) {
                resetBoard();
            }
        }
        //no fim alterna o jogador
        switch(currentPlayer){
            case 1: currentPlayer=2;curSymbol="X";curColor="red";break;
            case 2:currentPlayer=1;curSymbol="O";curColor="blue";
        }
    } 
}
//preenche o array da grid com 0s e limpa o display
function resetBoard(){
    grid= [0,0,0,0,0,0,0,0,0];
    active=true;
    for (var i = 0; i<3; i++){
        for (var j = 0; j<3; j++){
            document.getElementById("tile" + i + j).innerHTML="_";
            document.getElementById("tile" + i + j).style.color="black";
            document.getElementById("tile" + i + j).style.backgroundColor="gray";
        }
    }
}

function resetScores(){
    p1score=0;
    p2score=0;
    document.getElementById("p1-score-number").innerHTML=p1score;
    document.getElementById("p2-score-number").innerHTML=p2score;
    console.log("RESETEI SCORES")
}
//retorna se o jogador atual atingiu vitória
function testWinCondition(row,col){
    if (grid[row*3]==currentPlayer && grid[row*3+1]==currentPlayer && grid[row*3+2]==currentPlayer){ //teste linha
        document.getElementById("tile" + row + 0).style.backgroundColor="yellow";
        document.getElementById("tile" + row + 1).style.backgroundColor="yellow";
        document.getElementById("tile" + row + 2).style.backgroundColor="yellow";
        return true;
    } else if (grid[col]==currentPlayer && grid[3+col]==currentPlayer && grid[6+col]==currentPlayer){ //testa coluna
        document.getElementById("tile" + 0 + col).style.backgroundColor="yellow";
        document.getElementById("tile" + 1 + col).style.backgroundColor="yellow";
        document.getElementById("tile" + 2 + col).style.backgroundColor="yellow";
        return true;
    } else if (grid[0]==currentPlayer && grid[4]==currentPlayer && grid[8]==currentPlayer){ //testa diagonal 1
        document.getElementById("tile" + 0 + 0).style.backgroundColor="yellow";
        document.getElementById("tile" + 1 + 1).style.backgroundColor="yellow";
        document.getElementById("tile" + 2 + 2).style.backgroundColor="yellow";
        return true;
    } else if (grid[2]==currentPlayer && grid[4]==currentPlayer && grid[6]==currentPlayer){ //testa diagonal 2
        document.getElementById("tile" + 0 + 2).style.backgroundColor="yellow";
        document.getElementById("tile" + 1 + 1).style.backgroundColor="yellow";
        document.getElementById("tile" + 2 + 0).style.backgroundColor="yellow";
        return true;
    }
    return false;
}

function asksForPlayersNames() {
    let firstPlayerLabel = document.getElementById("p1-name")
    let secondPlayerLabel = document.getElementById("p2-name")

    let firstPlayerName = window.prompt("Qual o nome do primeiro jogador?");
    if (firstPlayerName.length > 0) {
        firstPlayerLabel.textContent = firstPlayerName;
    } else {
        firstPlayerLabel.textContent = "Primeiro Jogador"
    }
    
    let secondPlayerName = window.prompt("Qual o nome do segundo jogador?");
    if (secondPlayerName.length > 0) {
        secondPlayerLabel.textContent = secondPlayerName
    } else {
        secondPlayerLabel.textContent = "Segundo Jogador"
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    asksForPlayersNames();
}, false);