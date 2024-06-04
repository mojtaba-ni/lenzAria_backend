import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import { writeFileSync, existsSync, mkdirSync, readFile, readFileSync, unlinkSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import userModel from "../model/userModel.js";
import { SuccesResponse } from "../config/response.js";
import { ScriptExecuter } from "../public/scriptExecuter.js";
import { fileTypeChecker, fileTypes } from "../public/filetypeChecker.js";

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
    const { uploadedFile, filename, lenzFile, lenzFilename } = req.body;

    // upload file
    const uploadedFileBuffer = Buffer.from(uploadedFile, 'base64');
    const uploadedFileType = fileTypeChecker(uploadedFileBuffer);

    const newFilename = `${Date.now()}-${filename}`;
    const rootDir = process.cwd(); // Root directory of the project
    const uploadsDir = join(rootDir, 'uploads');
    const filePath = join(uploadsDir, newFilename);

    if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir);
    }
    writeFileSync(filePath, uploadedFileBuffer);

    // upload lenz file
    const uploadedLenzBuffer = Buffer.from(lenzFile, 'base64');
    const uploadedLenzType = fileTypeChecker(uploadedLenzBuffer);

    if (uploadedLenzType != fileTypes.IMG) {
        res.status(400).send("Lenz file is not an image");
        throw new errorHandler("Lenz file is not an image");
    }

    const lenzDir = join(uploadsDir, 'lenz');
    const lenzFilePath = join(lenzDir, lenzFilename);

    if (!existsSync(lenzDir)) {
        mkdirSync(lenzDir);
    }
    writeFileSync(lenzFilePath, uploadedLenzBuffer);

    const executer = new ScriptExecuter();

    let result = await executer.executeProcessScript(filePath, lenzFilePath);

    if (!result) {
        //res.status(400).send("Could not process the uploaded file");
        //throw new errorHandler("Could not process the uploaded file");
    }

    let overlayedFilename = '';
    switch(uploadedFileType) {
        case fileTypes.IMG:
            const processedImagename = newFilename.split('.')[0] + '_processed.png'
            overlayedFilename = `uploads/overlayedImages/${processedImagename}`
            break;
        case fileTypes.VIDEO:
            const processedVideoname = newFilename.split('.')[0] + '_processed.' + newFilename.split('.')[1]
            overlayedFilename = `uploads/overlayedVideos/${processedVideoname}`
            break;
        default:
            overlayedFilename = ''    
    }

    const overlayedFilePath = join(rootDir, overlayedFilename);

    // Wait for the processed file to be created with a threshold
    const maxWaitTime = 30000; // Maximum wait time in milliseconds (e.g., 30 seconds)
    const pollInterval = 100; // Poll every 100ms
    let elapsedTime = 0;

    while (!existsSync(overlayedFilePath) || elapsedTime < maxWaitTime) {
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        elapsedTime += pollInterval;
    }

    if (!existsSync(overlayedFilePath)) {
        res.status(500).send("Processing the uploaded file timed out");
        throw new errorHandler("Processing the uploaded file timed out");
    }
    const contents = readFileSync(overlayedFilePath);

    unlinkSync(overlayedFilePath);
    unlinkSync(lenzFilePath);
    unlinkSync(filePath);

    res.status(200).send(contents.toString('base64'));
})