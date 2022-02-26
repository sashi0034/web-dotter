import React from "react";
import {DeliveryData} from "../deliveryData"
import "./ColorSlider.css"

interface IColorSliderProps
{
    deliveryData: DeliveryData,
}
interface IColorSliderState
{
    color: string,
    addButtonStyle: {[tag: string]: string},
}


export class ColorSlider extends React.Component<IColorSliderProps, IColorSliderState>
{
    private deliveryData: DeliveryData = new DeliveryData();

    constructor(props: IColorSliderProps)
    {
        super(props);
        this.state = {
            color: "#ffffff",
            addButtonStyle: {"visibility": "hidden"}
        }
        
        this.props.deliveryData.getCurrentColor = () => {return this.state.color};
        this.props.deliveryData.setCurrentColor = (val: string) => {this.setState({color: val}); this.visibleAddButton(val);};
    }
    public override componentDidMount()
    {
        this.visibleAddButton(this.state.color);
    }

    public override render(): React.ReactNode {
        return(
        <div id="color-slider-base">
            {this.renderRaw()}
        </div>);
    }

    private renderRaw()
    {
        return (
        <div>
            <input type="color" className="color-box main-color" onChange={(e)=>{this.onChangeColor(e)}} value={this.state.color}></input>
            <button className="add-button" onClick={(e)=>{this.addPalleteColor(e)}} style={this.state.addButtonStyle}>+</button>
        </div>
        );
    }

    private onChangeColor(e: React.ChangeEvent<HTMLInputElement>)
    {
        this.setState({color: e.target.value});
        this.visibleAddButton(e.target.value);
    }

    private visibleAddButton(color: string)
    {
        let vis: string="hidden";
        if (this.props.deliveryData.getPaletteColors().indexOf(color)===-1)
        {
            vis = "visible";
        }
        this.setState({addButtonStyle: {"visibility": vis}});
    }

    private addPalleteColor(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        this.props.deliveryData.addPaletteColors(this.state.color);
        this.visibleAddButton(this.state.color);
    }
}







