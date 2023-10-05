
// Valor mínimo de aposta
var minimo = 10;

// Valor máximo de aposta
var maximo = 500;

// Array que vai receber todas as cartas que entram no jogo
var cartasPossiveis = [];

// Os naipes das cartas
var naipes = ['espadas', 'ouro', 'paus', 'copas'];

// Pega a mão do adversário
var maoAdversario = document.getElementById('maoAd');

// Pega a mão do usuário
var maoUsuario = document.getElementById('mao');

// Pega a área de pesca
var pesca = document.getElementById('pesca');

// Pega o contador de cartas do usuário
var contUser = document.getElementById('user');

// Pega o contador de cartas do adversário
var contAd = document.getElementById('adver');

// Define o valor de aposta inicial como 0
document.getElementById('montante').innerHTML = '$0';

// Coloca o texto de aposta mínima e máxima
document.getElementById('max').innerHTML = 'Aposta máxima: ' + maximo;
document.getElementById('min').innerHTML = 'Aposta mínima: ' + minimo;

// O jogo vai ter 8 baralhos
for(let e = 0; e < 8; e++){

    // Cada baralho tem 4 naipes
    for(let d = 0; d < naipes.length; d++){

        // Cada naipe tem 13 cartas
        for(let c = 1; c <= 13; c++){

            // Se o valor da carta
            switch(c){

                // For 1, o valor vira 'A'
                case 1:
                    valor = 'A';
                    break;

                // For 11, o valor vira 'Q'
                case 11:
                    valor = 'Q';
                    break;

                // For 12, o valor vira 'J'
                case 12:
                    valor = 'J';
                    break;

                // For 13, o valor vira 'K'
                case 13:
                    valor = 'K';
                    break;

                // Senão o valor recebe o valor da variável c
                default:
                    valor = c;
            }

            // Adiciona na array 'cartasPossiveis' uma array com o [naipe da carta, valor da carta, de qual dos 8 baralhos ela é]
            cartasPossiveis.push([naipes[d], valor, e+1]); 

        }
    }
}

// Saldo inicial padrão do usuário
var saldoUser = 1500;

// Saldo inicial padrão do adversário
var saldoAd = 1500;

// Cria a variável para receber as apostas feitas
var apostaFeita;

// Chama a função 'aposta()' para começar as apostas
aposta();

// Uma função que inicia a cadeia de eventos que pega as apostas
function aposta(){

    // Toda vez que inicia a aposta, o botão de adicionar valores é selecionado por padrão
    botaoMais();

    // Toda vez que inicia a aposta, o botão de finalizar a aposta é desativado
    document.getElementById("finalizarAposta").disabled = true;

    // Pega a tela de menu de apostas
    let menuAposta = document.getElementById('aposta');

    // Pega o bloco que mostra o saldo atual do usuário
    let carteiraUser = document.getElementById('valor');

    // Pega o bloco que mostra o saldo atual do adversário
    let carteiraAd = document.getElementById('valorAd');

    // Faz o menu de apostas aparecer
    menuAposta.style.display = 'flex';

    // Mostra o saldo atual do usuário na tela
    carteiraUser.innerHTML = '$'+saldoUser;

    // Mostra o saldo atual do adversário na tela
    carteiraAd.innerHTML = '$'+saldoAd;

}

// Função chamada ao selecionar o botão de acréscimo de aposta
function botaoMais(){

    // Pega o botão que retira apostas
    let botaoMenos = document.getElementById('menos');

    // Se o botão de menos estiver selecionado
    if(botaoMenos.disabled){

        // O botão de menos volta pra cor de não seleção
        botaoMenos.style.backgroundColor = 'blue';

        // O botão de menos deixa de estar selecionado
        botaoMenos.disabled = false;

    }

    // Pega o botão de mais
    let botao = document.getElementById('mais');

    // Muda a cor dele pra cor de seleção
    botao.style.backgroundColor = '#ff9f9f';

    // O botão é selecionado
    botao.disabled = true;

}

