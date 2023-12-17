<script>
  import Header from '$lib/Header.svelte';
  import Toast from '$lib/Toast.svelte';
  import { toasts, blur } from '../stores'
  import './styles.css';
</script>

<div class="container">
  <div class="content">
    <slot />
  </div>

  <div class="header-shadow"></div>
  <Header />

  <footer class="footer">
    <p>Copyright © 2023</p>
  </footer>
  {#if $blur}
    <div class="blur" />
  {/if}
  {#if toasts}
    <Toast toasts={$toasts} />
  {/if}
</div>

<style>
  .blur {
    backdrop-filter: blur(4px);
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .container {
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: space-between;
    /* overflow: hidden; */
  }
  .header-shadow {
    position: absolute;
    left: 0;
    top: 2rem;
    right: 0;
    height: 0.5rem;
    background-image: linear-gradient(#0006, #0000);
  }
  .content {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 0.5rem;
    overflow-y: scroll;
    overflow-x: hidden;
    /* padding-top: 2.5rem;
    padding-bottom: 2rem; */
    padding: 3rem 0.75rem 6rem 0.75rem;
    width: 100%;
    justify-content: center;
  }
  .footer {
    position: absolute;
    padding: 2px;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(#fff0, #ffff);
    font-size: x-small;
    text-align: center;
  }
</style>