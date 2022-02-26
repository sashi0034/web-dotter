import React from "react";
import "./ColorPalette.css"

class ColorElement
{
    public constructor(
        public color: string,
        public style: {[tag: string]: string}
    ){}
}


interface IColorPaletteProps
{

}
interface IColorPaletteState
{
    colors: ColorElement[],
}


export class ColorPalette extends React.Component<IColorPaletteProps, IColorPaletteState>
{
    constructor(props: IColorPaletteProps)
    {
        super(props);

        this.state = {
            colors: this.getInitialElements(),
        }
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
            ret.push(new ColorElement(element, {backgroundColor: element}));
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
            <button className="palette-button" style={this.state.colors[index].style}>
                &nbsp;
            </button>
        );
    }

}