// Função chamada ao selecionar o botão de diminuição de aposta
function botaoMenos(){

    // Pega o botão de acréscimo de apostas
    let botaoMais = document.getElementById('mais');

    // Se o botão de mais estiver selecionado
    if(botaoMais.disabled){

        // O botão de mais volta pra cor de não seleção
        botaoMais.style.backgroundColor = 'red';

        // O botão de mais deixa de estar selecionado
        botaoMais.disabled = false;

    }

    // Pega o botão de menos
    let botao = document.getElementById('menos');

    // Muda a cor do botão para a cor de seleção
    botao.style.backgroundColor = '#7b7bff';

    // Seleciona o botão
    botao.disabled = true;

}

// Função ativada ao clicar em uma ficha de valor
function ficha(elemento){

    // Pega o valor da ficha clicada
    let numToAdd = elemento.children[0].children[0].innerHTML.slice(1);

    // Pega o montante, que é uma caixa que guarda o valor da aposta atual
    let mont = document.getElementById('montante');

    // Cria uma variável que vai receber a aposta total
    let total;

    // Se o botão de mais estiver selecionado
    if(document.getElementById('mais').disabled){

        // O total vai ser igual ao valor do montante + o valor da ficha clicada
        total = Number(mont.innerHTML.slice(1)) + Number(numToAdd);

    }else{

        // Se o valor do montante - o valor da ficha selecionada for menor que 0
        if(Number(mont.innerHTML.slice(1)) - Number(numToAdd) < 0){

            // O total é igual a 0
            total = 0;

        }else{

            // O total é igual ao número do montante - o número da ficha selecionada
            total = Number(mont.innerHTML.slice(1)) - Number(numToAdd);

        }   
    }

    // Se o total for maior ou igual ao valor minimo de aposta
    if(total >= minimo){

        // O botão de finalizar a aposta se torna clicável
        document.getElementById("finalizarAposta").disabled = false;

    }else{

        // O botão de finalizar a aposta se torna/continua não clicável
        document.getElementById("finalizarAposta").disabled = true;

    }

    // Se o valor da aposta for maior que o saldo do usuário e menor ou igual ao valor de aposta máximo
    if(total > saldoUser && total <= maximo){

        // O montante vai ser igual ao saldo do usuário
        mont.innerHTML = '$'+saldoUser;

        // A aposta feita vai ser igual ao saldo do usuário
        apostaFeita = saldoUser;

    // Se o valor total for maior que o valor máximo de aposta
    }else if(total > maximo){

        // A aposta feita é igual ao valor máximo
        apostaFeita = maximo;

    // Se o valor total for maior que o saldo do usuário e o valor total for menor ou igual ao valor máximo 
    }else if(total > saldoAd && total <= maximo){

        // O montante é igual ao saldo do adversário
        mont.innerHTML = '$'+saldoAd;

        // A aposta feita é igual ao saldo do adversário
        apostaFeita = saldoAd;

        // O contador do adversário é igual a 0
        contAd.innerHTML = '$0';

    }else{

        // O montante é igual ao valor total
        mont.innerHTML = '$'+total;

        // Aposta feita é igual ao valor total
        apostaFeita = total;

    }
}

// Função que finaliza a aposta, é chamada ao clicar no botão de finalizar
function finalizarAposta(){

    // Pega o menu de apostas
    let menuAposta = document.getElementById('aposta');

    // Faz o menu de apostas desaparecer
    menuAposta.style.display = 'none';

    // Pega o quadrado que mostra as apostas feita do adversário
    let aposta = document.getElementById('valorApostaAd');

    // Coloca o valor dele como o valor da nova aposta
    aposta.innerHTML = apostaFeita;

    // Pega o quadrado que mostra as apostas feita do usuário
    aposta = document.getElementById('valorApostaUser');

    // Coloca o valor dele como o valor da nova aposta
    aposta.innerHTML = apostaFeita;

    // Retira o valor da aposta do saldo do adversário
    saldoAd -= apostaFeita;

    // Retira o valor da aposta do saldo do usuário
    saldoUser -= apostaFeita;
    
    // Começar o jogo de verdade, da as cartas usadas no jogo
    darCartas();

}

