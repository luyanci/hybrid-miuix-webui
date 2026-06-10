<script setup lang="ts">
import { ref } from 'vue'
import hybrid from '../assets/icon.svg'

const count = ref(0)
</script>

<template>
  <section id="center">
    <div class="hero">
      <img :src="hybrid" class="base" width="170" height="179" alt="" />
    </div>
    <div>
      <h1>Yet another Get started 2</h1>
      <p>Edit <code>src/App.vue</code> and save to test <code>HMR</code></p>
    </div>
    <button type="button" class="counter" @click="count++">
      Count is {{ count }}
    </button>
  </section>
</template>
