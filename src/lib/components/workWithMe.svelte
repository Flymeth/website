<script lang="ts">
  import { reveal } from "svelte-reveal";
</script>

<div
  class="work-with-me"
  use:reveal={{
    reset: true,
    y: 0,
  }}
>
  <h2>Convaincu ?</h2>
  <a href="/contact">
    <button>Travailler avec moi</button>
  </a>
</div>

<style lang="scss">
  @import "$lib/_colors.scss";

  .work-with-me {
    margin: 50px 25px;
    padding: 25px 15px;
    text-align: center;
    border-radius: 5px;
    background-color: rgba($color: $primary, $alpha: 0.25);

    a {
      margin: 15px auto;
      display: inline-block;
    }
  }
</style>
