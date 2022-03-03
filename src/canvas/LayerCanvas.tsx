import React from "react";



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
export class LayerCanvas extends React.Component<ILayerCanvasProps, ILayerCanvasState>
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












