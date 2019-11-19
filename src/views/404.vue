<template>
  <v-container fluid>
    <br />
    <br />
    <br />
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>
            4<span>O</span>4
          </h1>
        </div>
        <h2 class="font-italic">the page you requested is not found</h2>
        <v-btn @click="$router.go(-1)" color="primary" outlined rounded width ="200" large>Back</v-btn>
      </div>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>



#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.notfound {
  max-width: 767px;
  width: 100%;
  line-height: 1.4;
  padding: 110px 40px;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.1);
}

.notfound .notfound-404 {
  position: relative;
  height: 180px;
}

.notfound .notfound-404 h1 {
  font-family: "Roboto", sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 165px;
  font-weight: 700;
  margin: 0px;
  color: white;
  text-transform: uppercase;
}

.notfound .notfound-404 h1 > span {
  color: #00b7ff;
}

.notfound h2 {
  font-family: "Roboto", sans-serif;
  font-size: 22px;
  font-weight: 400;
  text-transform: uppercase;
  margin-top: 0px;
  margin-bottom: 25px;
  color:   #00b7ff;
}

@media only screen and (max-width: 767px) {
  .notfound h2 {
    font-size: 18px;
  }
}

@media only screen and (max-width: 480px) {
  .notfound .notfound-404 h1 {
    font-size: 141px;
  }
}
</style>
