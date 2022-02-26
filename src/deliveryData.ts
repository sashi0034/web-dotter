

export class DeliveryData
{
    public getPaletteColors: ()=>string[] = ()=>{return []};
    public addPaletteColors: (color: string)=>void = ()=>{return;};

    public getCurrentColor: ()=>string = () => {return ""};
    public setCurrentColor: (color: string)=>void = ()=>{return;};
    public onSetCurrentColor: Array<(color: string)=>void> = [];
    
    public constructor(){}
}


