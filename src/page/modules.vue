<script setup lang="ts">
import { ref,onMounted,computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MiuixSearchBar,MiuixCard,MiuixBasicComponent,MiuixSmallTitle,MiuixBottomSheet,MiuixRadioButtonPreference,MiuixArrowPreference,MiuixText,MiuixIcon } from 'miuix-vue'
import { Motion,AnimatePresence } from 'motion-v'
const { t } = useI18n()
import { exec } from 'kernelsu'
import { run_hybird_api_command } from '../lib/hybrid'

const expandSpring = { type: 'spring' as const, stiffness: 400, damping: 40 }

const searchQuery = ref('')
const searchexpanded = ref(false)
const modules_list = ref([])

const filterModules = computed( () => {
  if (searchQuery.value.trim() === '') {
    return modules_list.value
  }
  const query=searchQuery.value.toLowerCase()
  return modules_list.value.filter(module => 
  module.name.toLowerCase().includes(query) ||
  module.description.toLowerCase().includes(query) ||
  module.id.toLowerCase().includes(query))
})

async function get_module_properties(module) {
  const module_properties_path = `${module.source_path}/module.prop`
  const data = (await exec(`cat ${module_properties_path}`)).stdout
  return data
}

onMounted(async () => { 
  modules_list.value = await run_hybird_api_command('modules-list')
  for (let i = 0; i < modules_list.value.length; i++) {
    const a = await get_module_properties(modules_list.value[i])
    a.split('\n').forEach(line => {
      const [key, value] = line.split('=')
      modules_list.value[i][key] = value
    })
    modules_list.value[i]['Bottomopen'] = false
  }
  console.info(modules_list.value)

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
    <div v-if="modules_list.length === 0 || filterModules.length === 0" align="center" >
      <MiuixText class="ex-card">{{t('modules.emptyState')}}</MiuixText>
    </div> 
    <div v-else v-for="module in filterModules" > 
      <MiuixCard class="ex-card">
        <MiuixBasicComponent :title="module.name" :summary='module.id+" "+module.version' :clickable="true" @click='module.Bottomopen = !module.Bottomopen'>
          <template #end>
            <MiuixText type="body2" color="var(--m-color-on-surface-variant-actions)">{{module.is_mounted? "MOUNTED" : "ERROR"}}</MiuixText>
          </template>
        </MiuixBasicComponent>
        <AnimatePresence :initial="false">
          <Motion v-if="module.Bottomopen" class="ex-expand"
                :initial="{ height: 0, opacity: 0 }"
                :animate="{ height: 'auto', opacity: 1 }"
                :exit="{ height: 0, opacity: 0 }"
                :transition="expandSpring">
            <MiuixBasicComponent :summary="module.description" /> 
            <MiuixSmallTitle>{{t('modules.defaultMode')}}</MiuixSmallTitle>
            <div class="ex-basic-row">
              <MiuixRadioButtonPreference class="ex-row-child" :model-value='module.mode === "overlay"' :title="t('modules.modes.short.overlay')" :summary="t('modules.defaultTag')" @click='module.mode = "overlay"'/>
              <MiuixRadioButtonPreference class="ex-row-child" :model-value='module.mode === "magic"' :title="t('modules.modes.short.magic')" :summary="t('modules.compatTag')" @click='module.mode = "magic"'/>
            
              <MiuixRadioButtonPreference class="ex-row-child" :model-value='module.mode === "kasumi"' :title="t('modules.modes.short.kasumi')" :summary="t('modules.nativeTag')" @click='module.mode = "kasumi"'/>
              <MiuixRadioButtonPreference class="ex-row-child" :model-value='module.mode === "ignore"' :title="t('modules.modes.short.ignore')" :summary="t('modules.disableTag')" @click='module.mode = "ignore"'/>
            </div>
            </Motion>
        </AnimatePresence>
      </MiuixCard>
    </div>
  </div>
</template>

<style scoped>
.icon-search {
  padding: 0 0 6px;
}
.ex-card {
  margin: 0 12px 12px;
}
.ex-basic-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.ex-row-child {
  flex: 1;
}
</style>
