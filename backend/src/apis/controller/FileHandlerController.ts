import { APIv1Response } from "../APIv1";
import { Request } from "express";
// import * as fs from 'fs';
import { encryptV1 } from "../../util/cryptographyV1";


class FileHandlerController {
    constructor () {

    }

    uploadSingleDocument = async (req: Request): Promise<APIv1Response> => {
        // console.log(req.headers);
        // validate
        if(!req.files) throw new Error("a document is required.");
        const files: any = req.files as any;
        if(!files['doc' as keyof typeof files]) throw new Error("required file not found.");        

        const pdfFile = files['doc'][0];
        console.log(pdfFile);

        
        const details = {
            path: pdfFile.path,
            originalName: pdfFile.originalName,
            fileName: pdfFile.filename
        };
         return {status: true, code: 200, message: "OK", data: {"file_token": encryptV1(JSON.stringify(details))}};
    }
}

export default FileHandlerController;