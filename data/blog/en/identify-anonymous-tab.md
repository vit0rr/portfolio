---
title: How websites detect anonymous tab with JavaScript
date: '08-11-2021'
tags: ['javascript', 'code', 'security']
draft: false
summary: How does Brainly manage to restrict your access based on whether your tab is anonymous or not?
images: https://i.imgur.com/1fq8QBf.png
---

<h3>en | [ptBR](/blog/ptBR/identify-anonymous-tabPtBr)</h3>

### Introduction

Some websites are able to block certain access based on the user's anonymous guide information. This can be useful to avoid bypassing some access controls, like with Brainly. Basically, there is a limit for viewing responses, and if this limit is reached, the site is blocked and you have to watch ads or pay. This is because, this limit is based on some local storage or with some information based on the current session, and this is cleared if accessed via an anonymous tab.

However, there are ways around this depending on your browser or with some hacks.

### Google Chrome

In Google Chrome this was possible before Chrome 76. After that, this feature was eliminated from the browser. In previous versions, the code was as follows:

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

This method is specific to Google Chrome and allows the website to gain access to a sandboxed file system for its own use. It is NOT recommended to use it currently as it is not supported in the latest versions of Chrome and other browsers are not supported.

Its syntax is as follows:

```javascript
window.requestFileSystem(type, size, successCallback[, errorCallback]);
```

#### Type

It is the type of storage to be requested. It is possible to specify if the browser can delete the files, however, the persistent form exists, but the user needs to allow this. `Window.TEMPORARY | Window.PERSISTENT`

#### Size

It is the amount of space you want to allocate to the application.

#### successCallback

A function that is called when the file system has been successfully fetched. As seen in the code, if this works, it returns as 'false' the "is_private".

In other words, it is currently not possible to do the anonymous guide-based type of treatment with Google Chrome, consequently, with Chromium-based browsers such as Opera, Microsoft Edge, Brave and others.

### Firefox

In Firefox it's using more general methods, nothing specific, like in Chrome. Example:

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

INDEXadoDB is a way to PERSISTENTLY store data in a browser. To open a database using this feature, use `var request = window.indexedDB.open("MyDatabase")`;

In the example code, this is represented in:

```javascript
try {
  db = window.indexedDB.open('test')
} catch (e) {
  is_private = true
}
```

Where it will basically be tested using `Try` to create a 'test' database. And in case of error, the catch - which is only executed if an execution is launched in the try block - returns the exception, which in this case is a private browser. The rest is a simple deal using [ternary](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

#### window.navigator

This property returns an object that can be queried for information about the application executing the script.

Example:

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

Here it is similar to FireFox except for the part of `window.safariIncognito`. Example:

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

In the example it's pretty easy to recognize this one. `window.safariIncognito` is used in an if string at the beginning of the code. If it's true, return `is_private = true`, else -> followed by a few tests for doing tests using `try` and `catch`.

#### How to get around this?

The solution - use Chrome - isn't very cool, but it is one. So if you want something simple without a lot of worries, do it. There is another way to work around limitations like these, which would be to prevent JavaScript from being re-rendered in your browser. There are extensions that do this and I'll illustrate the case with Firefox.

### Examples in Firefox:

#### Not blocking JavaScript

The tests will be done with the Brainly website and in the Firefox browser.
In this example, I accessed the site from the anonymous Firefox tab without any extensions, and the response was blocked.
![Firefox na guia anônima sendo bloqueado](https://raw.githubusercontent.com/vit0rr/portfolio/main/public/static/images/anonFirefoxBlock.png)

#### Blocking JavaScript

Now, in case you prevent JavaScript rendering, and for that just use some free extension on the Firefox Store. It's also like through the full protection of the Tor browser, but it's like using a bazooka against an ant, there's no need for this method, but be aware that it exists.

The extension I recommend is the [Disable JavaScript](https://github.com/dpacassi/disable-javascript#supported-browsers). With it, the result was the following:
![Firefox na guia anônima não sendo bloqueado](https://raw.githubusercontent.com/vit0rr/portfolio/main/public/static/images/anonFirefoxAllow.png)

Viewing is impaired, but it is possible to completely bypass the protection related to anonymous tab and multiple access.

### Examples in Google Chrome:

It's quite simple, as explained technically at the beginning of this text, Chrome does not allow this type of information. So the only detection there is for it is the amount of hits - which is limited in Brainly. But when it's reached, just close the current anonymous tab and open a new one to bypass any site's limit.

The same extension used in Firefox is also available in Google Chrome, if you like.

### Sources

- [Small collection of solutions used to detect private mode](https://gist.github.com/kdzwinel/783df9b129ae5c8443dd96c0d4ed9723)
