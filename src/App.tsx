import React from "react";
import {DeliveryData} from "./deliveryData"
import {LeftBar} from "./leftBar/LeftBar"
import {BottomBar} from "./bottomBar/BottomBar"
import { MainCanavas } from "./canvas/MainCanvas";

import "./App.css";


export class App extends React.Component<{},{}>
{
	public deliveryData: DeliveryData = new DeliveryData()
	public constructor(props: {})
	{
		super(props);
	}

	public override render(): React.ReactNode {

		return(
			<div className="app-base">
				<div className="left-bar">
					<LeftBar deliveryData={this.deliveryData}/>
				</div>

				<div id="main-document">
					<MainCanavas deliveryData={this.deliveryData} parentId="main-document"/>
				</div>

				<div className="bottom-bar">
					<BottomBar deleveryData={this.deliveryData}/>
				</div>

				<div className="right-bar">
					サイドバー
				</div>
			</div>
		)
	}
}





