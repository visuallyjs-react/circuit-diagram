
import {
    DiagramComponent,
    DiagramProvider,
    DiagramPaletteComponent,
    ExportControlsComponent, ControlsComponent
} from "@visuallyjs/browser-ui-react";
import diagramOptions from "./diagram-options.ts"
import Inspector from "./Inspector";

function App({url}) {

    return <div className="vjs-cd-main">
        <DiagramProvider>
            <div className="vjs-cd-palette-wrapper">
                <ControlsComponent/>
                <DiagramPaletteComponent showLabels={true}
                                         iconSize={{width:120,height:80}}
                                         allowDropOnEdge={true}
                                         autoEdgeConnect={true}/>
            </div>
            <DiagramComponent style={{flexGrow:1}}
                              options={diagramOptions}
                              url={url}/>
            <Inspector/>

            <ExportControlsComponent/>
        </DiagramProvider>
    </div>
}

export default App