// Função que da as cartas logo no ínicio do jogo
function darCartas(){

    // Apaga todas as cartas da mão do adversário
    maoAdversario.innerText = '';

    // Apaga todas as cartas da mão do usuário
    maoUsuario.innerText = '';

    // Cria uma variável que vai receber a carta que irá ser criada
    let carta;

    // Um for que roda 2 vezes porque quando se inicia o jogo, cada um começa com 2 cartas
    for(let c = 0; c < 2; c++){

        // Se o valor do for
        switch(c){

            // Se o valor for 0
            case 0:

                // Cria uma carta com valores vindo da função 'aleatorizar()', sem classes extras e que remova o valor das 'cartasPossiveis' 
                carta = criarCarta(aleatorizar(), [], true);

                // Põe a carta na mão do usuário
                maoUsuario.appendChild(carta);
                
                // Cria uma carta com valores vindo da função 'aleatorizar()', sem classes extras e que remova o valor das 'cartasPossiveis' 
                carta = criarCarta(aleatorizar(), [], true);

                // Põe a carta na mão do usuário
                maoUsuario.appendChild(carta);

                // Vai para a próxima rotação do FOR
                break;

            // Se o valor for 1
            case 1:

                // Cria uma carta com valores vindo da função 'aleatorizar()', com a classe extra 'escondida' e que remova o valor das 'cartasPossiveis' 
                carta = criarCarta(aleatorizar(), ['escondida'], true);

                // Põe a carta na mão do adversário
                maoAdversario.appendChild(carta);
                
                // Cria uma carta com valores vindo da função 'aleatorizar()', sem classes extras e que remova o valor das 'cartasPossiveis' 
                carta = criarCarta(aleatorizar(), [], true);

                // Põe a carta na mão do adversário
                maoAdversario.appendChild(carta);

                // Vai para a próxima rotação do FOR
                break;

        }

    }

    // Atualiza a contagem de valores da mão do adversário
    contagem(maoAdversario);
    
    // Atualiza a contagem de valores da mão do usuário
    contagem(maoUsuario);

    if(Number(contUser.innerHTML) == 21){
        stop(true)
    }

    // Pega a tela inteira
    let main = document.getElementById('prin');

    // Deixa o mouse interagir com a tela toda
    main.style.pointerEvents = 'all';

}

// Função que retorna um item aleatório da array 'cartasPossiveis'
function aleatorizar(){

    // Retorna o valor
    return Math.floor(Math.random() * (cartasPossiveis.length- 1));

}

// Função que cria uma carta, nela você passa os valores, as classes extras e se deve remover os valores da array de 'cartasPossiveis'
function criarCarta(escolha, classes, removerCartasPossiveis = false){

    // Cria uma carta
    let carta = document.createElement('div');

    // Pega os valores passados
    valores = cartasPossiveis[escolha];

    // Coloca o número do baralho como id 
    carta.id = valores[2];

    // Adiciona a classe 'cartas' na carta
    carta.classList.add('cartas');

    // adiciona o naipe da carta como classe
    carta.classList.add(valores[0]);

    // Pra cada classe extra passada
    for(let c = 0; c < classes.length; c++){

        // Adiciona a classe extra na carta
        carta.classList.add(classes[c]);

    }

    // Escreve o valor da carta nela
    carta.innerHTML = valores[1];

    // Se for pra remover das 'cartasPossiveis'
    if(removerCartasPossiveis){

        // Ele remove
        cartasPossiveis.splice(escolha, 1);

    }

    // Retorna a carta
    return carta;

}

