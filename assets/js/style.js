function changeGiscusTheme(theme) {
  function sendMessage(message) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe)
      return;
    iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
  }
  sendMessage({ setConfig: { theme: theme } });
}

function set_style(style) {
  if (style === "light") {
    document.getElementById("sheet_light").removeAttribute('disabled');
    document.getElementById("sheet_dark").disabled = true;
    localStorage.setItem('style_preference', "light");
    changeGiscusTheme("light");
  } else {
    document.getElementById("sheet_dark").removeAttribute('disabled');
    document.getElementById("sheet_light").disabled = true;
    localStorage.setItem('style_preference', "dark");
    changeGiscusTheme("dark");
  }
}

function swap_style() {
  if (document.getElementById("sheet_dark").disabled == true) {
    set_style("dark");
  } else {
    set_style("light");
  }
}

function get_style_preference() {
  var style_preference = localStorage.getItem('style_preference');
  set_style(style_preference);
}

/* vim: set ts=2 sw=2 sts=2: */
