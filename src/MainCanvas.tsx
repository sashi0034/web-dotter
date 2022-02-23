
import React from "react";
import "./MainCanvas.css"
import sadpanda from "./sadpanda_24x24.png"

interface IMainCanvasProps
{
}
interface IMainCanvasState
{
    posX: number,
    posY: number,
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
        }
    }

    public override render(): React.ReactNode 
    {
        return (
            <div className="canvas-name">
                <img src={sadpanda} alt="サッドパンダの画像" title="sadpanda" className="canvas-content"></img>
            </div>
        ); 
    }
}







