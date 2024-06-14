export const getFileAndTypeOfBase64String = (base64) => {
    const splitBase64File = base64.split(',');
    return [splitBase64File[1], getFileType(base64)];
}

export const getBase64Header = (base64) => {
    return base64.split(',')[0];
}

const getFileType = (base64) => {
    return base64.split(';')[0].split('/')[1];
}