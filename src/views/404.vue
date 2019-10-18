<template>
  <center>
    <br /><br />
    <br /><br />
    <div class="fof">
      <h1>Page Not Found ....</h1>
    </div>
    <a href="/home">back to home</a>
  </center>
</template>
<style scoped>
* {
  transition: all 0.6s;
}

body {
  font-family: "Lato", sans-serif;
  color: #888 !important;
  margin: 0;
}

h1 {
  font-size: 50px;
  display: inline-block;
  text-align: center;
  color: #888 !important;
  padding-right: 12px;
  animation: type 0.5s alternate infinite;
}

@keyframes type {
  from {
    box-shadow: inset -3px 0px 0px #888;
  }
  to {
    box-shadow: inset -3px 0px 0px transparent;
  }
}
</style>
