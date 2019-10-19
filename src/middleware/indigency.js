export default {
    name: "indigency",
    generate(fullname, incharge, form_hub) {
        form_hub.content.push({
            text: [{
                    text: "Republic of the Philippines\nProvince of Cebu\nCity of Cebu\n"
                },
                { text: "Barangay Talamban ", bold: true },
                { text: "\n\nOFFICE OF THE BARANGAY COUNCIL\n\n", fontSize: 12 },
                {
                    text: "\nC E R T I F I C A T E\t O F\tI N D I G E N C Y\n\n",
                    fontSize: 17,
                    style: ["header"]
                },
                {
                    text: "\nTO WHOM IT MAY CONCERN:\n\n\t",
                    style: ["text_justify"],
                    fontSize: 12
                },
                {
                    text: "\t\t\tThis is to certify that ",
                    preserveLeadingSpaces: true,
                    fontSize: 12
                },
                { text: fullname + " ", bold: true },
                {
                    text: "of legal age , is a bonafide resident of Barangay Talamban , Cebu City , Cebu. The said person is of good moral character and an active member of the communtity.He / She is one of those who belongs to a low-income family.\n\n\t  ",
                    style: ["text_justify"]
                },
                {
                    text: "\t\t\tThis certification is being issued upon  the request of the above-named person  for whatever purposes it may serve him /her best.\n\n\t\t\t\tGiven this 27th day of October  at Barangay Talamban , Cebu City , Cebu.\n\n\n\n",
                    preserveLeadingSpaces: true,
                    fontSize: 12,
                    style: "text_justify"
                },
                {
                    text: "\n\n\n\n" + incharge,
                    style: ["header", "text_right"]
                },
                { text: "\nPunong Barangay", style: ["text_right"] }
            ],
            style: ["text_center"]
        })

        form_hub.styles = {
            text_center: {
                alignment: "center"
            },
            text_justify: {
                alignment: "justify"
            },
            text_right: {
                alignment: "right"
            },
            logo_left: {
                alignment: "justify"
            },
            logo_right: {
                alignment: "right"
            },
            header: {
                fontSize: 14,
                bold: true
            },
            sub_header: {},
            greetings: {},
            footer: {}
        }

        return form_hub;
    }
}