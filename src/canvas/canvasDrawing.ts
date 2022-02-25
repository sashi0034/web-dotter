
export class RGBA
{
    constructor(
        public r: number,
        public g: number,
        public b: number,
        public alpha: number
    ){};
}


export class CanvasDrawing
{
    private canvasElement: HTMLCanvasElement = (null as unknown) as HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D = (null as unknown) as CanvasRenderingContext2D;
    private width: number = 0;
    private height: number = 0;
    private imageData: ImageData = (null as unknown) as ImageData;
    
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
        this.imageData = this.canvasContext.getImageData(0, 0, this.width, this.height);
    }

    // 線の描画
    public drawLine(x1: number, y1: number, x2: number, y2: number, color: RGBA)
    {

        let r=color.r, g=color.g, b=color.b;
        if (x1!=x2)
        {
            if (x1>x2) 
            {
                [x1, x2]=[x2, x1];
                [y1, y2]=[y2, y1];
            }
            let w = x2 - x1, h = y2 - y1;

            
            {// 始点
                let middleRate = 0/w;
                let middleY = (y1 + h*middleRate);

                let rightRate = 1.0/w;
                let rightY = (y1 + h*rightRate);

                this.putPixelVertical(x1, middleY|0, (rightY+middleY)/2|0, r, g, b);
            }

            {// 終点
                let leftRate = (w-1)/w;
                let leftY = (y1 + h*leftRate);
    
                let middleRate = w/w;
                let middleY = (y1 + h*middleRate);

                this.putPixelVertical(x2, (leftY+middleY)/2|0, middleY|0, r, g, b);
            }

            for (let x=x1+1; x<=x2-1; ++x)
            {// 間
                let leftRate = (x-x1-1)/w;
                let leftY = (y1 + h*leftRate);

                let middleRate = (x-x1)/w;
                let middleY = (y1 + h*middleRate);

                let rightRate = (x-x1+1)/w;
                let rightY = (y1 + h*rightRate);

                this.putPixelVertical(x, (leftY+middleY)/2|0, (middleY+rightY)/2|0, r, g, b);
            }
        }
        else
        {
            this.putPixelVertical(x1, y1, y2, r, g, b);
        }



        this.canvasContext.putImageData(this.imageData, 0, 0);
    }


    private putPixelVertical(x: number, y1: number, y2: number, r: number, g: number, b: number)
    {
        if (x<0 || x>=this.width) return;
        if (y1>y2) {[y2, y1] = [y1, y2];}

        for (let y=y1; y<=y2; y++)
        {
            if (y<0) continue;
            if (y>=this.height) return;
            let base: number = (x+y*this.width) * 4;
            this.imageData.data[base+0] = r;
            this.imageData.data[base+1] = g;
            this.imageData.data[base+2] = b;
        }
    }
}





