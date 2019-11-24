import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import GenerateForm from "./generateForm";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
                    var today = new Date();
                    const monthNames = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                    ];

                    var details = {
                        business: res.data.body.info.business,
                        location: res.data.body.info.location,
                        date: {
                            year: today.getFullYear(),
                            month: monthNames[today.getMonth()],
                            day: today.getDate()
                        },
                        exp_date: {
                            year: today.getFullYear(),
                            month: monthNames[today.getMonth() + 3],
                            day: today.getDate() - 1
                        }
                    };
                    var fullname =
                        this.toCapital(res.data.body.info.firstname) +
                        " " +
                        this.toCapital(res.data.body.info.lastname);
                    var incharge =
                        this.toCapital(emp.firstname) + " " + this.toCapital(emp.lastname);
                    pdfMake.createPdf(
                        GenerateForm.createForm(code, fullname, incharge, details)
                    ).getBuffer((buffer) => {
                        this.createdPDF = buffer;
                    })
                    GenerateForm.clear();
                    resolve({ details: res.data.body.info, pdf: this.createdPDF })
                })
                .catch((err) => {
                    reject(err.response.data.error.message)
                });
        })

    }
}