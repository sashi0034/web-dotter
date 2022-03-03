

export class DeliveryData
{
    public getPaletteColors: ()=>string[] = ()=>{return []};
    public addPaletteColors: (color: string)=>void = ()=>{return;};

    public getCurrentColor: ()=>string = () => {return ""};
    public setCurrentColor: (color: string)=>void = ()=>{return;};
    public onSetCurrentColor: Array<(color: string)=>void> = [];

    public getBackgroundColor: ()=>string = () => {return ""};
    public setBackgroundColor: (color: string)=>void = ()=>{return;};
    public onSetBackgroundColor: Array<(color: string)=>void> = [];

    public setCurFrame: (frame: number)=>(void) = ()=>{};
    public getCurFrame: ()=>(number) = ()=>{return 0};
    public onAddLayer: Array<()=>void> = [];
    public setCurLayer: (frame: number)=>(void) = ()=>{};
    public getCurLayer: ()=>(number) = ()=>{return 0};
    public onAddFrame: Array<()=>void> = [];

    public constructor(){}
}


