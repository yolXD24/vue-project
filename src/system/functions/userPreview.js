import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import GenerateForm from "./generateForm";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { months } from '@/helpers/months';
export default {
    name: "userPreview",
    createdPDF: "",
    toCapital(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    },
    generatePDF(userInfo, empInfo) {
        return new Promise((resolve) => {
            var today = new Date();
            var details = {
                business: userInfo.business ? userInfo.business : '',
                location: userInfo.location ? userInfo.location : '',
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
            var fullname = `${userInfo.firstname} ${userInfo.lastname}`
            var incharge = `${empInfo.firstname ? empInfo.firstname : 'John'} ${empInfo.lastname ? empInfo.lastname : 'Doe'}`
            pdfMake.createPdf(
                GenerateForm.createForm(type, fullname, incharge, details)
            ).getBuffer((buffer) => {
                this.createdPDF = buffer;
            })
            GenerateForm.clear();
            resolve({pdfPreview:this.createdPDF})
        })
    }

}
