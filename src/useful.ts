
export namespace useful
{
    export function remove<T>(arr: Array<T>, target: T): boolean
    {
        let i=arr.indexOf(target);
        if (i>-1) 
        {
            arr.splice(i, 1);
            return true;
        }
        return false;
    }
}









