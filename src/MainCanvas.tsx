
import { posix } from "node:path/win32";
import React from "react";
import { findDOMNode } from "react-dom";
import "./MainCanvas.css"
import sadpanda from "./sadpanda_24x24.png"

interface IMainCanvasProps
{
}

class MouseState
{
    public x: number=0;
    public y: number=0;
    public isMiddle: boolean=false;
    public middleFromX: number=0;
    public middleFromY: number=0;
}


interface IMainCanvasState
{
    stylePos: {[name: string]: string}
}



export class MainCanavas extends React.Component<IMainCanvasProps, IMainCanvasState>
{
    private mouse: MouseState;
    private posLeft: number=0;
    private posTop: number=0;
    private oldPosLeft: number=0;
    private oldPosTop: number=0;

    public constructor(props: IMainCanvasProps | Readonly<IMainCanvasProps>)
    {
        super(props);

        this.mouse = new MouseState();

        this.state = 
        {
            stylePos: {left: "0px", top: "0px"}
        }
    }

    public override componentDidMount()
    {
        let body = document.getElementById("canvas-base");
        if (body!==null)
        {
            const rect = body.getBoundingClientRect();

            document.addEventListener("mousemove", (e)=>{
                if (this.mouse.isMiddle===true)
                {
                    this.posLeft = this.oldPosLeft + e.clientX-this.mouse.middleFromX;
                    this.posTop = this.oldPosTop + e.clientY-this.mouse.middleFromY;

                    this.setState({
                        stylePos: {
                            left: this.posLeft+"px",
                            top: this.posTop+"px"
                        }
                    });
                }
            })
            document.addEventListener("mousedown", (e)=>{
                if (e.button===1) 
                {
                    this.mouse.middleFromX = e.clientX;
                    this.mouse.middleFromY = e.clientY;
                    this.mouse.isMiddle = true;
                }
            });
            document.addEventListener("mouseup", (e)=>{
                if (e.button===1) 
                {
                    this.oldPosLeft = this.posLeft;
                    this.oldPosTop = this.posTop;
                    this.mouse.isMiddle = false;
                }
            });

        }
    }

    public override render(): React.ReactNode 
    {

        return (
            <div id="canvas-base">
                <img 
                    src={sadpanda} 
                    alt="サッドパンダの画像" 
                    title="sadpanda" 
                    id="canvas-body"
                    style={this.state.stylePos}></img>
            </div>
        ); 
    }
}







