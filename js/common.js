function playSound(soundName) {
  document.getElementById(soundName).currentTime = 0;
  document.getElementById(soundName).volume = 0.1;
  if (soundName === "heartPopSound")
    document.getElementById(soundName).volume = 1;
  if (soundName === "loseSound")
    document.getElementById(soundName).volume = 0.4;
  document.getElementById(soundName).play();
}

function showGame(gameName) {
  document.getElementById("match-the-cards").classList.add("hide");
  document.getElementById("mortgage-quiz").classList.add("hide");
  document.getElementById("spin-the-wheel").classList.add("hide");
  document.getElementById(gameName).classList.remove("hide");
}

function refreshGame(gameName) {
  window.location.reload();
  showGame(gameName);
}

var duration = 90;

var x = setInterval(function () {
  // Time calculations for days, hours, minutes and seconds
  var minutes = Math.floor(duration / 60);
  var min = minutes > 9 ? minutes : "0" + minutes;
  var seconds = Math.floor(duration % 60);
  var sec = seconds > 9 ? seconds : "0" + seconds;

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML =
    "Time Remaining: " + min + ":" + sec;

  duration -= 1;

  // If the count down is finished, write some text
  if (duration < 0) {
    clearInterval(x);
    document.getElementById("timer").classList.add("hide");
    document.getElementById("buttons").style.display = "block";
  }
}, 1000);
