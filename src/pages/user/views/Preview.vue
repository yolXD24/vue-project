<template>
  <pdf :src="dataUrl" style="width: 100%; height :100%"></pdf>
</template>
<script>
import generatePDF from "@/system/functions/generatePDF";
import pdf from "pdfvuer";
import { userPreview } from "@/system/functions/userPreview";
export default {
  name: "Preview",
  components: {
    pdf
  },
  props: {
    info: Object,
    type: String
  },
  data() {
    return {
      createdPDF: null,
      dataUrl:""
    };
  },
  created() {
     var info = {
      firstname: this.info.name.firstName,
      lastname: this.info.name.lastName,
      business: this.info.business,
      address: this.info.address
    };
    userPreview(this.type, info, null)
      .then(res => {
        this.createdPDF = res.pdfPreview;
        this.dataUrl =  res.dataUrl;
      })
      .catch(err => {
        console.log(err);
        
      });
  }
   
};
</script>
