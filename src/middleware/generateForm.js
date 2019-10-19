import INDIGENCY from './indigency.js';
import CLEARANCE from './clearance.js';
export default {

    responseForm: {},
    form_hub: {
        userPassword: "1234",
        ownerPassword: "1234", //+jwt_decode(localStorage.getItem('token')).id.username,
        permissions: {
            printing: "highResolution", //'lowResolution'
            modifying: true,
            copying: true,
            annotating: true,
            fillingForms: true,
            contentAccessibility: true,
            documentAssembly: true
        },
        pageSize: "LETTER",
        pageMargins: [70, 70],
        // background: this.background,
        content: [],
        styles: {},
        footer: []
    },

    createForm(type, fullname, incharge, details) {
        if (type == 'clearance') {
            this.responseForm = CLEARANCE.generate(fullname, incharge, this.form_hub, details)
        } else {
            this.responseForm = INDIGENCY.generate(fullname, incharge, this.form_hub)

        }
        return this.responseForm
    }
}