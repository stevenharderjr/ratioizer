<script>
  // import Header from '$lib/Header.svelte';
  import Toast from '$lib/Toast.svelte';
  import { toasts, blur } from '../stores'
  import './styles.css';
</script>

<div class="container">
  <div class="content">
    <slot />
  </div>

  <div class="header-shadow"></div>
  <!-- <Header /> -->

  <footer class="footer">
    <p>Copyright © Steven Harder 2023</p>
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
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: space-between;
    overflow: hidden;
  }
  .header-shadow {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 0.5rem;
    background-image: linear-gradient(#0006, #0000);
  }
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    /* padding-top: 2.5rem;
    padding-bottom: 2rem; */
    padding: 1.25rem 0.75rem 6rem 0.75rem;
    /* padding-top: calc(1.15rem + var(--header-height)); */
    justify-content: center;
  }
  .footer {
    position: absolute;
    padding-top: 2px;
    padding-bottom: env(safe-area-inset-bottom, 2px);
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(#fff0, #ffff);
    font-size: x-small;
    text-align: center;
  }
</style>