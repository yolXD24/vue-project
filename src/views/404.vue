<template>
  <v-container fluid>
    <br><br><br>
    <v-row
      id="content"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="5"
      >
        <center>
          <!-- <v-card
            class=" mx-lg-auto pa-4"
            style="background-color:rgba(0,0,0,0.7)"
          > <br><br>
            <v-card-text>
              <v-layout align-center>
                <v-flex text-center>
                  <h1 class="display-4 white--text font-weight-bold">Whoops!</h1>
                  <br>
                  <p class="title blue--text lighten-3 font-italic">The page you were looking for does not exist..</p> <br>

                  <v-btn
                    to="/"
                    outlined
                    color="blue"
                    width="210"
                    rounded
                  >
                    Back to Home
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>

            <br><br>
          </v-card> -->

          <div class="wrapper">
            <h1>Hmm...</h1>
            <p>Page not found!</p>
            <div class="buttons"><a href="#">back</a><a href="#">home</a><br><span>Help me out</span></div>
          </div>
          <div class="space">
            <div class="blackhole"></div>
            <div class="ship"></div>
          </div>
        </center>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
*, :before, :after {
  box-sizing: border-box;
}

.y {
  display: flex;
  align-items: center;
  background: #E3F2FD;
  min-width: 275px;
  height: 100vh;
  margin: 0 10vw;
  overflow: hidden;
  color: #138FF2;
  font-family: Roboto;
}

.wrapper {
  flex-grow: 2;
  width: 40vw;
  max-width: 500px;
  margin: 0 auto;
}

h1 {
  margin: 0;
  font-size: 6em;
  font-weight: 100;
}

p {
  width: 95%;
  font-size: 1.5em;
  line-height: 1.4;
}

.buttons {
  white-space: nowrap;
  display: inline-block;
}

span {
  display: block;
  text-transform: uppercase;
  color: #B9DDFB;
  letter-spacing: 1.5px;
  text-align: center;
}
a {
  display: inline-block;
  padding: .8em 1em;
  margin-right: 1em;
  margin-bottom: 1em;
  border: 3px solid #B9DDFB;
  color: #138FF2;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: .2em;
  position: relative;
  overflow: hidden;
  transition: .3s;
  &:hover {
    color: #E3F2FD;
    &:before {
      top: 0;
    }
  }
  &:before {
    content: '';
    background: #138FF2;
    height: 100%;
    width: 100%;
    position: absolute;
    top: -100%;
    left: 0;
    transition: .3s;
    z-index: -1;
  }
}

// BLACKHOLE

$size: 75px;
$border: $size/15;

.space {
  width: $size;
  height: calc(50vh + #{$size/2});
  border-top-left-radius: $size/2;
  border-top-right-radius: $size/2;
  overflow: hidden;
  margin: calc(50vh - #{$size/2}) auto 0 auto;
  position: relative;
  pointer-events: none;
  -webkit-transform: translateZ(0);
}

.blackhole {
  border: $border solid #1674D1;
  height: $size;
  width: $size;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  &:after {
    content: '';
    height: calc(100% + #{$border*2});
    width: calc(100% + #{$border*2});
    border: $border solid #1674D1;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-radius: 50%;
    position: absolute;
    top: -$border;
    left: -$border;
    z-index: 5;
    transform: rotate(45deg);
  }
}

.ship {
  height: $size*2;
  width: $size - $border*4;
  margin-left: $border*2;
  background: url("https://cbwconline.com/IMG/Codepen/Space%20Ship.svg") center/contain no-repeat;
  animation: blackhole 4s infinite linear;
  position: absolute;
  bottom: -$size*2;
}

@keyframes blackhole {
  to {
    transform: translateY(-100vh);
  }
}

@media (max-width: 600px) {
  body {margin: 0 5vw}
}
</style>
