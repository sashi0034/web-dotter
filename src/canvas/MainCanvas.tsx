
import { posix } from "node:path/win32";
import React from "react";
import {DeliveryData} from "../deliveryData"
import { findDOMNode } from "react-dom";
import { CanvasDrawing, RGBA } from "./canvasDrawing"
import "./MainCanvas.css"


interface IMainCanvasProps
{
    deliveryData: DeliveryData,
    parentId: string
}

interface IMainCanvasState
{
    style: {[tag: string]: string},
    layerNum: number,
}

class MouseState
{
    public x: number=0;
    public y: number=0;
    public oldX = 0;
    public oldY = 0;
    public isRight: boolean = false;
    public isMiddle: boolean=false;
    public middleFromX: number=0;
    public middleFromY: number=0;
}



class Frame
{
    constructor(
        public layers: CanvasDrawing[] = [],
    ){};
}


export class MainCanavas extends React.Component<IMainCanvasProps, IMainCanvasState>
{
    private mouse: MouseState;
    private posLeft: number=0;
    private posTop: number=0;
    private oldPosLeft: number=0;
    private oldPosTop: number=0;
    private scale: number = 2;
    private sizeWidth = 32*2;
    private sizeHeight = 32*2;
    private stylePos: {[tag: string]: string} = {left: "0px", top: "0px"};
    private styleSize: {[tag: string]: string} = {width: this.sizeWidth*this.scale + "px", height: this.sizeHeight*this.scale+"px"};
    
    private curLayer: number = 0;
    private curFrame: number = 0;
    private frames: Frame[] = [new Frame([])];
    private get frameNum() {return this.frames.length};
    private get layerNum() {return this.frames[0].layers.length};

    private canLine: boolean = false;

    public constructor(props: IMainCanvasProps | Readonly<IMainCanvasProps>)
    {
        super(props);

        this.mouse = new MouseState();

        this.state = 
        {
            style: {},
            layerNum: 1,
        }
      
        this.initDeliveryFuncs();
    }
    public override componentDidMount()
    {
        this.initEvent();
        this.setStateStyle();
    }

    private initDeliveryFuncs()
    {
        this.props.deliveryData.setCurFrame = (frame: number)=>{this.frameChange(frame);}
        this.props.deliveryData.getCurFrame = ()=>{return this.curFrame;}

        this.props.deliveryData.setCurLayer = (layer: number)=>{this.curLayer=layer;}
        this.props.deliveryData.getCurLayer = ()=>{return this.curLayer;} 

        this.props.deliveryData.onAddFrame.push(()=>{
            let layers: CanvasDrawing[] = [];
            for (let i=0; i<this.layerNum; ++i)
            {
                let baseLayer = this.frames[0].layers[i];
                layers.push(new CanvasDrawing(baseLayer.getCanvasElement, baseLayer.getCanvasContext, this.sizeWidth, this.sizeHeight));
            }

            this.frames.push(new Frame(layers));
        });

        this.props.deliveryData.onAddLayer.push(()=>{
            this.setState({layerNum: this.state.layerNum+1});
        })
    }
    private initEvent()
    {
        document.addEventListener("mousemove", (e)=>{
            if (this.mouse.isMiddle===true)
            {
                this.posLeft = this.oldPosLeft + e.clientX-this.mouse.middleFromX;
                this.posTop = this.oldPosTop + e.clientY-this.mouse.middleFromY;

                this.stylePos = {
                    left: this.posLeft+"px",
                    top: this.posTop+"px"
                }
                this.setStateStyle();
            }
            if (this.mouse.isRight===true)
            {
                if (this.canLine)
                {// 線を引く
                    console.log(this.curFrame, this.curLayer);
                    let begin = this.clientToCanvas(this.mouse.oldX, this.mouse.oldY);
                    let end = this.clientToCanvas(e.clientX, e.clientY);
                    this.frames[this.curFrame].layers[this.curLayer]?.drawLine(begin.x, begin.y, end.x, end.y, 
                        RGBA.getFromCode(this.props.deliveryData.getCurrentColor(), 255));
                }
                else
                {
                    this.canLine = true;
                }
            }
                            
            this.mouse.oldX = e.clientX;
            this.mouse.oldY = e.clientY;
        })
        document.addEventListener("mousedown", (e)=>{
            if (e.button===0)
            {
                this.mouse.isRight = true;
            }
            if (e.button===1) 
            {
                this.mouse.middleFromX = e.clientX;
                this.mouse.middleFromY = e.clientY;
                this.mouse.isMiddle = true;
            }
        });
        document.addEventListener("mouseup", (e)=>{
            if (e.button==0)
            {
                this.mouse.isRight = false;
                this.canLine = false;
            }
            if (e.button===1) 
            {
                this.oldPosLeft = this.posLeft;
                this.oldPosTop = this.posTop;
                this.mouse.isMiddle = false;
            }
        });
        
        document.getElementById(this.props.parentId)?.addEventListener("wheel", (e)=>{
            this.scale += -(this.scale/10) * e.deltaY/100.0;
            this.scale = Math.max(this.scale, 1.0);
            this.styleSize = {width: this.sizeWidth*this.scale + "px", height: this.sizeHeight*this.scale+"px"};

            this.setStateStyle();
        });
    }

