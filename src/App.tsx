import React from "react";
import {DeliveryData} from "./deliveryData"
import {LeftBar} from "./leftBar/LeftBar"
import { MainCanavas } from "./canvas/MainCanvas";

import "./App.css";


export class App extends React.Component
{
	public deliveryData: DeliveryData = new DeliveryData()

	public override render(): React.ReactNode {

		return(
			<div className="app-base">
				<div className="left-bar">
					<LeftBar deliveryData={this.deliveryData}/>
				</div>

				<div className="main-document">
					<MainCanavas/>
				</div>

				<div className="right-bar">
					サイドバー
				</div>
			</div>
		)
	}
}





