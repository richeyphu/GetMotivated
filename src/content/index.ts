import './styles.css';
import { isSusDomain } from '../utils';

const videoUrl = chrome.runtime.getURL('src/assets/vergil.mp4');

const motivatedEl = `
  <video class="motivated-vid" src="${videoUrl}"></video>

  <div class="motivated-box">
      <canvas class="motivated-vid-box"></canvas>
  </div>              
`;

// Get the current tab's URL
const tabUrl = location.href;

(async () => {
  // Check if the URL is sus
  if (await isSusDomain(tabUrl)) {
    // Inject the element into the page
    document.body.insertAdjacentHTML('beforeend', motivatedEl);

    const box: HTMLDivElement = document.querySelector('.motivated-box');
    const video: HTMLVideoElement = document.querySelector('.motivated-vid');
    let width = video.clientWidth;
    let height = video.clientHeight;

    const c: HTMLCanvasElement = document.querySelector('.motivated-vid-box');
    c.setAttribute('width', String(width));
    c.setAttribute('height', String(height));
    const ctx = c.getContext('2d');

    video.addEventListener('play', drawVid);
    video.addEventListener('ended', () => {
      location.href = 'https://youtu.be/dQw4w9WgXcQ';
    });

    box.addEventListener('click', () => {
      video.play();
    });

    function drawVid() {
      ctx.drawImage(video, 0, 0, width, height);

      // Remove green screen
      let frame = ctx.getImageData(0, 0, width, height);
      for (let i = 0; i < frame.data.length; i += 4) {
        let r = frame.data[i]; // red
        let g = frame.data[i + 1]; // green
        let b = frame.data[i + 2]; // blue
        if (r < 100 && g > 92 && g < 211 && b < 110) {
          frame.data[i + 3] = 0;
        }
      }
      ctx.putImageData(frame, 0, 0);

      requestAnimationFrame(drawVid);
    }
  }
})();
