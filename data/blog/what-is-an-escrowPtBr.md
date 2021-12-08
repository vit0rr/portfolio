---
title: Construindo um  escrow program - O que é um escrow
date: '12-06-2021'
tags: ['code', 'learn', 'blockchain', 'solana', 'smart-contract']
draft: true
summary: O que é um escrow smart contract numa blockchain?
images: https://i.imgur.com/hj2Hg3o.gif
---

<h2>pt-br | [en](/blog/what-is-an-escrow)</h2>

### O que é um escrow numa blockchain?

Suponha que Alice que um ativo A e Bob tem um ativo B. Eles querem negociar seus ativos, mas nenhum dos dois tem a confiança dee realizar a o envio primeiro, pois Alice pode receber e não cumprir com o seu papel de enviar, assim como Bob pode receber e também não enviar nada. Nesse sentido, cria uma impasse onde ninguém quer correr o risco de enviar primeiro.

Normalmente adiciona um terceiro nessa troca, Um C no qual A e B confiem. A e B agora podem enviar para C, e quando recebido, C envia para Alice e para Bob, mas esse método também cria problemas, pois o C pode tender para algum dos lados, precisando ainda confiar nesse terceiro.

A forma da blockchain realizar isso é substituir o C por um código em alguma blockchain, mais especificamente um contrato inteligente, que atua da mesma forma que um terceiro atuaria. Dessa forma, ele é superior a ter de fato um terceiro pois você não precisa se preocupar se o C está mais do lado de um que do outro, basta verificar o comportamento do código.

### O que é um contrato inteligente

Um Smart Contract é um programa que fica na blockchain que roda quando condições predeterminadas são atendidas. No contexto do escrow por exemplo, ele pode ser usados para automatizar essa execução de um acordo, fazendo com que você não perca tempo confiando num intermediário.
