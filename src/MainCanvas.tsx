
import { posix } from "node:path/win32";
import React from "react";
import { findDOMNode } from "react-dom";
import "./MainCanvas.css"

interface IMainCanvasProps
{
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


interface IMainCanvasState
{
    style: {[tag: string]: string}
}



export class MainCanavas extends React.Component<IMainCanvasProps, IMainCanvasState>
{
    private mouse: MouseState;
    private posLeft: number=0;
    private posTop: number=0;
    private oldPosLeft: number=0;
    private oldPosTop: number=0;
    private scale: number = 2;
    private sizeWidth = 32;
    private sizeHeight = 32;
    private stylePos: {[tag: string]: string} = {left: "0px", top: "0px"};
    private styleSize: {[tag: string]: string} = {width: this.sizeWidth*this.scale + "px", height: this.sizeHeight*this.scale+"px"};
    
    private canvasElement: HTMLCanvasElement = (null as unknown) as HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D = (null as unknown) as CanvasRenderingContext2D;

    private canLine: boolean = false;

    public constructor(props: IMainCanvasProps | Readonly<IMainCanvasProps>)
    {
        super(props);

        this.mouse = new MouseState();

        this.state = 
        {
            style: {}
        }
       
    }

    public override componentDidMount()
    {
        let base = document.getElementById("canvas-base");
        if (base!==null)
        {
            this.setEvent();
            this.setStateStyle();

            let canvas: HTMLCanvasElement = document.getElementById("canvas-body") as HTMLCanvasElement;
            if (canvas !== null)
            {
                this.canvasElement = canvas;
                let context = canvas.getContext("2d");
                if (context!==null)
                {
                    context.imageSmoothingEnabled = false;
                    context.fillStyle="#fff";
                    context.fillRect(0, 0, this.sizeWidth, this.sizeHeight);
                    this.canvasContext = context;
                }
            }
        }

    }

    private setEvent()
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
                    this.canvasContext.strokeStyle = "#000";
                    let begin = this.clientToCanvas(this.mouse.oldX, this.mouse.oldY);
                    let end = this.clientToCanvas(e.clientX, e.clientY);
                    console.log(begin, end);
                    this.canvasContext.lineWidth=1;
                    this.canvasContext.beginPath();
                    this.canvasContext.moveTo(begin.x, begin.y);
                    this.canvasContext.lineTo(end.x, end.y);
                    this.canvasContext.closePath();
                    this.canvasContext.stroke();
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
        window.addEventListener("wheel", (e)=>{
            this.scale += -(this.scale/10) * e.deltaY/100.0;
            this.scale = Math.max(this.scale, 1.0);
            this.styleSize = {width: this.sizeWidth*this.scale + "px", height: this.sizeHeight*this.scale+"px"};

            this.setStateStyle();
        });
    }
    private clientToCanvas(clientX: number, clientY: number) 
    {
        let rect = this.canvasElement.getBoundingClientRect();
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
                <canvas 
                    id="canvas-body"
                    width={this.sizeWidth} 
                    height={this.sizeHeight}
                    onContextMenu={() => {return false;}}
                    style={this.state.style}/>
            </div>
        ); 
    }
}







