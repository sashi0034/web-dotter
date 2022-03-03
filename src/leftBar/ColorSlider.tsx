import React from "react";
import {DeliveryData} from "../deliveryData"
import "./ColorSlider.css"

interface IColorSliderProps
{
    deliveryData: DeliveryData,
}
interface IColorSliderState
{
    currentColor: string,
    backgroundColor: string,
    addButtonStyle: {[tag: string]: string},
}


export class ColorSlider extends React.Component<IColorSliderProps, IColorSliderState>
{
    constructor(props: IColorSliderProps)
    {
        super(props);
        this.state = {
            currentColor: "#ffffff",
            backgroundColor: "#b7bbc2",
            addButtonStyle: {"visibility": "hidden"}
        }
        
        this.initDeriveryData();
    }
    private initDeriveryData()
    {
        this.props.deliveryData.getCurrentColor = () => {return this.state.currentColor};
        this.props.deliveryData.setCurrentColor = (val: string) => {
            this.setState({currentColor: val});
            this.visibleAddButton(val);
            this.props.deliveryData.onSetCurrentColor.forEach(f => {f(val);});
        };

        this.props.deliveryData.getBackgroundColor = () => {return this.state.backgroundColor};
        this.props.deliveryData.setBackgroundColor = (val: string) => {
            this.setState({backgroundColor: val});
            this.props.deliveryData.onSetBackgroundColor.forEach(f => {f(val);});
        };
    }

    public override componentDidMount()
    {
        this.visibleAddButton(this.state.currentColor);
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
            <div className="color-slider-label">
                描画色<br></br>
                <input type="color" className="color-box main-color" onChange={(e)=>{this.onChangeCurrentColor(e)}} value={this.state.currentColor}></input>
                <button className="add-button" onClick={(e)=>{this.addPalleteColor(e)}} style={this.state.addButtonStyle}>+</button>
            </div>
            <div className="color-slider-label">
                背景色<br></br>
                <input type="color" className="color-box main-color" onChange={(e)=>{this.onChangeBackgounrcolor(e)}} value={this.state.backgroundColor}></input>
            </div>
        </div>
        );
    }

    private onChangeCurrentColor(e: React.ChangeEvent<HTMLInputElement>)
    {
        this.props.deliveryData.setCurrentColor(e.target.value);
    }
    private onChangeBackgounrcolor(e: React.ChangeEvent<HTMLInputElement>)
    {
        this.props.deliveryData.setBackgroundColor(e.target.value);
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
        this.props.deliveryData.addPaletteColors(this.state.currentColor);
        this.visibleAddButton(this.state.currentColor);
    }
}







