---
title: Como os sites detectam janelas anônimas com JavaScript
date: '08-11-2021'
tags: ['javascript', 'code', 'security']
draft: false
summary: Como o Brainly consegue restringir seu acesso baseado na informação de se sua guia é anônima ou não?
images: https://i.imgur.com/1fq8QBf.png
---

### Introdução

Alguns sites conseguem bloquear determinado acesso baseado na informação de guia anônima do usuário. Isso pode ser útil para evitar burlar alguns controles de acessos, como houve com o Brainly. Basicamente, existe um limite para visualização de respostas, e caso esse limite seja alcançado, o site é bloqueado e é necessário assistir anúncios ou pagar. Isso ocorre pois, esse limite é baseado em algum armazenamento local ou com alguma informação baseado na sessão atual, e isso é limpo caso acessado via aba anônima.

Porém, existem formas de contornar isso dependendo do seu navegador ou com alguns hacks.

### Google Chrome

No Google Chrome isso era possível antes do Chrome 76. Depois disso, esse recurso foi eliminado do navegador. Nas versões anteriores, o código era o seguinte:

```javascript
    ...
     if (window.webkitRequestFileSystem) {
	        window.webkitRequestFileSystem(
	            window.TEMPORARY, 1,
	            function() {
	                is_private = false;
	            },
	            function(e) {
	                console.log(e);
	                is_private = true;
	            }
	        );
```

#### window.webkitRequestFileSystem

Esse método é específico do Google Chrome e permite o site obter acesso a um sistema de arquivos sandboxed para próprio uso. NÃO é recomendado utilizar ele atualmente, pois não há suporte nas versões mais recente do Chrome e outros navegadores não tem suporte.

A sintaxe dele é a seguinte:

```javascript
window.requestFileSystem(type, size, successCallback[, errorCallback]);
```

#### Type

É o tipo de armazenamento a ser solicitado. É possível especificar se o navegador pode excluir os arquivos, porém, existe a forma persistente, mas o usuário precisa permitir isso. `Window.TEMPORARY | Window.PERSISTENT`

#### Size

É a quantidade de espaço que deseja alocar para o aplicativo.

#### successCallback

Uma função que é chamada quando o sistema de arquivos foi obtido com sucesso. Como visto no código, caso isso tenha dado certo, ele retorna como 'false' o "is_private".

Ou seja, atualmente não é possível fazer o tipo de tratatamento baseado em guia anônima com Google Chrome, consequentemente, com navegadores baseados no Chromium, como Opera, Microsoft Edge, Brave entre outros.

### Firefox

No Firefox é usando métodos mais gerais, nada específico, como no Chrome. Exemplo:

```javascript
	} else if (window.indexedDB && /Firefox/.test(window.navigator.userAgent)) {
	        var db;
	        try {
	            db = window.indexedDB.open('test');
	        } catch(e) {
	            is_private = true;
	        }

	        if (typeof is_private === 'undefined') {
	            retry(
	                function isDone() {
	                    return db.readyState === 'done' ? true : false;
	                },
	                function next(is_timeout) {
	                    if (!is_timeout) {
	                        is_private = db.result ? false : true;
	                    }
	                }
	            );
	        }
```

#### window.indexedDB

INDEXadoDB é uma maneira de armazenar dados de forma PERSISTENTE em um navegador. Para abrir um banco de dados usando tal recurso, usa-se `var request = window.indexedDB.open("MyDatabase")`;

No código de exemplo, isso está representado em:

```javascript
try {
  db = window.indexedDB.open('test')
} catch (e) {
  is_private = true
}
```

