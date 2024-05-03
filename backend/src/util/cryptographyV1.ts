import * as crypto from "crypto-js";


const key = "some key";

export const encryptV1 = (text: string) => {
    return crypto.AES.encrypt(text, key).toString();
}

export const decryptV1 = (s: string) => {
    return crypto.AES.decrypt(s, key).toString(crypto.enc.Utf8);
}