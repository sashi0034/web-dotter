import React from "react";
import logo from "./logo.svg";
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
					メインコンテンツ
				</div>

				<div className="right-bar">
					サイドバー
				</div>
			</div>
		)
	}
}