// Função que atualiza a contagem de valores e algumas outras coisas
function contagem(lugar){

    // Cria a variável com o valor base como 0
    let soma = 0;

    // Pra cada carta no lugar escolhido
    for(let c = 0; c < lugar.children.length; c++){

        // Se a carta sendo checada não estiver escondida
        if(lugar.children[c].classList[2] != 'escondida'){

            // Pega o valor da carta
            let conteudo = lugar.children[c].innerHTML;

            // Cria uma variável que receberá os valores da soma
            let valor;

            // Se o 'conteudo'
            switch(conteudo){

                // Se for 'A'
                case 'A':

                    // O valor é 11 
                    valor = 11;
                    break;

                // Se for 'Q', 'J' ou 'K'
                case 'Q':
                case 'K':
                case 'J':

                    // O valor é 10
                    valor = 10;
                    break;

                // De resto
                default:

                    //  O valor é igual ao conteúdo
                    valor = conteudo;

            }

            // Vai somar o valor na variável 'soma'
            soma += Number(valor);

        }
    }

    // Se o lugar escolhido for a mão do adversário
    if(lugar == maoAdversario){

        // Pega a caixa do saldo atual do adversário
        let saldoCaixa = document.getElementById('saldoAtualAd');

        // Coloca o valor do saldo na caixa do saldo atual do adversário
        saldoCaixa.innerHTML = '$'+saldoAd;

        // Atualiza a contagem do contador do adversário
        contAd.innerHTML = soma;

        // Se o contador do adversário for maior que 21
        if(Number(contAd.innerHTML) > 21){

            // Chama a tela final em 1 segundo, passa a mensagem como parâmetro e fala que o 'user' que ganhou
            setTimeout(telaFinal, 1000, 'A casa estourou! Você ganhou!', 'user');

        // Se o contador do adversário for igual a 21
        }else if(Number(contAd.innerHTML) == 21){

            // Chama a tela final em 1 segundo, passa a mensagem e fala que quem ganhou é o 'ad' 
            setTimeout(telaFinal, 1000, 'A casa fez um Blackjack', 'ad');

        }
    }else{

        // Atualiza o contador do usuário
        contUser.innerHTML = soma;

        // Pega a caixa do saldo atual do usuário
        let saldoCaixa = document.getElementById('saldoAtualUser');

        // Coloca o saldo do usuário na caixa
        saldoCaixa.innerHTML = '$'+saldoUser;

        // Se o contador do usuário for maior que 21
        if(Number(contUser.innerHTML) > 21){

            // Para o jogo
            stop(true);

            // Chama a tela final depois de 1 segundo, passa a mensagem e fala que o 'ad' ganhou
            setTimeout(telaFinal, 1000, 'Você estourou! A casa ganhou!', 'ad');

        // Se o contador do usuário for igual a 21
        }else if(Number(contUser.innerHTML) == 21){

            // Para o jogo
            stop(true);

            // Chama a tela final depois de 1 segundo, passa a mensagem e fala que quem ganhou é o 'user'
            setTimeout(telaFinal, 1000, 'Você fez um Blackjack', 'user');

        }
    }
}

// Função chamada depois que o usuário apertar botão 'Parar' ou não poder mais jogar
function stop( notAd = false){
    
    // Pega a tela inteira
    let main = document.getElementById('prin');

    // Tira a possibilidade de interagir com a tela
    main.style.pointerEvents = 'none';

    // Se for o usuário que tiver parado de jogar
    if(!notAd){

        // Fala pro adversário jogar depois de um segundo e meio
        setTimeout(adversario, 1500);

    }
}

// Função em que o adversário joga
function adversario(){

    // Se a primeira carta do adversário estiver esondida
    if(maoAdversario.children[0].classList[2] == 'escondida'){

        // Faz a carta aparecer
        maoAdversario.children[0].classList.remove('escondida');

    }

    // Atualiza a contagem do adversário
    contagem(maoAdversario);

    // Cria um contador e inicia o valor dele como 0
    let contador = 0;

    // Se a contagem do adversário for menor ou igual a 15 e o contador do usuário for maior que o do adversário
    if((Number(contAd.innerHTML) <= 15) && (Number(contUser.innerHTML) > Number(contAd.innerHTML))){

        // Começa um intervalo de repetição
        let intervalo = setInterval(()=>{

            // Adiciona 1 ao contador
            contador++;

            // Se a contagem do adversário for menor ou igual a 15 e o contador do usuário for maior que o do adversário
            if(Number(contAd.innerHTML) <= 15 && contador <= 5 && Number(contUser.innerHTML >= Number(contAd.innerHTML))){

                // Da uma carta ao adversário
                adicionar('ad');

            }
            // Se o contador for maior ou igual a 5 ou o contador do usuário for menor ou igual ao contador do adversário
            if(contador > 5 || Number(contUser.innerHTML) <= Number(contAd.innerHTML)){
                // Chama a função final
                clearInterval(intervalo)
                final()
            }
        }, 1500);

        

    }else{

        // Chama a função final depois de 1 segundo
        setTimeout(final, 1500);

    }
}

