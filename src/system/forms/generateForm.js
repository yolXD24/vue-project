import INDIGENCY from "./indigency.js";
import CLEARANCE from "./clearance.js";
import PERMIT from "./businessClearance.js";
export default {
    responseForm: {},
    form_hub: {
        // userPassword: "1234",
        // ownerPassword: "1234", //+jwt_decode(localStorage.getItem('token')).id.username,
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
        styles: {
            text_center: {
                alignment: "center",
                fontSize: 14
            },
            text_right: {
                alignment: "right"
            },
            text_justify: {
                alignment: "justify",
                preserveLeadingSpaces: true
            },
            header: {
                fontSize: 14,
                bold: true
            }
        },
        footer: []
    },

    createForm(type, fullname, incharge, details) {
        if (type === "permit") {
            this.responseForm = PERMIT.generate(
                fullname,
                incharge,
                this.form_hub,
                details
            );
        } else if (type === "clearance") {
            this.responseForm = CLEARANCE.generate(
                fullname,
                incharge,
                this.form_hub,
                details
            );
        } else {
            this.responseForm = INDIGENCY.generate(fullname, incharge, this.form_hub);
        }
        return this.responseForm;
    },
    clear() {
        this.form_hub.content = [];
        this.form_hub.styles = {};
        this.form_hub.footer = [];
        this.responseForm = {};
    }
};