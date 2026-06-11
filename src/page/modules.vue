<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { MiuixSearchBar,MiuixCard,MiuixSmallTitle } from 'miuix-vue'
const { t } = useI18n()

const searchQuery = ref('')
const searchexpanded = ref(false)
const searchSuggestions = []
</script>

<template>
  <div class="page">
    <div class="icon-search">
      <MiuixSearchBar v-model="searchQuery"
      v-model:expanded="searchexpanded"
      :label="t('modules.searchPlaceholder')">
      </MiuixSearchBar>
    </div>
  </div>
</template>

<style scoped>
.icon-search {
  padding: 0 0 6px;
}
</style>
