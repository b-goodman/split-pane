import Split from "split.js";
import style from "./index.scss";

enum Direction {
    horizontal = "horizontal",
    vertical = "vertical"
}

export default class SplitPane extends HTMLElement {
    static get observedAttributes() {
        return ["direction", "pane-size"];
    }


    public defaultPaneSize: number[];


    constructor() {
        super();

        const paneElements = Array.from(this.children) as HTMLElement[];

        this.defaultPaneSize = JSON.parse(this.getAttribute("pane-size") || `${new Array(paneElements.length).fill(100/paneElements.length)}`)

        this.childNodes.forEach(node=>this.removeChild(node));

        const template = document.createElement('template');
        template.innerHTML = `
            <style>${style}</style>

            <div id="flex" direction="${this.direction}">
                ${paneElements.map( (el) => {return el.outerHTML} ).join("")}
            </div>
        `;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        this.paneElements = Array.from(shadowRoot.querySelector<HTMLElement>("div#flex")!.children) as HTMLElement[];

        if (!this.getAttribute("direction")) {
            this.setAttribute("direction", this.direction)
        }
    }

    attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
        if (name === "pane-size" && this.split) {
            this.split.setSizes(JSON.parse(newVal));
        }
        if (name === "direction" && _oldVal !== null) {
            if (Object.keys(Direction).includes(newVal)) {
                const wrapper = this.shadowRoot!.querySelector<HTMLElement>("div#flex")!;
                wrapper.setAttribute("direction", newVal);
                wrapper.querySelectorAll("div.gutter").forEach( el => wrapper.removeChild(el) )
                this.initSplit();
            } else {
                this.setAttribute("direction", _oldVal);
                throw new Error(`Attribute 'direction' must be one of: ${Object.keys(Direction).join(",")}`);
            }
        }
    }

    connectedCallback() {
        this.initSplit();
    }

    get direction() {
        return this.getAttribute("direction") as Direction || Direction.horizontal;
    }

    get key() {
        return this.getAttribute("key") || undefined;
    }

    get currentPaneSize() {
        const attr = this.getAttribute("pane-size");
        return attr ? JSON.parse(attr) as number[] : this.defaultPaneSize;
    }

    set currentPaneSize(newPaneSizes: number[]) {
        const paneSizeInt = newPaneSizes.map(Math.floor);
        this.setAttribute("pane-size", JSON.stringify(paneSizeInt))
    }

    public resetPaneSize () {
        if (this.split) {
            this.currentPaneSize = this.defaultPaneSize;
            window.localStorage.setItem(`${window.location.href}-${this.key}`, JSON.stringify(this.defaultPaneSize) );
        }
    }

    // disconnecetdCallback() {}


    private split?: Split.Instance;

    private paneElements: HTMLElement[];

    private initSplit() {
        this.split = Split(
            this.paneElements,
            {
                direction: this.direction,
                sizes: this.loadSessionSizeData() || this.currentPaneSize,
                elementStyle: (_dimension, size, gutterSize) => ({
                    'flex-basis': `calc(${size}% - ${gutterSize}px)`,
                }),
                gutterStyle: (_dimension, gutterSize) => ({
                    'flex-basis':  `${gutterSize}px`,
                }),
                onDragEnd: this.handleDragEnd,
        });
        return this.split;
    }

    private handleDragEnd = () => {
        if (this.split) {
            this.currentPaneSize = this.split.getSizes();
            window.localStorage.setItem(`${window.location.href}-${this.key}`, JSON.stringify( this.currentPaneSize ));
        }
    }

    private loadSessionSizeData () {
        const sessionData = window.localStorage.getItem(`${window.location.href}-${this.key}`) || undefined;
        return sessionData ? JSON.parse(sessionData) as number[] : undefined;
    }

}

window.customElements.define("split-pane", SplitPane);

