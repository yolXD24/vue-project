<template>
  <pdf
    v-if="preview"
    :src="createdPDF"
    @page-loaded="preview = true"
    style="width: 45%; height :100%"
  ></pdf>
</template>
<script>
import generatePDF from "@/system/functions/generatePDF";
import pdf from "vue-pdf";

export default {  
  components: {
    pdf
  },
  data(){
    return{
      createdPDF = null
    }
  }
}
</script>
