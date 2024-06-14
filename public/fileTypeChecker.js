
export const fileTypes = {
    IMG: 1,
    PDF: 2,
    XLS: 3,
    VIDEO: 4,
    UNKNOWN: 10
}

export const fileTypeCheckerFromBase64 = (base64) => {
    const type = base64.split(';')[0].split('/')[1];
    let result;
    switch(type) {
        case 'png':
        case 'jpeg':
        case 'jpg':
            result = fileTypes.IMG
            break;
        case 'pdf':
            result = fileTypes.PDF
            break;
        case 'xls':
        case 'xlsx':
            result = fileTypes.XLS
            break;
        case 'mp4':
        case 'avi':
            result = fileTypes.VIDEO
            break;
        default:
            result = fileTypes.UNKNOWN
    }
    return result;
}

export const getProcessedFileType = (type) => {
    let result = '';
    switch(type) {
        case fileTypes.IMG:
            result = 'png'
            break;
        case fileTypes.VIDEO:
            result = 'mp4'
            break;
        default:
            result = 'png'
    }
    return result;
}

export const fileTypeChecker = (file) => {
    const arr = (new Uint8Array(file)).subarray(0, 4)
    let header = ''
    let type = null
    for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16)
    }
    switch (header) {
        case '89504e47': // png
        case 'ffd8ffe0': // following are jpeg magic numbers
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
            type = fileTypes.IMG
            break
        case 'd0cf11e0': // xls
        case '504b34':   // xlsx
            type = fileTypes.XLS
            break
        case '25504446':
            type = fileTypes.PDF
            break
        case '000001ba':
        case '000001b3':
        case '66747970':
        case '464c56':
        case '1a45dfa3':
        case '00020':    
            type = fileTypes.VIDEO
            break;
        default:
            type = fileTypes.UNKNOWN // Or you can use the blob.type as fallback
            break    
    }
    return type;
}