    private frameChange(nextFrame: number)
    {
        for (let i=0; i<this.frameNum; ++i)
        {
            this.frames[nextFrame].layers[i]?.reRender();
        }
        this.curFrame=nextFrame;
    }




    private clientToCanvas(clientX: number, clientY: number) 
    {
        let rect = this.frames[0].layers[0].getCanvasElement.getBoundingClientRect();
        let cx = clientX - rect.x + document.body.scrollLeft;
        let cy = clientY - rect.y + document.body.scrollTop;
        cx /= this.scale;
        cy /= this.scale;
        
        let ret = 
        {
            x: cx|0,
            y: cy|0
        };
        return ret;
    }

    private setStateStyle()
    {
        this.setState({style: Object.assign({}, this.stylePos, this.styleSize, {border: '2px solid #222'} )});
    }

    public override render(): React.ReactNode 
    {

        return (
            <div id="canvas-base">
                {this.renderCanvases()}
            </div>
        ); 
    }

    private getLayerId(layer: number)
    {
        return `canvas-layer${layer}`;
    }
    private renderCanvases()
    {
        let canvas: JSX.Element[] = [];
        for (let i=0; i<this.state.layerNum; ++i)
        {
            canvas.push( 
                <LayerCanvas 
                    key={i}
                    id={this.getLayerId(i)}           
                    width={this.sizeWidth} 
                    height={this.sizeHeight}
                    style={Object.assign({}, this.state.style, {"zIndex":`${255-i}`})}
                    pushLayer={(canvas, context)=>{
                        this.frames.forEach(frame=>{
                            frame.layers.push(new CanvasDrawing(canvas, context, this.sizeWidth, this.sizeHeight))
                        });
                    }}/>
            );
        }
        return canvas;
    }
}





interface ILayerCanvasProps
{
    id: string,
    width: number,
    height: number,
    style: {[tag: string]: string},
    pushLayer: (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D)=>void,
}
interface ILayerCanvasState
{
}
class LayerCanvas extends React.Component<ILayerCanvasProps, ILayerCanvasState>
{
    public constructor(props: ILayerCanvasProps)
    {
        super(props);
    }
    public override componentDidMount()
    {
        let canvas: HTMLCanvasElement = document.getElementById(this.props.id) as HTMLCanvasElement;
        let context = canvas?.getContext("2d");
        if (canvas !== null && context!==null)
        {
            this.props.pushLayer(canvas, context);
        }
        
    }

    public override render(): React.ReactNode 
    {
        return(<canvas 
            id={this.props.id}
            className="canvas-body"
            width={this.props.width} 
            height={this.props.height}
            onContextMenu={() => {return false;}}
            style={this.props.style}/>)    
    }
}











