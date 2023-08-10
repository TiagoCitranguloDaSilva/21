
var minimo = 10;
var maximo = 500;
var cartasPossiveis = [];
var naipes = ['espadas', 'ouro', 'paus', 'copas'];
var maoAdversario = document.getElementById('maoAd');
var maoUsuario = document.getElementById('mao');
var pesca = document.getElementById('pesca');
var contUser = document.getElementById('user');
var contAd = document.getElementById('adver');
document.getElementById('montante').innerHTML = '$0';
document.getElementById('maxMin').innerHTML = 'Aposta mínima: ' + minimo + ' - Aposta máxima: ' + maximo;


for(let e = 0; e < 8; e++){
    for(let d = 0; d < naipes.length; d++){
        for(let c = 1; c <= 13; c++){
            switch(c){
                case 1:
                    valor = 'A';
                    break;
                case 11:
                    valor = 'Q';
                    break;
                case 12:
                    valor = 'J';
                    break;
                case 13:
                    valor = 'K';
                    break;
                default:
                    valor = c;
            }
           cartasPossiveis.push([naipes[d], valor, e+1]); 
        }
    }
}

var saldoUser = 1500
var saldoAd = 1500
var apostaFeita;

aposta();


// let carta = document.createElement('div');
// carta.classList.add('escondida');
// carta.classList.add('cartas');
// pesca.appendChild(carta);


// contagem(maoAdversario);
// contagem(maoUsuario);

function mais(){
    let botaoMenos = document.getElementById('menos');
    if(botaoMenos.disabled){
        botaoMenos.style.backgroundColor = 'blue';
        // botaoMenos.style.border = '5px solid #0000b6';
        botaoMenos.disabled = false;
    }
    let botao = document.getElementById('mais');
    botao.style.backgroundColor = '#ff9f9f';
    // botao.style.border = 'none';
    botao.disabled = true;
}

function menos(){
    let botaoMais = document.getElementById('mais');
    if(botaoMais.disabled){
        botaoMais.style.backgroundColor = 'red';
        // botaoMais.style.border = '5px solid #a70000';
        botaoMais.disabled = false;
    }
    let botao = document.getElementById('menos');
    botao.style.backgroundColor = '#7b7bff';
    // botao.style.border = 'none';
    botao.disabled = true;
}

function aposta(){
    mais()
    document.getElementById("finalizarAposta").disabled = true;
    let menuAposta = document.getElementById('aposta')
    let carteira = document.getElementById('valor');
    let carteiraAd = document.getElementById('valorAd')
    menuAposta.style.display = 'flex';
    carteira.innerHTML = '$'+saldoUser;
    carteiraAd.innerHTML = '$'+saldoAd;
    // darCartas();
}

function ficha(elemento){
    let numToAdd = elemento.innerHTML.slice(1);
    let mont = document.getElementById('montante');
    let total;
    if(document.getElementById('mais').disabled){
        total = Number(mont.innerHTML.slice(1)) + Number(numToAdd);
    }else{
        if(Number(mont.innerHTML.slice(1)) - Number(numToAdd) < 0){
            total = 0;
        }else{
            total = Number(mont.innerHTML.slice(1)) - Number(numToAdd);
        }   
    }
    if(total >= minimo){
        document.getElementById("finalizarAposta").disabled = false;
    }else{
        document.getElementById("finalizarAposta").disabled = true;
    }
    if(total > saldoUser && total <= maximo){
        mont.innerHTML = '$'+saldoUser;
        apostaFeita = saldoUser;
    }else if(total > maximo){
        apostaFeita = 500;
    }else if(total > saldoAd && total <= maximo){
        mont.innerHTML = '$'+saldoAd;
        apostaFeita = saldoAd;
        contAd.innerHTML = '$0';
    }else{
        mont.innerHTML = '$'+total;
        apostaFeita = total;
    }
        
}


function finalizarAposta(){
    let menuAposta = document.getElementById('aposta')
    menuAposta.style.display = 'none';
    let aposta = document.getElementById('valorApostaAd');
    aposta.innerHTML = apostaFeita;
    aposta = document.getElementById('valorApostaUser');
    aposta.innerHTML = apostaFeita;

    saldoAd -= apostaFeita;

    saldoUser -= apostaFeita;
    

    
    darCartas();
}

function darCartas(){
    maoAdversario.innerText = '';
    maoUsuario.innerText = '';
    let carta;
    for(let c = 0; c < 2; c++){
        switch(c){
            case 0:
                carta = criarCarta(aleatorizar(), [], true);
                maoUsuario.appendChild(carta);
                carta = criarCarta(aleatorizar(), [], true);
                maoUsuario.appendChild(carta);
                break;
            case 1:
                carta = criarCarta(aleatorizar(), ['escondida'], true);
                maoAdversario.appendChild(carta);
                carta = criarCarta(aleatorizar(), [], true);
                maoAdversario.appendChild(carta);
                break;
        }

    }
    contagem(maoAdversario);
    contagem(maoUsuario);
    let main = document.getElementById('prin');
    main.style.pointerEvents = 'all';
}

function aleatorizar(){
    return Math.floor(Math.random() * (cartasPossiveis.length- 1));
}

