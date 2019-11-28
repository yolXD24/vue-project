import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import GenerateForm from "./generateForm";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { months } from '@/helpers/months';
import axios from "axios";
export default {
    name: "generatePDF",
    createdPDF: "",
    toCapital(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    },
    generatePDF(code, emp) {
        return new Promise((resolve, reject) => {
            axios.get("http://localhost:4000/admin/files/code/" + code)
                .then(res => {
                    var info = res.data.data.body.info;
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
                    var fullname = `${info.firstname} ${info.lastname}`
                    var incharge = `${emp.firstname} ${emp.lastname}`
                        // this.toCapital(emp.firstname) + " " + this.toCapital(emp.lastname);
                    pdfMake.createPdf(
                        GenerateForm.createForm(code, fullname, incharge, details)
                    ).getBuffer((buffer) => {
                        this.createdPDF = buffer;
                    })
                    GenerateForm.clear();
                    resolve({ details: info, pdf: this.createdPDF })
                })
                .catch((err) => {
                    reject(err.response.data.error.message)
                });
        })

    }
}