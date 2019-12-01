import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import GenerateForm from "./generateForm";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { months } from '@/helpers/months';


var createdPDF = "",
    dataUrl = "";

let userPreview = (type, userInfo, empInfo) => {
    let code = type == 'barangay-clearance' ? 'BAC' : type == 'business-clearance' ? 'BUC' : 'BAI';
    return new Promise((resolve) => {
        var today = new Date();
        var details = {
            business: userInfo.business ? userInfo.business : '',
            location: userInfo.address ? userInfo.address : '',
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
        var incharge = `${empInfo ? empInfo.firstname : 'John'} ${empInfo ? empInfo.lastname : 'Doe'}`
        pdfMake.createPdf(
                GenerateForm.createForm(code, fullname, incharge, details)
            )
            .getBuffer((buffer) => {
                createdPDF = buffer;
            })
        GenerateForm.clear();
        pdfMake.createPdf(
                GenerateForm.createForm(code, fullname, incharge, details)
            )
            .getDataUrl((url) => {
                dataUrl = url;
            })
        GenerateForm.clear();
        resolve({ details: userInfo, pdfPreview: createdPDF, dataUrl: dataUrl })
    })
}
export { userPreview };