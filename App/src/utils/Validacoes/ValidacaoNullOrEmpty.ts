export function isNullOrEmpty(str: string){
    return str === null || str.match(/^ *$/) !== null;
}