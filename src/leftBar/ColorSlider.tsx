import React from "react";
import {DeliveryData} from "../App"
import "./ColorSlider.css"

interface IColorSliderProps
{
    deliveryData: DeliveryData,
}
interface IColorSliderState
{
    color: string
}


export class ColorSlider extends React.Component<IColorSliderProps, IColorSliderState>
{
    private deliveryData: DeliveryData = new DeliveryData();

    constructor(props: IColorSliderProps)
    {
        super(props);
        this.state = {
            color: "#ffffff"
        }
        
        this.props.deliveryData.getCurrentColor = () => {return this.state.color};
        this.props.deliveryData.setCurrentColor = (val: string) => {this.setState({color: val})};
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
            <input type="color" className="color-box main-color" value={this.state.color} onChange={(e)=>{this.setState({color: e.target.value});}}></input>
            <button className="add-button" onClick={(e)=>{this.addPalleteColor(e)}}>+</button>
        </div>
        );
    }

    private addPalleteColor(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        this.props.deliveryData.addPaletteColors(this.state.color)
    }
}







