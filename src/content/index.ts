// import './styles.css';

const videoUrl = chrome.runtime.getURL('src/assets/vergil.mp4');

const vergilEl = `
<style>
.motivated-vid {
    position: absolute;
    opacity: 0;
    width: 100vw;
    height: 100vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .motivated-vid-box {
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  </style>

<video class="motivated-vid" src="${videoUrl}"></video>

    <div class="motivated-box">
      <canvas class="motivated-vid-box"></canvas>
    </div>

    <script>
      const box = document.querySelector('.motivated-box');
      const video = document.querySelector('.motivated-vid');
      let width = video.clientWidth;
      let height = video.clientHeight;

      const c = document.querySelector('canvas');
      c.setAttribute('width', width);
      c.setAttribute('height', height);
      const ctx = c.getContext('2d');

      video.addEventListener('play', drawVid);
      video.addEventListener('ended', () => {
        location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
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
    </script>
`;

document.body.insertAdjacentHTML('beforeend', vergilEl);
