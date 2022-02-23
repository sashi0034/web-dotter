
import { posix } from "node:path/win32";
import React from "react";
import { findDOMNode } from "react-dom";
import "./MainCanvas.css"
import sadpanda from "./sadpanda_24x24.png"

interface IMainCanvasProps
{
}
interface IMainCanvasState
{
    posX: number,
    posY: number,
    style: {[name: string]: string}
}



export class MainCanavas extends React.Component<IMainCanvasProps, IMainCanvasState>
{
    public constructor(props: IMainCanvasProps | Readonly<IMainCanvasProps>)
    {
        super(props);

        this.state = 
        {
            posX: 0,
            posY: 0,
            style: {left: "0px", top: "0px"}
        }
    }

    public override componentDidMount()
    {
        let body = document.getElementById("canvas-base");
        if (body!==null)
        {
            const rect = body.getBoundingClientRect();

            this.setState({
                posX: rect.left + window.pageXOffset,
                posY: rect.top + window.pageYOffset,
            });

            document.addEventListener("mousemove", (e)=>{
                console.log(e.clientX, e.clientY)
                this.setState({
                    style: {
                        left: e.clientX-this.state.posX+"px",
                        top: e.clientY-this.state.posY+"px"
                    }
                });
            })
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
                    style={this.state.style}></img>
            </div>
        ); 
    }
}







