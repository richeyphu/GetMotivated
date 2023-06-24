<script lang="ts">
  import { storage, motivatedByList } from 'src/storage';
  export let motivatedBy;

  function selectMotivation(motivation) {
    motivatedBy = motivation;
    storage.set({ motivatedBy });
  }
</script>

<h1>Motivated by: <span style="color:red">{motivatedBy}</span></h1>
<div class="container">
  {#each motivatedByList as motivation}
    <button on:click={()=>selectMotivation(motivation)}>{motivation}</button>
  {/each}
</div>

<style>
  h1 {
    margin: 0;
    font-size: 16px;
    padding-bottom: 6px;
    padding-top: 18px;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    background-color: blue;
    color: #ecf0f1;
    transition: background-color 0.3s;
    padding: 5px 10px;
    margin: 2px;
    border: none;
  }

  button:hover,
  button:focus {
    background-color: #27ae60;
  }
</style>
