import React from "react";
import "./ColorSlider.css"

interface IColorSliderProps
{

}
interface IColorSliderState
{
    color: string
}


export class ColorSlider extends React.Component<IColorSliderProps, IColorSliderState>
{
    constructor(props: IColorSliderProps)
    {
        super(props);
        this.state = {
            color: "#ffffff"
        }
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
            <button className="add-button">+</button>
        </div>
        );
    }
}







