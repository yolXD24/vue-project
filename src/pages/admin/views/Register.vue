<template>
  <AccountForm
    MyTitle="Add Staff"
    MyButton="Add Staff"
    :MyUpdate="false"
    Default_Password="docxpress.default"
    @accountFormResponse="app_notify"
    :MyDisabled="true"
  />
</template>

<script>
import AccountForm from "@/admin/components/AccountForm.vue";
export default {
  components: {
    AccountForm
  },
  methods: {
    app_notify(msg) {
      this.$emit("notify", msg);
    }
  }
};
</script>