Onde basicamente será testado usando `Try` criar um banco de dados 'test'. E caso der erro, o catch - que só é executada se uma execução for lançada no bloco try - retorna a execessão, que no caso é nevegador privado. O resto é uma simples tratativa usando [ternários](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

#### window.navigator

Essa propriedade retorna um objeto que pode ser consultado para obter informações sobre a aplicação que executa o script.

Exemplo:

> Exemplo retirado da MDN - Window.navigator - onde detecta o navegador e retorna uma string

```javascript
var sBrowser,
  sUsrAg = navigator.userAgent

if (sUsrAg.indexOf('Chrome') > -1) {
  sBrowser = 'Google Chrome'
} else if (sUsrAg.indexOf('Safari') > -1) {
  sBrowser = 'Apple Safari'
} else if (sUsrAg.indexOf('Opera') > -1) {
  sBrowser = 'Opera'
} else if (sUsrAg.indexOf('Firefox') > -1) {
  sBrowser = 'Mozilla Firefox'
} else if (sUsrAg.indexOf('MSIE') > -1) {
  sBrowser = 'Microsoft Internet Explorer'
}

alert('Você está utilizando: ' + sBrowser)
```

### Safari

Aqui é parecido com o FireFox tirando a parte do `window.safariIncognito`. Exemplo:

```javascript
} else if (window.localStorage && /Safari/.test(window.navigator.userAgent)) {

	    // One-off check for weird sports 2.0 polyfill
		// This also impacts iOS Firefox and Chrome (newer versions), apparently
	    // @see bglobe-js/containers/App.js:116
	    if (window.safariIncognito) {
	        is_private = true;
	    } else {
				try {
					window.openDatabase(null, null, null, null);
				} catch (e) {
					is_private = true;
				}

	        try {
		        window.localStorage.setItem('test', 1);
		    } catch(e) {
		        is_private = true;
		    }
	    }

	    if (typeof is_private === 'undefined') {
	        is_private = false;
	        window.localStorage.removeItem('test');
	    }
	}
```

#### window.safariIncognito

No exemplo é bem fácil de reconhecer esse. É utilizado `window.safariIncognito` em um cadeamento if no começo do código. Caso for verdadeiro, retorne `is_private = true`, else -> seguido de algumas tratativas para realização de testes usando `try` e `catch`.

#### Como contornar isso?

A solução de - use o Chrome - não é muito legal, mas é uma. Então caso queira algo simples sem muitas preocupações, faça. Existe uma outra forma de contornar limitações como essas, que seria impedindo a rederização do JavaScript no seu navegador. Existem extenções que façam isso e vou exemplificar o caso com o Firefox.

### Exemplos no Firefox:

#### Sem bloquear JavaScript

Os testes serão feitos com o site do Brainly e no navegador Firefox.
Nesse exemplo, acessei o site na guia anônima do Firefox sem qualquer extensão, e a resposta foi bloqueada.
![Firefox na guia anônima sendo bloqueado](https://raw.githubusercontent.com/vit0rr/portfolio/main/public/static/images/anonFirefoxBlock.png)

#### Bloqueando JavaScript

Agora, caso você impeça a renderização do JavaScript, e para isso basta usar alguma extensão gratuita na Store do Firefox. Também tem como através da proteção total do navegador Tor, mas é como usar uma bazuca contra uma formiga, não há necessidade desse método, mas saiba que existe.

A extensão que recomendo é a [Disable JavaScript](https://github.com/dpacassi/disable-javascript#supported-browsers). Com ela, o resultado foi o seguinte:
![Firefox na guia anônima não sendo bloqueado](https://raw.githubusercontent.com/vit0rr/portfolio/main/public/static/images/anonFirefoxAllow.png)

A visualização fica prejudicada, mas é possível burlar completamente a proteção relacionada a guia anônima e múltiplos acessos.

### Exemplos no Google Chrome:

É bem simples, como explicado tecnicamente no começo desse texto, o Chrome não permite esse tipo de informação. Então, a única detecção que existe para ele é sobre a quantidade de acessos - que é limitada no Brainly. Mas quando ela for atingida, basta fechar a guia anônima atual e abrir uma nova para burlar o limite de qualquer site.

A mesma extensão usada no Firefox também está disponível no Google Chrome, caso queira.

### Fontes

- [Small collection of solutions used to detect private mode](https://gist.github.com/kdzwinel/783df9b129ae5c8443dd96c0d4ed9723)
