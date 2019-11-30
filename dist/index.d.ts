declare enum Direction {
    horizontal = "horizontal",
    vertical = "vertical"
}
declare class SplitPane extends HTMLElement {
    static get observedAttributes(): string[];
    defaultPaneSize: number[];
    constructor();
    attributeChangedCallback(name: string, _oldVal: string, newVal: string): void;
    connectedCallback(): void;
    get direction(): Direction;
    get key(): string | undefined;
    get currentPaneSize(): number[];
    set currentPaneSize(newPaneSizes: number[]);
    resetPaneSize(): void;
    private split?;
    private paneElements;
    private initSplit;
    private handleDragEnd;
    private loadSessionSizeData;
}

export default SplitPane;
