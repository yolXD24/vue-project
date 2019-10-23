<template>
  <AccountForm
    MyTitle="Add Staff"
    MyButton="Add Staff"
    :MyUpdate="false"
    Default_Password="docxpress.default"
    :MyDisabled="true"
  />
</template>

<script>
import AccountForm from "@/components/AccountForm.vue";
export default {
  components: {
    AccountForm
  }
};
</script>
