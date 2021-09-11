const template = document.createElement('template');

template.innerHTML = `
<link type="text/css" href="../web/css/animation.css" rel="stylesheet"/>
<div id="view3d" style="height:100%; width:100%"></div>
`;

export default class WebotsAnimation extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));

    let script = document.createElement('script');
    script.textContent = `var Module = [];
        Module['locateFile'] = function(path, prefix) {

        // if it's a data file, use a custom dir
        if (path.endsWith(".data"))
          return "../web/" + path;

        // otherwise, use the default, the prefix (JS file's dir) + the path
        return prefix + path;
      }`;
    document.head.appendChild(script);

    this._init();
  }

  _load(scriptUrl) {
    return new Promise(function(resolve, reject) {
      let script = document.createElement('script');
      script.onload = resolve;
      script.src = scriptUrl;
      document.head.appendChild(script);
    });
  }

  async _init() {
    let promises = [];
    promises.push(this._load('../web/glm-js.min.js'));
    promises.push(this._load('../web/enum.js'));
    promises.push(this._load('../web/wrenjs.js'));

    await Promise.all(promises);
    let script = document.createElement('script');
    script.src = '../web/init_animation.js';
    script.type = 'module';
    document.head.appendChild(script);
  }
}

window.customElements.define('webots-animation', WebotsAnimation);
