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
    deleteButtonStyle: {[tag: string]: string},
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
            deleteButtonStyle: {"color": "#fff"},
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
                    {this.renderDeleteButton()}
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
        this.updateColor(this.state.colors[index].color);
    }
    private updateColor(color: string)
    {
        this.props.deliveryData.setCurrentColor(color);
        this.updatePaletteClassName(color);
    }
    private updatePaletteClassName(currentColor: string)
    {
        let colors: ColorElement[] = this.state.colors;
        let deleteButtonStyle = {color: "#444"};

        for (let i=0; i<this.state.colors.length; i++)
        {
            let str: string=ColorPalette.className.CLICKABLE;
            if (this.state.colors[i].color===currentColor)
            {
                str = ColorPalette.className.SELECTED;
                deleteButtonStyle.color = "#fff"
            }
            colors[i].className = str;
        }
        this.setState({colors: colors});
        this.setState({deleteButtonStyle: deleteButtonStyle});
    }

    // 削除ボタン
    private renderDeleteButton()
    {
        return (
            <button className="palette-button delete-button" onClick={(e)=>{this.onClickDeleteButton(e)}} style={this.state.deleteButtonStyle}>
                /
            </button>
        );
    }
    private onClickDeleteButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)
    {
        for (let i=0; i<this.state.colors.length; i++)
        {
            if (this.state.colors[i].color===this.props.deliveryData.getCurrentColor())
            {
                this.state.colors.splice(i, 1);
            }
        }
        this.updateColor(this.props.deliveryData.getCurrentColor());
    }

}



