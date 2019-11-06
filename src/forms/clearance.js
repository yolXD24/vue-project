export default {
  name: "clearance",
  generate(fullname, incharge, form_hub, details) {
    form_hub.content.push(
      {
        text: [
          {
            text:
              "Republic of the Philippines\nProvince of Cebu\nCity of Cebu\n"
          },
          { text: "Barangay Talamban ", bold: true },
          { text: "\n\nOFFICE OF THE BARANGAY COUNCIL\n\n\n", fontSize: 12 },

          {
            text: "B A R A N G A Y\tC L E A R A C E \n\n",
            style: "text_center",
            fontSize: 18
          },
          {
            text: "\n\n\nTO WHOM IT MAY CONCERN:\n\n\t",
            style: ["text_justify"],
            fontSize: 12
          },
          {
            text: "\t\t\tTHIS IS TO CERTIFY that ",
            preserveLeadingSpaces: true,
            fontSize: 12
          },
          { text: fullname + " ", bold: true },
          { text: "a resident of  " },
          { text: "Adress ", bold: true },
          {
            text: "has the intention to construct / demolish / excavate ",
            style: "text_justify"
          },
          { text: "Purpose ", bold: true },
          {
            text:
              "in this . It is further certified that the Barangay interposes no objection on the said project.\n\n\t\t\t\tISSUED upon the request of the above-named person for whatever legal purposes.\n\n\t\t\t\tGIVEN this  ",
            style: "text_justify"
          },
          { text: details.date.day + "th ", bold: true },
          { text: "day of  " },
          {
            text:
              details.date.month +
              " , " +
              details.date.year +
              ". \n\n\n\n\n\n\n\n",
            bold: true
          }
        ], //end of text array

        style: ["text_center"]
      },
      {
        columns: [
          { text: incharge, style: "text_justify" },
          { text: "Kapitan name", style: "text_right" }
        ],
        style: "text_center"
      },
      {
        columns: [
          { text: "\nIssued By", style: ["text_justify", "header"] },
          { text: "\nPunong Barangay", style: ["text_right", "header"] }
        ],
        style: "text_center"
      }
    ); //end of push function
    return form_hub;
  }
};
