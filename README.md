# 21

![GitHub License](https://img.shields.io/github/license/tiagocitrangulodasilva/21)
# Sobre o projeto
Este projeto contém um jogo de 21 (ou Blackjack) que foi feito por mim: Tiago Citrangulo da Silva. É um jogo totalmente jogável em computadores e em celulares.
O jogo tem suas regras baseadas no modo em que alguns cassinos jogam, contendo até um sistema de apostas usando fichas sem valor real.

## Link do jogo
Caso queira jogá-lo, este é o link: https://tiagocitrangulodasilva.github.io/21/

## Tecnologias utilizadas

O projeto foi feito em:

- HTML5
- CSS3
- JavaScript

## Jogo no computador

![Tela de aposta no computador](https://github.com/TiagoCitranguloDaSilva/assets/blob/main/21/printApostaPc.png)
![Tela principal no computador](https://github.com/TiagoCitranguloDaSilva/assets/blob/main/21/printMainPc.png)

## Jogo no celular

![Tela de aposta no celular](https://github.com/TiagoCitranguloDaSilva/assets/blob/main/21/printApostaCell.jpeg) ![Tela principal no celular](https://github.com/TiagoCitranguloDaSilva/assets/blob/main/21/printMainCell.jpeg)

## Como jogar 21

Para jogar 21 é preciso que a soma de suas cartas chegue a 21 ou o mais perto disso sem ultrapassar, durante o jogo você pode decidir pescar mais uma carta ou parar e manter o valor que você já tem (lembrando que caso ultrapasse o valor, você já perde automaticamente).

### Valores de cada carta

Cada carta tem um número ou uma letra sendo os valores:

A = 1 ou 11

2, 3, 4, 5, 6, 7, 8, 9 e 10 = o respectivo número
Q, J e K = 10

* O A só vai valer 11 quando você tiver apenas ele na sua mão e uma carta que vale 10 (10, Q, J ou K), assim já somando 21 (11 + 10 = 21), de resto o A irá valer 1.

## Como jogar esse jogo

Este jogo é dividido em rodadas, toda rodada funciona da seguinte maneira, começe fazendo uma aposta dentro dos valores permitidos, ou seja, acima do mínimo e abaixo do máximo e um valor que a casa consiga pagar.

Na tela de aposta é possível ver o seu saldo e o da casa e também um indicador do valor que você quer apostar chamado montante.

Após selecionar o valor, você clica em apostar, dai então começa o jogo. No jogo você terá 2 cartas inicias e a casa vai ter 2 cartas também, sendo uma virada, caso você não esteja satisfeito com a soma das suas cartas você pode arriscar e pescar mais uma ou parar para que a casa mostre sua carta virada e decida se quer parar ou pescar.

Ganha aquele com a maior soma sem ultrapassar 21, após o vencedor ter sido declarado, o dinheiro apostado vai para o saldo do vencedor e começa uma nova rodada, lembrando que tem que apostar toda vez que começar uma rodada.

### Informações e dicas sobre o jogo

O jogo conta com um sistema de escolha de cartas de forma aleatória onde em cada rodada você pode escolher pescar mais uma carta ou parar e deixar o adversário (o PC) jogar,
além disso, o jogo tem um quadrado alaranjando que fica na esquerda que já faz a soma de suas cartas para que o usuário não tenha que ficar fazendo conta.
O jogo para automaticamente caso você consiga 21 e já lhe dá a vitória, o jogo também para se você ultrapassar 21, mas desta vez ele te dá a derrota, e caso ambos os lados decidam parar (o usuário e o PC) ganha aquele que chegar mais perto de 21.
O sistema de apostas soma valores, ou seja, caso clique na ficha de$ 5 duas vezes, vão ser $10 no total.
Na tela de apostas tem um botão de mais e um de menos:

![Botão mais e menos](https://github.com/TiagoCitranguloDaSilva/assets/blob/main/21/BotaoMaisMenos.png)

Quando o botão de mais estiver selecionado, ao clicar em duas fichas ele irá somar os valores, por exemplo, se clicar duas vezes na ficha de $5 ficará com $10, mas quando estiver com o botão de menos selecionado ao clicar em duas fichas ele irá subtrair o valor, por exemplo, você apostou o valor de $100 e clicou no $5 com o símbolo de menos selecionado, agora você está com $95.

Lembrando que não é possivel apostar mais que o valor máximo e menos que o valor minímo.

