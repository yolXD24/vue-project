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
import {userPreview} from "@/system/functions/userPreview"
export default {  
  components: {
    pdf
  },
  props :{
 info:Object,
 type:String
 },
  data(){
    return{
      createdPDF = null
    }
  },
  mounted(){
  userPreview(type,this.info).then(res=>{
  this.createdPDF = res.pdfPreview;
  }).catch(err=>{
  console.log(err)
  })
  }
}
</script>
