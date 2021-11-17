---
title: Quando usar onClick e onChange com JavaScript?
date: '11-17-2021'
tags: ['tech lead', 'code', 'learn', 'work']
draft: true
summary: Quando usar os os eventos onClick e onChange com JavaScript e não errar na hora de criar um select
---

Recentemente tive que lidar com um bug no qual nunca tinha visto antes.
O sistema era o seguinte: 
- Era um select com 10x opções
- A cada opção, deveria exibir dinamicamente uma imagem baseado nessa opção
- Um botão que recupera todos esses valores e passa para o backend

Não vou entrar no mérito sobre como funcionou 100% disso, fazia parte de uma das tasks da empresa, então nem posso contar muita coisa - apenas o front.
Para isso, eu desenvolvi e testei primeiramente no computador meu código. O HTMl era o seguinte:
```html
<select id="cartoesSelect" class="form-select" aria-label="Default select example" onclick='getCardSelect()'>
    <option id="card_evilHazard" value="1" selected>Cartão Evil Hazard</option>
    <option id="card_itensResidentEvil" value="2">Cartão Itens Resident Evil</option>
    <option id="card_residentEvil2" value="3">Cartão Resident Evil 2</option>
    <option id="card_residentEvil3" value="4">Cartão Resident Evil 3</option>
    <option id="card_starsFerrugem" value="5">Cartão S.T.A.R.S Ferrugem</option>
    <option id="card_starsManchaDeSangue" value="6">Cartão S.T.A.R.S Mancha de Sangue</option>
    <option id="card_umbrellaCorp" value="7">Cartão Umbrella Corp</option>
    <option id="card_umbrella" value="8">Cartão Umbrella</option>
    <option id="card_zombie" value="9">Cartão Zombie</option>
    <option id="card_zombieGrade" value="10">Cartão Zombie Grade</option>
</select>
```
A função `getCardSelect()` executa baseada no evento de clique do elemento `select`. Com isso, *no computador*, funcionava perfeitamente, tu clicava no select, selecionava a opção que queria e exibia dinamicamente de forma esperada o cartão da opção. 

O JavaScript para isso, era o seguinte:
```javascript
function getCardSelect(){
    window.opcao = 1
    
    if(document.getElementById('card_evilHazard').selected){
        /* console.log('aa') */
        document.getElementById('imagemCard').innerHTML = '<img src="~/base/assets/img/cartoes/cartao_1.png" alt="" width="220px">';
        window.opcao = 1
    }
    
    else if(document.getElementById('card_itensResidentEvil').selected){
        /* console.log('bb') */
        document.getElementById('imagemCard').innerHTML = '<img src="~/base/assets/img/cartoes/cartao_2.png" alt="" width="220px">';
        window.opcao = 2
    } else if (document.getElementById('card_residentEvil2').selected){
        /* console.log('cc') */
        document.getElementById('imagemCard').innerHTML = '<img src="~/base/assets/img/cartoes/cartao_3.png" alt="" width="220px">';
        window.opcao = 3
    } else if (document.getElementById('card_residentEvil3').selected){
        /* console.log('dd') */
        document.getElementById('imagemCard').innerHTML = '<img src="~/base/assets/img/cartoes/cartao_4.png" alt="" width="220px">';
        window.opcao = 4
    } else if (document.getElementById('card_starsFerrugem').selected){
        /* console.log('ee') */
        document.getElementById('imagemCard').innerHTML = '<img src="~/base/assets/img/cartoes/cartao_5.png" alt="" width="220px">';
        window.opcao = 5
    } else if (document.getElementById('card_starsManchaDeSangue').selected){
        /* console.log('ff') */
        document.getElementById('imagemCard').innerHTML = '<img src="~/base/assets/img/cartoes/cartao_6.png" alt="" width="220px">';
        window.opcao = 6
    } else if (document.getElementById('card_umbrellaCorp').selected){
        /* console.log('gg') */
        document.getElementById('imagemCard').innerHTML = '<img src="~/base/assets/img/cartoes/cartao_8.png" alt="" width="220px">';
        window.opcao = 7
    } else if (document.getElementById('card_umbrella').selected){
        /* console.log('hh') */
        document.getElementById('imagemCard').innerHTML = '<img src="~/base/assets/img/cartoes/cartao_7.png" alt="" width="220px">';
        window.opcao = 8
    } else if (document.getElementById('card_zombie').selected){ 
        /* console.log('ii') */
        document.getElementById('imagemCard').innerHTML = '<img src="~/base/assets/img/cartoes/cartao_9.png" alt="" width="220px">';
        window.opcao = 9
    } else if (document.getElementById('card_zombieGrade').selected){
        /* console.log('jj') */
        document.getElementById('imagemCard').innerHTML = '<img src="~/base/assets/img/cartoes/cartao_10.png" alt="" width="220px">';
        window.opcao = 10
    } else  {
        window.opcao = 1
    }

}

function defaultValue(){
    if(window.opcao === undefined) {
       window.location.href = `~/pagseguro/newCredito?p=1`; 
       
    } else {
       window.location.href = `~/pagseguro/newCredito?p=${window.opcao}`;
       
    }
}
```

Atualmente eu tenho noção dos erros que cometi nesse código. Eu os mantive no exemplo para, além de expor o que de fato tinha feito quando escrevi, deixar marcado que preciso fazer um novo post aqui reescrevendo esse código de forma mais inteligente e elegante.

Explicando, eu pegava por ID as opções, verificava se estavam selecionadas e coloca uma ação para caso isso seja verdadeiro, caso contrário, ele repetia isso para todos os outros ID's (sim, eu sei que isso foi horrível).
O problema era com mobile. O evento onClick()