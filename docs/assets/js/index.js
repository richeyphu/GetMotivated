const video = document.querySelector('.vid');
let width = video.clientWidth;
let height = video.clientHeight;

const c = document.querySelector('.vid-canvas');
c.setAttribute('width', width);
c.setAttribute('height', height);
const ctx = c.getContext('2d', { willReadFrequently: true });

video.addEventListener('play', drawVid);

function drawVid() {
  ctx.drawImage(video, 0, 0, width, height);

  // Remove green screen
  let frame = ctx.getImageData(0, 0, width, height);
  for (let i = 0; i < frame.data.length; i += 4) {
    let r = frame.data[i]; // Red
    let g = frame.data[i + 1]; // Green
    let b = frame.data[i + 2]; // Blue
    if (r < 100 && g > 92 && g < 211 && b < 105) {
      frame.data[i + 3] = 0;
    }
  }
  ctx.putImageData(frame, 0, 0);

  requestAnimationFrame(drawVid);
}
