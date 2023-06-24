<script>
  import { storage } from '../storage';
  export let getMotivated;

  function toggle() {
    if (getMotivated) {
      getMotivated = false;
    } else {
      getMotivated = true;
    }
    storage.set({ getMotivated });
  }
</script>

<div class="container">
  <button
    style:background-color={getMotivated ? '#2ecc71' : '#e74c3c'}
    class="btn"
    on:click={toggle}
  >
    <h1>{getMotivated ? 'ON' : 'OFF'}</h1>
  </button>
</div>

<style>
  .container {
    width: 150px;
    height: 150px;
  }
  .btn {
    width: 100%;
    height: 100%;
    background-color: black;
    color: #ecf0f1;
    padding: 50px 50px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-size: 48px;
    font-weight: bold;
  }
</style>
