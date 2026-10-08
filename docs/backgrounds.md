# Backgrounds helpers

In addition to the "Reveal.js way" to set a background for a slide (`<!-- .slide: data-background="...." -->`), you can use a new syntax:

```md
![](./assets/images/light_background.jpg 'tc-bg')
```

![](./imgs/background-new.png)

You can also use colors (color name, rgb, hash)

```md
![](red 'tc-bg')
```

![](./imgs/background-new-color.png)

This will preserve classes put on the slide element:

```md
<!-- .slide: class="mask transition" -->

# Use background but preserve meta of reveal (.slide)

![](./assets/images/dark_background.jpeg 'tc-bg')
```

![](./imgs/background-new-preserve.png)

## AVIF images

The `transition` and `mask` styles of TalkControl support `.avif` backgrounds. However, reveal.js does not yet detect the `avif` extension as an image (see [hakimel/reveal.js#3379](https://github.com/hakimel/reveal.js/issues/3379)), so the `tc-bg` shorthand may not render the image.

Until reveal.js handles it, set the background explicitly with the reveal.js attribute:

```md
<!-- .slide: data-background-image="./assets/images/background.avif" -->
```
