import multiparty, { Form } from "multiparty"
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";
import { mongooseConnect } from "@/lib/mongoose";
import axios from "axios";
export default async function handle(req, res) {
    await mongooseConnect();
    await isAdminRequest(req, res);
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
    const data = new FormData();
    for (const file of files.file) {
        console.log(file)
        data.append("file", file);
    }
    data.append('upload_preset', "uukphioq");
    data.append("cloud_name", "dicpnxb4y");

    await axios.post("https://api.cloudinary.com/v1_1/dicpnxb4y/image/upload", data)
        .then((res) => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })



    res.json("hello")
}

export const config = {
    api: { bodyParser: false },
};