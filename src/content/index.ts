import './styles.css';

import { isSusDomain } from '../utils';
import { storage } from '../storage';

// Get the current tab's URL
const tabUrl = location.href;

(async () => {
  const { getMotivated, motivatedBy } = await storage.get();

  // Check if the user wants to get motivated
  if (!getMotivated) return;

  // Get motivatedBy video URL
  let videoUrl;
  try {
    videoUrl = chrome.runtime.getURL(`src/assets/${motivatedBy}.mp4`);
    console.log(motivatedBy);
  } catch (e) {
    videoUrl = chrome.runtime.getURL(`src/assets/vergil.mp4`);
    console.error(e);
  }

  const motivatedEl = `
    <div id="get__motivated">
      <video class="motivated__vid" src="${videoUrl}"></video>
      <div class="motivated__box">
          <canvas class="motivated__vid__box"></canvas>
      </div>
    </div>
  `;

  // Check if the URL is sus
  if (await isSusDomain(tabUrl)) {
    // Inject the element into the page
    document.body.insertAdjacentHTML('beforeend', motivatedEl);

    const box: HTMLDivElement = document.querySelector('.motivated__box');
    const video: HTMLVideoElement = document.querySelector('.motivated__vid');
    let width = video.clientWidth;
    let height = video.clientHeight;

    const c: HTMLCanvasElement = document.querySelector('.motivated__vid__box');
    c.setAttribute('width', String(width));
    c.setAttribute('height', String(height));
    const ctx: CanvasRenderingContext2D = c.getContext('2d', {
      willReadFrequently: true,
    });

    video.addEventListener('play', drawVid);
    video.addEventListener('ended', () => {
      const redirs = [
        'https://youtu.be/dQw4w9WgXcQ',
        'https://youtu.be/0YMp8N3zFbE',
      ];
      location.href = redirs.sort(() => 0.5 - Math.random())[0];
    });

    box.addEventListener('click', () => {
      video.play();
    });

    function drawVid() {
      ctx.drawImage(video, 0, 0, width, height);
      // vergil

      // Remove green screen
      let frame = ctx.getImageData(0, 0, width, height);
      if (motivatedBy === 'vergil') {
        for (let i = 0; i < frame.data.length; i += 4) {
          let r = frame.data[i]; // red
          let g = frame.data[i + 1]; // green
          let b = frame.data[i + 2]; // blue
          if (r < 100 && g > 92 && g < 211 && b < 110) {
            frame.data[i + 3] = 0;
          }
        }
      } else if (motivatedBy === 'nanomachines') {
        for (let i = 0; i < frame.data.length; i += 4) {
          let r = frame.data[i]; // red
          let g = frame.data[i + 1]; // green
          let b = frame.data[i + 2]; // blue
          if (r < 100 && g >= 170 && g <= 255 && b < 110) {
            frame.data[i + 3] = 0;
          }
        }
      } else if (motivatedBy === 'kiryu') {
        for (let i = 0; i < frame.data.length; i += 4) {
          let r = frame.data[i]; // red
          let g = frame.data[i + 1]; // green
          let b = frame.data[i + 2]; // blue
          if (r < 90 && g >= 170 && g <= 255 && b < 100) {
            frame.data[i + 3] = 0;
          }
        }
      }
      ctx.putImageData(frame, 0, 0);
      requestAnimationFrame(drawVid);
    }
  }
})();
