export default {
    name: "clearance",
    generate(fullname, incharge, form_hub, details) {
        form_hub.content.push({
            text: [{
                text: "Republic of the Philippines\nProvince of Cebu\nCity of Cebu\n"
            },
            { text: "Barangay Talamban ", bold: true },
            { text: "\n\nOFFICE OF THE BARANGAY COUNCIL\n\n", fontSize: 12 },
            {
                text: "\nB A R A N G A Y\tB U S I N E S S\n",
                fontSize: 14
            },
            { text: "C L E A R A C E \n\n", style: "text_center", fontSize: 18 },
            {
                text: "\nTO WHOM IT MAY CONCERN:\n\n\t",
                style: ["text_justify"],
                fontSize: 12
            },
            {
                text: "\t\t\tPursuant to the ordinance of this Barangay , this CLEARANCE is granted to  ",
                fontSize: 12
            },
            { text: fullname.toUpperCase() + " ", bold: true },
            {
                text: "owner of ",
                style: ["text_justify"]
            },
            { text: details.business.toUpperCase() + " ", bold: true },
            {
                text: "located at ",
                fontSize: 12
            },
            { text: details.location.toUpperCase() + " \n\n", bold: true },
            {
                text: "\t\t\tApplicant is hereby advised to follow  all existing laws and ordinances in relation with the conduct of his/her business.Violation of the same sound is a ground for revocation of this clearance.\n\n\t\tClearance is valid up to " +
                    details.exp_date.month + " " + details.exp_date.day + "," + details.exp_date.year +
                    " unless revoked due to valid cause.Issued this " +
                    details.date.month + " " + details.date.day + "," + details.date.year +
                    " at Barangay Talamban , Cebu City , Cebu , Philippines.\n\n\n\n\n\n\n\n",
                fontSize: 12,
                style: "text_justify"
            },


            ],
            style: ["text_center"]
        }, {
                columns: [
                    { text: "Yol Torres", style: 'text_justify' },
                    { text: incharge, style: 'text_right' }
                ],
                style: "text_center"
            }, {
                columns: [
                    { text: "\nIssued By", style: 'text_justify' },
                    { text: "\nPunong Barangay", style: 'text_right' }
                ],
                style: "text_center"
            },

        );

        form_hub.footer = [{
            text: "IMPORTANT\nThis Barangay Clearance  is not valid without official seal.\nAny erasure  and alternarion invalidates the same.\n",
            bold: true,
            style: "text_center",
            fontSize: 10
        },
        {
            text: "TO BE POSTED INSIDE THE PREMISES OF THE BUSINESS ESTABLISHMENT\n\n\n",
            fontSize: 10,
            style: "text_center"
        }
        ];

        return form_hub;
    }
}