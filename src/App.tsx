import React from "react";
import { MainCanavas } from "./MainCanvas";

import "./App.css";



export class App extends React.Component
{
	public override render(): React.ReactNode {

		return(
			<div className="app-base">
				<div className="left-bar">
					サイドバー
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