function criarCarta(escolha, classes, removerCartasPossiveis = false){
    let carta = document.createElement('div');
    valores = cartasPossiveis[escolha];
    carta.id = valores[2];
    carta.classList.add('cartas');
    carta.classList.add(valores[0]);
    for(let c = 0; c < classes.length; c++){
        carta.classList.add(classes[c]);
    }
    carta.innerHTML = valores[1];
    if(removerCartasPossiveis){
        cartasPossiveis.splice(escolha, 1);
    }
    return carta;
}

function add(lugar = 'ad'){
    carta = criarCarta(aleatorizar(), [], true);
    if(lugar == 'mao'){
        maoUsuario.appendChild(carta);
        contagem(maoUsuario);
    }else if(lugar == 'ad'){
        maoAdversario.appendChild(carta);
        contagem(maoAdversario);
    }
}

function contagem(lugar){
    let soma = 0;
    for(let c = 0; c < lugar.children.length; c++){
        if(lugar.children[c].classList[2] != 'escondida'){
            let conteudo = lugar.children[c].innerHTML;
            switch(conteudo){
                case 'A':
                    conteudo = 11;
                    break;
                case 'Q':
                case 'K':
                case 'J':
                    conteudo = 10;
                    break;
            }
            soma += Number(conteudo);
        }
    }
    if(lugar == maoAdversario){
        let saldoCaixa = document.getElementById('saldoAtualAd');
        saldoCaixa.innerHTML = '$'+saldoAd;
        contAd.innerHTML = soma;
        if(Number(contAd.innerHTML) > 21){
            setTimeout(telaFinal, 1000, 'A casa estourou! Você ganhou!', 'user');
        }else if(Number(contAd.innerHTML) == 21){
            setTimeout(telaFinal, 1000, 'A casa fez um Blackjack', 'ad');
        }
    }else{
        contUser.innerHTML = soma;
        let saldoCaixa = document.getElementById('saldoAtualUser');
        saldoCaixa.innerHTML = '$'+saldoUser;
        if(Number(contUser.innerHTML) > 21){
            stop(true);
            setTimeout(telaFinal, 1000, 'Você estourou! A casa ganhou!', 'ad');
        }else if(Number(contUser.innerHTML) == 21){
            stop(true);
            setTimeout(telaFinal, 1000, 'Você fez um Blackjack', 'user');
        }
    }
}

function stop( notAd = false){
    
    let main = document.getElementById('prin');
    main.style.pointerEvents = 'none';
    if(!notAd){
        setTimeout(adversario, 1500);
    }
}

function telaFinal(texto, win, reload = false){
    if(win == 'ad'){
        saldoAd += (apostaFeita*2);
    }else if(win == 'user'){
        saldoUser += (apostaFeita*2);
    }else if(win == 'emp'){
        saldoUser += apostaFeita;
        saldoAd += apostaFeita;

    }
    if(saldoUser <= 0 || saldoUser < minimo){
        alert('Você não tem fichas o suficiente para continuar!',);
        window.location.reload()
    }
    if(saldoAd <= 0 || saldoAd < minimo){
        alert('A casa não tem fichas o suficiente para continuar!');
        window.location.reload()
    }
    let msg = document.getElementById('msg');
    if(reload){
        alert(texto);
        window.location.reload()   
    }else{
        setTimeout(()=>{
            let tela = document.getElementById('telaFinal');
            tela.style.display = 'grid';
            msg.innerHTML = texto;
        }, 500);
    }
    
    
}

function adversario(){
    if(maoAdversario.children[0].classList[2] == 'escondida'){
        maoAdversario.children[0].classList.remove('escondida');
    }
    contagem(maoAdversario);
    
    let contador = 0;
    if((Number(contAd.innerHTML) <= 15) && (Number(contUser.innerHTML) > Number(contAd.innerHTML))){
        let intervalo = setInterval(()=>{
            contador++;
            if(Number(contAd.innerHTML) <= 15 && contador < 5 && Number(contUser.innerHTML >= Number(contAd.innerHTML))){
                add();
            }
            if(contador >= 5 || Number(contUser.innerHTML) <= Number(contAd.innerHTML)){
                setTimeout(()=>{
                    clearInterval(intervalo)
                }, 1500)
            }
        }, 1500);
        setTimeout(final, 1500);
    }else{
        setTimeout(final, 1000);
    }
    
}


function final(){

    if(Number(contAd.innerHTML) <=21 && Number(contUser.innerHTML) <= 21){
        if(Number(contAd.innerHTML) > Number(contUser.innerHTML)){
            setTimeout(telaFinal, 1000, 'A casa ganhou!', 'ad');
        }else if(Number(contAd.innerHTML) < Number(contUser.innerHTML)){
            setTimeout(telaFinal, 1000, 'Você ganhou!', 'user');
        }else{
            setTimeout(telaFinal, 1000, 'Houve um empate!', 'emp');
        }
    }
}

function novoJogo(){
    setTimeout(()=>{
        let tela = document.getElementById('telaFinal');
        tela.style.display = 'none';
        let mont = document.getElementById('montante');
        mont.innerHTML = '$0';
        
        aposta()
    }, 500);
}