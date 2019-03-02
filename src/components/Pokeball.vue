<template>
  <div class="pokeball__parent">
    <div class="pokeball">
      <div class="pokeball__main">
        <div class="pokeball__button"></div>
      </div>
    </div>
  </div>
</template>

<script>
// Credit's
// https://codepen.io/raubaca/pen/obaZmG

export default {
  name: 'Pokeball'
}
</script>

<style scoped>
.pokeball__parent {
  position: relative;
  min-height: 250px;
  overflow-y: hidden;
}

.pokeball {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
/* Poké Styles */
.pokeball__main {
  position: relative;
  width: 200px;
  height: 200px;
  background: #fff;
  border: 10px solid #000;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: inset -10px 10px 0 10px #ccc;
  animation: fall .25s ease-in-out,
             shake 1.25s cubic-bezier(.36,.07,.19,.97) 3;
}
.pokeball__main::before,
.pokeball__main::after {
  content:"";
  position: absolute;
}
.pokeball__main::before {
  background: red;
  width: 100%;
  height: 50%;
}
.pokeball__main::after {
  top: calc(50% - 10px);
  width: 100%;
  height: 20px;
  background: #000;
}
.pokeball__button {
  position: absolute;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  width: 60px;
  height: 60px;
  background: #7f8c8d;
  border: 10px solid #fff;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 0 0 10px black;
  animation: blink .5s alternate 7;
}
/* Animation */
@keyframes blink {
  from { background: #eee;}
  to { background: #e74c3c; }
}
@keyframes shake {
  0 { transform: translate(0, 0) rotate(0); }
  20% { transform: translate(-10px, 0) rotate(-20deg); }
  30% { transform: translate(10px, 0) rotate(20deg); }
  50% { transform: translate(-10px, 0) rotate(-10deg); }
  60% { transform: translate(10px, 0) rotate(10deg); }
  100% { transform: translate(0, 0) rotate(0); }
}
@keyframes fall {
  0% { top: -200px }
  60% { top: 0 }
  80% { top: -20px }
  100% { top: 0 }
}
</style>
