import INDIGENCY from "../forms/indigency.js";
import CLEARANCE from "../forms/clearance.js";
import PERMIT from "../forms/businessClearance.js";

export default {
    responseForm: {},

    form_hub: {
        permissions: {
            printing: "highResolution",
            modifying: true,
            copying: true,
            annotating: true,
            fillingForms: true,
            contentAccessibility: true,
            documentAssembly: true
        },
        pageSize: "LETTER",
        pageMargins: [70, 70],
        // background: [{
        //     image: require("@/system/functions/paper.png"),
        //     width: 792
        // }],
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
        console.log(details);

        if (type === "business-clearance") {
            this.responseForm = PERMIT.generate(
                fullname,
                incharge,
                this.form_hub,
                details
            );
        } else if (type === "barangay-clearance") {
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
        this.form_hub.footer = [];
        this.responseForm = {};
    }
};