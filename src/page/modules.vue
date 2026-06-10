<script setup lang="ts">
import { ref } from 'vue'
import { MiuixSearchBar } from 'miuix-vue'

const search = ref('')
</script>

<template>
  <MiuixSearchBar v-model="search">
    <template #icon>
      <miuix-icon name="search" />
    </template>
  </MiuixSearchBar>
</template>
