const video = document.querySelector("video");
// const play = document.querySelector(".fa-circle-play");
// const pause = document.querySelector(".fa-circle-pause");
const playPause = document.querySelector(".btn");
const volume = document.querySelector(".volume");
const timing = document.querySelector(".timing");
const currentTime = document.querySelector(".watch-time");
const fullScreen = document.querySelector(".fa-expand");
const mute = document.querySelector(".fa-volume-xmark");
let prevVolume;


document.addEventListener("DOMContentLoaded", () => playPause.classList.add("fa-circle-play"));
document.addEventListener("DOMContentLoaded", () => console.log(video.paused));

function timeParser(time) {
  const minutes = parseInt(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = parseInt(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}


function playOrPause() {
  if (video.paused) {
    playPause.classList.remove("fa-circle-play");
    playPause.classList.add("fa-circle-pause");
    video.play();
  } else {
    playPause.classList.add("fa-circle-play");
    playPause.classList.remove("fa-circle-pause");
    video.pause();
  }
}

playPause.addEventListener("click", () => playOrPause());

mute.addEventListener("click", () => {
  if (video.volume !== 0) {
    prevVolume = video.volume;
    video.volume = 0;
    volume.value = video.volume;
    mute.classList.add("red");
  } else {
    video.volume = prevVolume;
    volume.value = video.volume;
    mute.classList.remove("red");
  }
});

fullScreen.addEventListener("click", () => video.requestFullscreen());

video.addEventListener("click", () => playOrPause());

video.addEventListener("timeupdate", () => {
  currentTime.textContent = `${timeParser(
    parseInt(video.currentTime)
  )} / ${timeParser(parseInt(video.duration))}`;
  timing.value = (video.currentTime / video.duration) * 100;
});

volume.addEventListener("input", () => {
  video.volume = volume.value;
});

timing.addEventListener("input", () => {
  video.currentTime = (timing.value / 100) * video.duration;
});

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      video.currentTime += 5;
      break;
    case "ArrowLeft":
      video.currentTime -= 5;
      break;
    case "ArrowUp":
      if (video.volume <= 0.95) {
        video.volume += 0.05;
        volume.value = video.volume;
      } else {
        video.volume = 1;
        volume.value = video.volume;
      }
      break;
    case "ArrowDown":
      if (video.volume >= 0.05) {
        video.volume -= 0.05;
        volume.value = video.volume;
      } else {
        video.volume = 0;
        volume.value = video.volume;
      }
      break;
  }
});
