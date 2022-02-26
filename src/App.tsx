import React from "react";
import {LeftBar} from "./leftBar/LeftBar"
import { MainCanavas } from "./canvas/MainCanvas";

import "./App.css";



export class App extends React.Component
{
	public override render(): React.ReactNode {

		return(
			<div className="app-base">
				<div className="left-bar">
					<LeftBar/>
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





