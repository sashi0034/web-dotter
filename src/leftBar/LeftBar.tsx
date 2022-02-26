import React from "react";
import {DeliveryData} from "../deliveryData"
import {ColorSlider} from "./ColorSlider"
import {ColorPalette} from "./ColorPaleltte"


interface ILeftBarProps
{
    deliveryData: DeliveryData
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
            <ColorPalette deliveryData={this.props.deliveryData}/>
            <ColorSlider deliveryData={this.props.deliveryData}/>
        </div>);
    }
}







