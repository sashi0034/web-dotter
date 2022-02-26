import React from "react";
import {ColorSlider} from "./ColorSlider"
import {ColorPalette} from "./ColorPaleltte"

interface ILeftBarProps
{

}
interface ILeftBarState
{

}


export class LeftBar extends React.Component<ILeftBarProps, ILeftBarState>
{
    constructor(props: ILeftBarProps)
    {
        super(props);
    }
    public override render(): React.ReactNode {
        return(
        <div>
            <ColorPalette/>
            <ColorSlider/>
        </div>);
    }
}







