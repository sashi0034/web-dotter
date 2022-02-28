import React, { KeyboardEvent } from "react";
import {DeliveryData} from "../deliveryData"
import "./LayerFrameTable.css";

class LayerSetting
{
    constructor(
        public name: string
    ){};

    public static getInitLayerSettings(): LayerSetting[]
    {
        let layer: LayerSetting = new LayerSetting("レイヤー1");
        return [layer];
    }
}


interface IlayerFrameTableProps
{
    deliveryData: DeliveryData;
}
interface ILayerFrameTableState
{
    layerSettings: LayerSetting[];
    layerNum: number;
    frameNum: number;
    curLayer: number;
    curFrame: number;
    layerStyle: {[tag: string]: string}[],
    frameStyle: {[tag: string]: string}[],
}

export class LayerFrameTable extends React.Component<IlayerFrameTableProps, ILayerFrameTableState>
{
    constructor(props: IlayerFrameTableProps)
    {  
        super(props);

        this.state = {
            layerSettings: LayerSetting.getInitLayerSettings(),
            layerNum: 1,
            frameNum: 1,
            curLayer: 0,
            curFrame: 0,
            layerStyle: [{}],
            frameStyle: [{}],
        };
        this.initButtonEvent();
    }
    public override componentDidMount()
    {
        this.updateStyle(this.state.layerNum, this.state.frameNum, 0, 0);
    }

    private initButtonEvent()
    {
        document.addEventListener("keydown", (e: globalThis.KeyboardEvent)=>{
            console.log(e);
            if (e.shiftKey===true && e.key.toUpperCase()==='N')
            {
                this.addNewLayer();
            }
            if (e.altKey===true && e.key.toUpperCase()==='N')
            {
                this.addNewFrame();
            }

        });
    }
    private addNewLayer()
    {
        let settings = this.state.layerSettings;
        settings.push(new LayerSetting("レイヤー"+(this.state.layerNum+1)));

        this.setState({layerSettings: settings});
        this.updateStyle(this.state.layerNum+1, this.state.frameNum, this.state.curLayer, this.state.curFrame);
        this.setState({layerNum: this.state.layerNum+1});
    }
    private addNewFrame()
    {
        this.updateStyle(this.state.layerNum, this.state.frameNum+1, this.state.curLayer, this.state.curFrame);
        this.setState({frameNum: this.state.frameNum+1});
    }

    public override render(): React.ReactNode {
        return(
            <table id="layer-frame-table">
                <tbody>
                    {this.renderTopRaw(this.state.frameNum)}
                    {this.renderRaws()}
                </tbody>
            </table>
        );
    }
    private renderTopRaw(frameNum: number)
    {
        let frameIndexes: JSX.Element[]=[];
        for (let i=0; i<frameNum; ++i)
        {
            frameIndexes.push(
                <th className="layer-frame-cell" style={this.state.frameStyle[i]}>{i+1}</th>
            )
        }

        return(              
        <tr className="layer-frame-raw">
            <th className="layer-frame-cell">レイヤー</th>
            {frameIndexes}
        </tr>
        );
    }
    private renderRaws()
    {
        let rawNum = this.state.layerNum;
        let raws: JSX.Element[] = [];
        for (let i=0; i<rawNum; ++i)
        {
            raws.push(this.renderRaw(i));
        }
        return raws;
    }
    private renderRaw(layer: number)
    {
        return(
        <tr className="layer-frame-raw">
            <th className="layer-frame-cell" style={this.state.layerStyle[layer]}>
                <input 
                    className="layer-cell-input" 
                    type={"text"} 
                    value={this.state.layerSettings[layer].name}
                    onChange={(e)=>{
                        this.state.layerSettings[layer].name=e.target.value;
                        this.setState({layerSettings: this.state.layerSettings});
                    }}
                />
            </th>
            {this.renderFrames(layer)}
        </tr>
        )
    }
    private renderFrames(layer: number)
    {
        let rawNum = this.state.frameNum;
        let raws: JSX.Element[] = [];
        for (let i=0; i<rawNum; ++i)
        {
            raws.push(
                <th 
                    className="layer-frame-cell"
                    onClick={(e)=>{
                        this.setState({curLayer: layer, curFrame: i})
                        this.updateStyle(this.state.layerNum, this.state.frameNum, layer, i);
                    }}
                    style={Object.assign( {}, this.state.frameStyle[i], this.state.layerStyle[layer])}
                >
                    ○
                </th>);
        }
        return raws;
    }

    private updateStyle(layerNum: number, frameNum: number, curLayer: number, curFrame: number)
    {
        let layerStyle: {[tag: string]: string}[] = Array(layerNum).fill({});
        let frameStyle: {[tag: string]: string}[] = Array(frameNum).fill({});
        const color = "#3aa"
        layerStyle[curLayer] ={"backgroundColor": color};
        frameStyle[curFrame] ={"backgroundColor": color};
        this.setState({layerStyle: layerStyle, frameStyle: frameStyle});
    }
}
