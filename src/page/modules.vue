<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { MiuixSearchBar,MiuixCard } from 'miuix-vue'
const { t } = useI18n()

const searchQuery = ref('')
const searchexpanded = ref(false)
const searchSuggestions = []
</script>

<template>
  <div class="page">
    <MiuixSearchBar v-model="searchQuery"
    v-model:expanded="searchexpanded"
    :label="t('modules.searchPlaceholder')"
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