---
title: What's is and the difference between State and Event on ReactJS
date: '5-4-2022'
tags: ['Tutorial']
draft: false
summary: Explanning what is and the difference between State and Event on ReactJS
images: /static/images/banners/difference-between-state.jpg
---

![image](/static/images/banners/difference-between-state.jpg)

### The logic inside React components

You need to be familiar with two types of logic:

- Rendering code is what lives on the top of your component. This is where you take the props and state, transform them, and return the JSX that you want to see on screen. [Keep components pure](https://beta-reactjs-org-git-effects-fbopensource.vercel.app/learn/keeping-components-pure). It should only calculate the result, nothing anything else.

- [Event handlers](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers) are functions that do something rather than just calculate them. An event handlers contain [side effects](https://en.wikipedia.org/wiki/Side_effect_(computer_science)#) that can change the program state and are caused by specific user action, like a button click or typing.

But this isn't enough. A ChatRoom, for example, that must connect to the chat server wheever it's visible on the screen. Connecting to a chat server it's a side effect then can't happen during the rendering the component. But, there is no single event like a click or typing that caused ChatRoom to be displayed. And now?

Effects let you specify side effects rendering itself and not by a particular event like click. Send some message in the chat is an event because is directly caused by some user action, like the click on the button or something like that. Setiing up a server is an effect bacause the connection happen with witch interaction that cause the component to appear. It's worth to you know that Effects run at the end of the rendering process after the screen updates. Here is a nice moment to synchronize the React component with some external system like network.