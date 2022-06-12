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

_Code examples are imported from [here](https://beta-reactjs-org-git-effects-fbopensource.vercel.app/learn/synchronizing-with-effects#what-are-effects-and-how-are-they-different-from-events)._

You need to be familiar with two types of logic:

- Rendering code is what lives on the top of your component. This is where you take the props and state, transform them, and return the JSX that you want to see on screen. [Keep components pure](https://beta-reactjs-org-git-effects-fbopensource.vercel.app/learn/keeping-components-pure). It should only calculate the result, nothing anything else.

- [Event handlers](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers) are functions that do something rather than just calculate them. An event handlers contain [side effects](https://en.wikipedia.org/wiki/Side_effect_(computer_science)#) that can change the program state and are caused by specific user action, like a button click or typing.

But this isn't enough. A ChatRoom, for example, that must connect to the chat server wheever it's visible on the screen. Connecting to a chat server it's a side effect then can't happen during the rendering the component. But, there is no single event like a click or typing that caused ChatRoom to be displayed. And now?

Effects let you specify side effects rendering itself and not by a particular event like click. Send some message in the chat is an event because is directly caused by some user action, like the click on the button or something like that. Setiing up a server is an effect bacause the connection happen with witch interaction that cause the component to appear. It's worth to you know that Effects run at the end of the [rendering process](https://beta-reactjs-org-git-effects-fbopensource.vercel.app/learn/render-and-commit) after the screen updates. Here is a nice moment to synchronize the React component with some external system like network.

## Maybe you don't need an effect

Don't run to add effects to your components. Effects are used to "step out" of your code and sync with some external system. If your effect only adjust some state based on other state, maybe you don't need an effect.

## How to write an effect

1. Declare and effect
2. Specify the effect dependencies
3. Add cleanup or stop if needed

## 1: Declare an effect

First of all you you need to import the useEffect hook in your React component:

```js
import { useEffect } from 'react';
```

At in the top level of your component, call it and put some code inside your effect:

```js
function MyComponent(){
    useEffect(() => {
        // Code
    });
    return <div />;
}
```

Every time the component `MyComponent` render, React will update the screen _and then_ run the code inside of useEffect. **The code inside effect only will run after React load the component**.

Now let's see how to use effect with some external system. Consider a React componente named `<VideoPlayer>` that have a prop isPlaying.

```js
<VideoPlayer isPlaying={isPlaying} />;
```

The component VideoPlayer renders a built-in browser `<video>` tag:

```js
function VideoPlayer({src, isPlaying}) {
    return <video src={src} >;
}
```

The `<video>` tag does not have an `isPlaying` prop. `play()` and `pause()` method looks the only way to control it. We need to synchronize the value of `isPlaying` prop. You need to synchronize the value of `isPlaying` prop, which tells whether the video should currently be playing, with imperative calls like play() or pause().