// Função que adiciona cartas em algum lugar
function adicionar(lugar){

    // guarda uma carta crida por um valor aleatório, sem classes extras e que tira a carta das cartas possiveis
    carta = criarCarta(aleatorizar(), [], true);

    // Se o lugar que você quer adicionar a carta é o usuário
    if(lugar == 'mao'){

        // Adiciona a carta no usuário
        maoUsuario.appendChild(carta);

        // Atualiza o contador do usuário
        contagem(maoUsuario);

    // Se o lugar que você quer adicionar a carta é o adversário
    }else if(lugar == 'ad'){

        // Adiciona a carta no adversário
        maoAdversario.appendChild(carta);

        // Atualiza a contagem do adversário
        contagem(maoAdversario);

    }
}

// Uma função chamada ao terminar o jogo, uma 'tela final', que recebe uma mensagem, o vencedor e se deve recarregar a página
function telaFinal(texto, win, reload = false){

    // Se o adversário ganhou
    if(win == 'ad'){

        // O adversário ganha o dinheiro da aposta
        saldoAd += (apostaFeita*2);

    // Se o usuário ganhar
    }else if(win == 'user'){

        // O usuário ganha o dinheiro da aposta
        saldoUser += (apostaFeita*2);

    // Se der empate
    }else if(win == 'emp'){

        // Todos recebem seu dinheiro de volta
        saldoUser += apostaFeita;

        // Todos recebem seu dinheiro de volta
        saldoAd += apostaFeita;

    }

    // Se o usuário não tiver dinheiro o suficiente pra continuar jogando
    if(saldoUser <= 0 || saldoUser < minimo){

        // Avisa que o usuário não pode continuar
        alert('Você não tem fichas o suficiente para continuar!');

        // Recarrega a página
        window.location.reload();

    }

    // Se o adversário não tiver dinheiro para continuar jogando
    if(saldoAd <= 0 || saldoAd < minimo){

        // Avisa que a casa não pode continuar
        alert('A casa não tem fichas o suficiente para continuar!');

        // Recarrega a página
        window.location.reload();

    }

    // Pega a caixa que vai receber a mensagem de vitória ou derrota
    let msg = document.getElementById('msg');

    // Se for pra recarregar a página
    if(reload){

        // Mostra a mensagem
        alert(texto);

        // Recarrega a página
        window.location.reload();

    }else{

        // Espera um tempinho
        setTimeout(()=>{

            // Pega a tela final
            let tela = document.getElementById('telaFinal');

            // Faz ela aparecer
            tela.style.display = 'grid';

            // Coloca a mensagem na tela final
            msg.innerHTML = texto;

        }, 500);
    }
}

// Função chamada para ver se a rodada acabou ou se deve continuar
function final(){

    // Se o contador do adversário for menor ou  igual a 21 e contador do usuário for menor ou igual a 21
    if(Number(contAd.innerHTML) <=21 && Number(contUser.innerHTML) <= 21){

        // Se o contador do adversário for maior que o contador do usuário
        if(Number(contAd.innerHTML) > Number(contUser.innerHTML) && Number(contAd.innerHTML) != 21){

            // Chama a tela final, depois de 1 segundo, dizendo que o adversário ganhou e tem a casa como vencedora
            setTimeout(telaFinal, 1000, 'A casa ganhou!', 'ad');

        // Se o contador do adversário for menor que o contador do usuário
        }else if(Number(contAd.innerHTML) < Number(contUser.innerHTML)){

            // Chama a tela final, depois de 1 segundo, dizendo que o usuário ganhou e tem o usuário como vencedor
            setTimeout(telaFinal, 1000, 'Você ganhou!', 'user');
        }else if(Number(contAd.innerHTML) == Number(contUser.innerHTML)){

            // Chama a tela final, depois de 1 segundo, dizendo que o ninguem ganhou e teve um empate
            setTimeout(telaFinal, 1000, 'Houve um empate!', 'emp');

        }
    }
}

// Função chamada ao clicar em 'Próxima rodada'
function novoJogo(){

    // Espera um tempinho
    setTimeout(()=>{

        // Pega a tela final
        let tela = document.getElementById('telaFinal');

        // Faz a tela final sumir
        tela.style.display = 'none';

        // Pega o montante de aposta
        let mont = document.getElementById('montante');

        // Zera o montante
        mont.innerHTML = '$0';
        
        // Chama a função pra pegar as apostas
        aposta();
        
    }, 500);
}