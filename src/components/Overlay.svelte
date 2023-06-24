<script lang="ts">
  import { storage, type IMotivatedBy } from 'src/storage';
  import { onMount } from 'svelte';
  
  import MotivatedSwitch from './MotivatedSwitch.svelte';

  // let motivatedBy: IMotivatedBy = "none";
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
  <h2 class="footer">be motivated</h2>
  <!-- <Options {motivatedBy} /> -->
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
  .h1 {
    margin: 0;
    font-size: 16px;
    padding-bottom: 6px;
    padding-top: 12px;
  }
  .footer {
    margin: 0;
    font-size: 12px;
    padding-top: 36px;
    padding-bottom: 4px;
    font-weight: normal;
  }
</style>
