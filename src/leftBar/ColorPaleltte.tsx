import React from "react";
import {DeliveryData} from "../deliveryData"
import "./ColorPalette.css"

class ColorElement
{
    public constructor(
        public color: string,
        public style: {[tag: string]: string},
        public className: string,
    ){}
}


interface IColorPaletteProps
{
    deliveryData: DeliveryData,
}
interface IColorPaletteState
{
    colors: ColorElement[],
}


export class ColorPalette extends React.Component<IColorPaletteProps, IColorPaletteState>
{
    private static readonly className = {
        CLICKABLE: "palette-button",
        SELECTED: "palette-button selected-color",
    };

    constructor(props: IColorPaletteProps)
    {
        super(props);
        
        this.state = {
            colors: this.getInitialElements(),
        }

        this.props.deliveryData.getPaletteColors = () => {return this.state.colors.map(ele => ele.color)}
        this.props.deliveryData.addPaletteColors = (val: string) => {
            let colors = this.state.colors;
            colors.push(new ColorElement(val, {backgroundColor: val}, ColorPalette.className.SELECTED));
            this.setState({colors: colors});
        }
        this.props.deliveryData.onSetCurrentColor.push((v: string)=>{this.updatePaletteClassName(v)});
    }

    private getInitialElements(): ColorElement[]
    {
        let colors = [
            "#ffffff", "#ff2222", "#22ff22", "#2222ff", 
            "#ffff22", "#ff22ff", "#22ffff", "#808080",
            "#f08000", "#f00080", "#00f080", "#202020",
            "#80f000", "#8000f0", "#0080f0", "#000000",

        ];

        let ret: ColorElement[] = [];
        colors.forEach(element => {
            ret.push(new ColorElement(element, {backgroundColor: element}, "palette-button"));
        });

        return(ret);
    }

    public override render(): React.ReactNode {
        return(
            <div id="color-palette-area">
                <div id="color-palette-back">
                    {this.renderPalette()}
                </div>
            </div>
        );
    }

    private renderPalette()
    {
        let ret: Array<JSX.Element> = [];
        for (let i=0; i<this.state.colors.length; i++)
        {
            ret.push(this.renderPaletteElement(i));
        }
        return ret;
    }

    private renderPaletteElement(index: number)
    {
        return (
            <button key={index} className={this.state.colors[index].className} style={this.state.colors[index].style} onClick={e=>{this.onClickPallteElement(e, index)}}>
                &nbsp;
            </button>
        );
    }
    private onClickPallteElement(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number)
    {
        this.props.deliveryData.setCurrentColor(this.state.colors[index].color);
        this.updatePaletteClassName(this.state.colors[index].color);
    }
    private updatePaletteClassName(currentColor: string)
    {
        let colors: ColorElement[] = this.state.colors;

        for (let i=0; i<this.state.colors.length; i++)
        {
            let str: string=ColorPalette.className.CLICKABLE;
            if (this.state.colors[i].color===currentColor)
            {
                str = ColorPalette.className.SELECTED;
            }
            colors[i].className = str;
        }
        this.setState({colors: colors});
    }

}



