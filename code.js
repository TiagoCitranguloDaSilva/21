
var cartasPossiveis = [];
var naipes = ['espadas', 'ouro', 'paus', 'copas'];
var maoAdversario = document.getElementById('maoAd');
var maoUsuario = document.getElementById('mao');
var pesca = document.getElementById('pesca');
var contUser = document.getElementById('user');
var contAd = document.getElementById('adver');

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

darCartas();


let carta = document.createElement('div');
carta.classList.add('escondida');
carta.classList.add('cartas');
pesca.appendChild(carta);


contagem(maoAdversario);
contagem(maoUsuario);




function darCartas(){
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
        contAd.innerHTML = soma;
        if(soma > 21){
            alert('A casa estourou!')
        }else if(soma == 21){
            alert('BlackJack');
        }
    }else{
        contUser.innerHTML = soma;
        if(soma > 21){
            alert('Você estourou!')
            stop();
        }else if(soma == 21){
            alert('BlackJack');
        }
    }
}

function stop(){
    let main = document.getElementById('prin');
    main.style.pointerEvents = 'none';
    setTimeout(adversario, 1500);
}

function adversario(){
    maoAdversario.children[0].classList.remove('escondida');
    contagem(maoAdversario);
    let cont = contAd.innerHTML;
    let resto = 21 - cont;
    let conts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for(let c = 0; c < cartasPossiveis.length; c++){
        switch(cartasPossiveis[c][1]){
            case 'A':
                conts[0] += 1;
                break;
            case 2:
                conts[1] += 1;
                break;
            case 3:
                conts[2] += 1;
                break;
            case 4:
                conts[3] += 1;
                break;
            case 5:
                conts[4] += 1;
                break;
            case 6:
                conts[5] += 1;
                break;
            case 7:
                conts[6] += 1;
                break;
            case 8:
                conts[7] += 1;
                break;
            case 9:
                conts[8] += 1;
                break;
            case 10:
                conts[9] += 1;
                break;
            case 'Q':
                conts[10] += 1;
                break;
            case 'J':
                conts[11] += 1;
                break;
            case 'K':
                conts[12] += 1;
                break;
        }
    }
    if(resto >= 11){
        setTimeout(add, 1500);
    }

    setTimeout(final, 1500);

    
}

function final(){
    if(contAd.innerHTML <=21 && contUser.innerHTML <= 21){
        if(contAd.innerHTML > contUser.innerHTML){
            alert('O casa ganhou!');
        }else if(contAd.innerHTML < contUser.innerHTML){
            alert('Você ganhou!');
        }
    }
}