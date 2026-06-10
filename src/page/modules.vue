<script setup lang="ts">
import { ref } from 'vue'
import { MiuixSearchBar } from 'miuix-vue'

const searchQuery = ref('')
const searchexpanded = ref(false)
const searchSuggestions = []
</script>

<template>
  <div class="page">
    <MiuixSearchBar v-model="searchQuery"
    v-model:expanded="searchexpanded"
    label="Search"
    class="searchbar">
    </MiuixSearchBar>
</div>
</template>

<style scoped>
.page {
  padding: 12px;
  margin-bottom: 12px;

}
.searchbar {
  margin-bottom: 12px;
}
</style>