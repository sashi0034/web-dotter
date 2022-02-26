import React from "react";
import {ColorSlider} from "./ColorSlider"

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
            <ColorSlider/>
        </div>);
    }
}







