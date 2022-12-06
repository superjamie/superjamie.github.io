---
title: Swap CSS stylesheet with JavaScript
---

I wanted a button to toggle between a light and dark stylesheet for my [dynamic Markdown renderer](https://github.com/superjamie/emdee).

This proved to be a lot more difficult than I expected.

The code to achieve this is:

```html
<html>
 <head>
  <link id="sheet_light" rel="stylesheet" type="text/css" href="light.css" />
  <link id="sheet_dark"  rel="stylesheet" type="text/css" href="dark.css" disabled/>

<script type="text/javascript">
 function swap() {
  if (document.getElementById("sheet_dark").disabled == true) {
   document.getElementById("sheet_dark").removeAttribute('disabled');
   document.getElementById("sheet_light").disabled = true;
  } else {
   document.getElementById("sheet_light").removeAttribute('disabled');
   document.getElementById("sheet_dark").disabled = true;
  }
 }
</script>
</head>
<body>
 <button id="sheet_button" onclick="swap();">&#x1F4A1;</button>
</body>
</html>
```

A few notes on the implementation:

There are other solutions around which suggest to modify the `href` attribute of the link, however this causes a momentary "flicker" the first time the style is swapped, as the browser loads the new stylesheet. This flicker occurred every time I swapped the sheet in Chromium, but not in Firefox.

Using the [disabled property of the link object](https://www.w3schools.com/jsref/prop_link_disabled.asp) avoids this, because the browser loads both stylesheets on page load. Switching between the sheets by toggling the `disabled` property switches between already-loaded stylesheets and avoids the flicker.

Just toggling `disabled` to true/false did work for me, but I found several answers on StackOverflow which say it's better to remove the propertly altogether with `.removeAttribute()`.

Unrelated to this implementation but very annoying to figure out, `document.getElementById("whatever").href` and `document.getElementById("whatever").getAttribute("href")` are **not** the same thing. The former is the full URL including the `http://` onwards, but the attribute is just the file's basename. I only discovered this by using the JavaScript console in Firefox.

Hopefully this pops up in someone's search results and saves them the hours it took me to figure this out.
