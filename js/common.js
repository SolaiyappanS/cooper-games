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
  if (gameName === "match-the-cards") showPoints(0);
  else if (gameName === "mortgage-quiz") showPoints(1);
  else if (gameName === "spin-the-wheel") showPoints(2);
}

function refreshGame(gameName) {
  window.location.reload();
  showGame(gameName);
}

var duration = 90;

var xInterval = setInterval(function () {
  // Time calculations for days, hours, minutes and seconds
  var minutes = Math.floor(duration / 60);
  var min = minutes > 9 ? minutes : "0" + minutes;
  var seconds = Math.floor(duration % 60);
  var sec = seconds > 9 ? seconds : "0" + seconds;

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML = min + ":" + sec;

  duration -= 1;

  if (duration < 30) {
    document.getElementById("timer-container").classList.add("danger");
  }

  // If the count down is finished, write some text
  if (duration < 0) {
    clearInterval(xInterval);
    document.getElementById("timer-container").classList.add("hide");
    document.getElementById("you-lost").style.display = "block";
    playSound("loseSound");
  }
}, 1000);

var gamePoints = [0, 0, 0];

function showPoints(gameNumber) {
  document.getElementById("current-score").innerHTML = gamePoints[gameNumber];
  document.getElementById("total-score").innerHTML =
    gamePoints[0] + gamePoints[1] + gamePoints[2];
}
