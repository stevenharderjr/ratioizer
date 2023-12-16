<script>
  import Header from '$lib/Header.svelte';
  import './styles.css';
</script>

<div class="container">
  <div class="contents">
    <slot />
  </div>

  <div class="header-shadow"></div>
  <Header />

  <footer class="footer">
    <p>Copyright © 2023</p>
  </footer>
</div>

<style>
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
  .contents {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 0.5rem;
    overflow: scroll;
    /* overflow-x: hidden; */
    /* padding-top: 2.5rem;
    padding-bottom: 2rem; */
    padding: 2.5rem 1rem 2rem 1rem;
    width: 100%;
    align-items: center;
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