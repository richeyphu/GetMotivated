<script lang="ts">
  import { storage, type IMotivatedBy } from 'src/storage';
  import { onMount } from 'svelte';
  
  import MotivatedSwitch from './MotivatedSwitch.svelte';
  import MotivatedOptions from './MotivatedOptions.svelte';

  let motivatedBy: IMotivatedBy = "vergil";
  let getMotivated: boolean = false;

  onMount(() => {
    storage.get().then((storage) => {
      getMotivated = storage.getMotivated;
    });
  });
</script>

<div class="overlay">
  <h1 class="h1">Get Motivated</h1>

  <MotivatedSwitch {getMotivated} />

  <MotivatedOptions {motivatedBy} />
  <h2 class="footer" style="padding-top: 12px;">Need to reload page to apply new settings</h2>

  <h2 class="footer">Stop hornie, be motivated <br /><span style="font-style: italic;">- Vergil<span></h2>
  <img src="../assets/icons/icon16.png" alt="😉" />
</div>

<style>
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: white;
    /* padding: 4px; */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {
    margin: 0;
    font-size: 16px;
    padding-bottom: 6px;
    padding-top: 12px;
  }
  .footer {
    margin: 0;
    font-size: 12px;
    padding-top: 24px;
    padding-bottom: 4px;
    font-weight: normal;
  }
</style>
