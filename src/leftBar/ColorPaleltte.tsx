import React from "react";
import "./ColorPalette.css"

interface IColorPaletteProps
{

}
interface IColorPaletteState
{

}


export class ColorPalette extends React.Component<IColorPaletteProps, IColorPaletteState>
{
    constructor(props: IColorPaletteProps)
    {
        super(props);
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
        for (let i=0; i<32; i++)
        {
            ret.push(this.renderPaletteElement());
        }
        return ret;
    }

    private renderPaletteElement()
    {
        return (
            <button className="palette-button">
                &nbsp;
            </button>
        );
    }

}



