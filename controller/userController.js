import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import { writeFileSync, existsSync, mkdirSync, readFile, readFileSync, unlinkSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import userModel from "../model/userModel.js";
import { SuccesResponse } from "../config/response.js";
import { ScriptExecuter } from "../public/scriptExecuter.js";
import { fileTypeChecker, fileTypeCheckerFromBase64, fileTypes, getProcessedFileType } from "../public/fileTypeChecker.js";
import { getBase64Header, getFileAndTypeOfBase64String } from "../public/base64FileUtils.js";

//@ desc getAllUser
//@ route GET api/user/all
//@ access public
export const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await userModel.find()

    if (!users) {
        res.status(400).send([])
        throw new errorHandler("There are no users")
    }

    res.status(200).send(SuccesResponse(users));

})

export const uploadEye = expressAsyncHandler(async (req, res) => {
    const { uploadedFileBase64, lenzFileBase64 } = req.body;

    // get file type
    const uploadedFileBase64Header = getBase64Header(uploadedFileBase64);
    const [uploadedFile, uploadedFileTypeAsString] = getFileAndTypeOfBase64String(uploadedFileBase64);
    const [lenzFile, lenzFileTypeAsString] = getFileAndTypeOfBase64String(lenzFileBase64);

    const filename = `${Date.now()}.${uploadedFileTypeAsString}`
    const lenzFilename = `${Date.now()}.${lenzFileTypeAsString}`

    // upload file
    const uploadedFileBuffer = Buffer.from(uploadedFile, 'base64');
    const fileType = fileTypeCheckerFromBase64(uploadedFileBase64);

    const rootDir = process.cwd(); // Root directory of the project
    const uploadsDir = join(rootDir, 'uploads');
    const filePath = join(uploadsDir, filename);

    if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir);
    }
    writeFileSync(filePath, uploadedFileBuffer);

    // upload lenz file
    const uploadedLenzBuffer = Buffer.from(lenzFile, 'base64');
    const uploadedLenzType = fileTypeCheckerFromBase64(lenzFileBase64);

    if (uploadedLenzType != fileTypes.IMG) {
        res.status(400).send("Lenz file is not an image");
        throw new errorHandler("Lenz file is not an image");
    }

    const lenzFilePath = join(uploadsDir, lenzFilename);
    writeFileSync(lenzFilePath, uploadedLenzBuffer);

    const executer = new ScriptExecuter();

    try {
        await executer.executeProcessScript(filePath, lenzFilePath);
    } catch (e) {
        res.status(500).send("Could not process the file");
    }

    let overlayedFilename = filename.split('.')[0] + '_processed.' + getProcessedFileType(fileType);
    const overlayedFilePath = join(uploadsDir, overlayedFilename);

    // Wait for the processed file to be created with a threshold
    const maxAttempts = 30; // Maximum wait time in milliseconds (e.g., 10 seconds)
    const pollInterval = 100; // Poll every 100ms
    let attempts = 0;

    while (!existsSync(overlayedFilePath) || attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
    }

    if (!existsSync(overlayedFilePath)) {
        res.status(500).send("Processing the uploaded file timed out");
        throw new errorHandler("Processing the uploaded file timed out");
    }
    const contents = readFileSync(overlayedFilePath);

    unlinkSync(overlayedFilePath);
    unlinkSync(lenzFilePath);
    unlinkSync(filePath);

    res.status(200).send(uploadedFileBase64Header + ',' + contents.toString('base64'));
})