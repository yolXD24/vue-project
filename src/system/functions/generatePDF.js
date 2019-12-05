import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import GenerateForm from "./generateForm";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { months } from '@/helpers/months';
import axios from "axios";
export default {
    name: "generatePDF",
    createdPDF: "",
    dataUrl: "",
    toCapital(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    },
    generatePDF(code, emp) {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:4000/admin/files/code/" + code)
                .then(res => {
                    var info = res.data.data.body.info;
                    console.log(info);
                    var today = new Date();
                    var details = {
                        business: info.business,
                        location: info.location,
                        date: {
                            year: today.getFullYear(),
                            month: months()[today.getMonth()],
                            day: today.getDate()
                        },
                        exp_date: {
                            year: today.getFullYear(),
                            month: months()[today.getMonth() + 3],
                            day: today.getDate() - 1
                        }
                    };
                    var fullname = `${info.name.firstName} ${info.name.middleName} ${info.name.lastName} ${info.name.suffix? info.name.suffix:""}`
                    var incharge = `${emp.firstname} ${emp.lastname}`

                    pdfMake.createPdf(
                            GenerateForm.createForm(code, fullname, incharge, details)
                        )
                        .getBuffer((buffer) => {
                            this.createdPDF = buffer;
                        })
                    GenerateForm.clear();
                    pdfMake.createPdf(
                            GenerateForm.createForm(code, fullname, incharge, details)
                        )
                        .getDataUrl((dataUrl) => {
                            this.dataUrl = dataUrl;
                        })
                    GenerateForm.clear();
                    resolve({ details: { name: fullname, request: info.docType }, pdf: this.createdPDF, dataUrl: this.dataUrl })
                })
                .catch((err) => {
                    var error = "something went wrong";
                    if (err.response) {
                        error = err.response.data.error.message;
                    }
                    console.log(err);
                    reject(error);
                });
        })

    }
}