import React from "react";
import {DeliveryData} from "../deliveryData"
import "./LayerFrameTable.css";

interface IlayerFrameTableProps
{
    deliveryData: DeliveryData;
}
interface ILayerFrameTableState
{

}

export class LayerFrameTable extends React.Component<IlayerFrameTableProps, ILayerFrameTableState>
{
    constructor(props: IlayerFrameTableProps)
    {  
        super(props);
    }

    public override render(): React.ReactNode {
        return(
            <table id="layer-frame-table">
                <tbody>
                    <tr className="layer-frame-raw">
                        <th className="layer-frame-cell">レイヤー</th>
                        <th className="layer-frame-cell">1</th>
                        <th className="layer-frame-cell">2</th>
                        <th className="layer-frame-cell">3</th>
                    </tr>
                    {this.renderRaw()}
                    {this.renderRaw()}
                    {this.renderRaw()}
                </tbody>
            </table>
        );
    }
    private renderRaw()
    {
        return(
        <tr className="layer-frame-raw">
            <th className="layer-frame-cell">
                <input className="layer-cell-input" type={"text"}></input>
            </th>
            <th className="layer-frame-cell">○</th>
            <th className="layer-frame-cell">●</th>
            <th className="layer-frame-cell">●</th>
        </tr>
        )
    }
}
