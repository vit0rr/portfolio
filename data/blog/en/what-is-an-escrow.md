---
title: What is an escrow
date: '12-06-2021'
tags: ['code', 'learn', 'blockchain', 'solana', 'smart-contract']
draft: false
summary: What is an escrow smart contract in blockchain?
images: https://i.imgur.com/hj2Hg3o.gif
---

<h3>en | [ptBR](/blog/ptBR/oque-e-um-escrow)</h3>

### What is an escrow in blockchain?

Suppose Alice has an asset _A_ and Bob has an asset _B_. They want to trade their assets, but neither has the confidence to send it first, as Alice can receive and not fulfill her sending role, just like Bob can receive and also not send anything. In this sense, it creates an impasse where no one wants to risk sending first.

It usually adds a third party to this exchange, A _C_ that _A_ and _B_ trust. _A and B_ can now send to _C_, and when received, _C_ sends to Alice and Bob, but this method also creates problems as _C_ can tend to one side and still need to trust the third party.

The blockchain's way of accomplishing this is to replace _C_ with code in some blockchain, specifically a smart contract, which acts the same way a third party would. As such, it is superior to having a third party as you don't have to worry if C is more on one side than the other, just check the code's behavior.

### What is a smart contract

A Smart Contract is a program that sits on the blockchain that runs when predetermined conditions are met. In the context of escrow, for example, it can be used to automate this execution of a deal, so you don't waste time relying on an intermediary.
