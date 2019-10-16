<template>
  <AccountForm MyTitle= "Add Staff" MyButton= "Add Staff" :MyUpdate="false"  :MyDisabled="true"/>
</template>

<script>
import AccountForm from "@/components/AccountForm.vue";
export default {
  components: {
    AccountForm
  },
  mounted() {
    // console.log(AccountForm.titles);
  }
};
</script>
