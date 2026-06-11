<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { MiuixSearchBar,MiuixCard,MiuixSmallTitle } from 'miuix-vue'
const { t } = useI18n()
import { run_hybird_api_command } from '../lib/hybrid'

const searchQuery = ref('')
const searchexpanded = ref(false)
const searchSuggestions = []
const modules_list = ref([])

onMounted(async() => {
  await run_hybird_api_command('modules-list')
  modules_list.value = await run_hybird_api_command('modules-list')
})
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
