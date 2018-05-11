export function stripApiVersion(key: any, opts: any) {
    let apiPart = '';
    let apiVersion = opts['apiVersion'];
    if (Array.isArray(opts) && apiVersion) {
        apiPart = `${apiVersion}/`;
    }
    return key.replace(apiPart, '');
}

export function arrayToFedaPayObject(array: any, opts: any) {
    
}

export function isList(array: any) {
    if(!Array.isArray(array)) return false;
    array.map(
        (key: number, value: any) => {
            if (!isNumeric(key)) return false;
        }
    );
    return true;
}

function isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


