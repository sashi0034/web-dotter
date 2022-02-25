



export class CanvasDrawing
{
    private canvasElement: HTMLCanvasElement = (null as unknown) as HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D = (null as unknown) as CanvasRenderingContext2D;
    private width: number = 0;
    private height: number = 0;
    
    public get getCanvasElement() {return this.canvasElement;}
    public get getCanvasContext() {return this.canvasContext;}

    public constructor(
        canvasElement: HTMLCanvasElement, 
        canvasContext: CanvasRenderingContext2D,
        width: number,
        height: number)
    {
        this.canvasElement = canvasElement;
        this.canvasContext = canvasContext;
        this.width = width;
        this.height = height;
        
        this.canvasContext.imageSmoothingEnabled = false;
        this.canvasContext.fillStyle="#fff";
        this.canvasContext.fillRect(0, 0, this.width, this.height);
    }

    public drawLine(x1: number, y1: number, x2: number, y2: number, color: string)
    {
        this.canvasContext.strokeStyle = "#000";
        this.canvasContext.lineWidth=1;
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(x1, y1);
        this.canvasContext.lineTo(x2, y2);
        this.canvasContext.closePath();
        this.canvasContext.stroke();

    }
}



