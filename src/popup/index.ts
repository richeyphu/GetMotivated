import Overlay from 'src/components/Overlay.svelte';
import { storage } from 'src/storage';

const target = document.getElementById('app');

function render() {
  storage.get().then(({ getMotivated }) => {
    new Overlay({ target, props: { getMotivated } });
  });
}

document.addEventListener('DOMContentLoaded', render);
