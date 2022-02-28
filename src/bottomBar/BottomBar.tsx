import React from "react";
import {DeliveryData} from "../deliveryData"
import { LayerFrameTable } from "./LayerFrameTable";

interface IBottomBarProps
{
    deleveryData: DeliveryData
}
interface IBottomBarState
{

}

export class BottomBar extends React.Component<IBottomBarProps, IBottomBarState>
{
    constructor(props: IBottomBarProps)
    {
        super(props);
    }
    
    public override render(): React.ReactNode 
    {

        return (
        <div>
            <LayerFrameTable deliveryData={this.props.deleveryData}/>
        </div>);
    }
}





