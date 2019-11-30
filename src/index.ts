import style from "./index.scss";

export default class SplitPane extends HTMLElement {
    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = `
            <style>${style}</style>
        `;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // attributeChangedCallback(name: string, _oldVal: string, newVal: string) {}

    // connectedCallback() {}

    // disconnecetdCallback() {}

}

window.customElements.define("split-pane", SplitPane);

