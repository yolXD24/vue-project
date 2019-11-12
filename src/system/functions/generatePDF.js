import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import GenerateForm from "@/system/forms/generateForm.js";
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
                    this.loading = false;
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
                        business: "Internet Shop",
                        location: "Nasipit , Talamban",
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
                        this.toCapital(res.data.firstname) +
                        " " +
                        this.toCapital(res.data.lastname);
                    var incharge =
                        this.toCapital(emp.firstname) + " " + this.toCapital(emp.lastname);
                    pdfMake.createPdf(
                        GenerateForm.createForm(code, fullname, incharge, details)
                    ).getBuffer((buffer) => {
                        this.createdPDF = buffer;
                    })
                    GenerateForm.clear();
                    resolve(this.createdPDF)
                })
                .catch((err) => {
                    reject(err)
                });
        })

    }
}