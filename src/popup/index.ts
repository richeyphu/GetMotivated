// @ts-ignore
import Overlay from 'src/components/Overlay.svelte';

import { storage } from 'src/storage';

const target = document.getElementById('app');

function render() {
  storage.get().then(({ getMotivated, motivatedBy }: never) => {
    new Overlay({ target, props: { getMotivated, motivatedBy } });
  });
}

document.addEventListener('DOMContentLoaded', render);
