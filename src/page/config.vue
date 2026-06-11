<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getCurrentLangIndex, switchLocale, getSupportedLocales } from '../locales'
import {MiuixCard,MiuixSmallTitle,MiuixText,MiuixSwitch,MiuixButton,MiuixRadioButtonPreference,MiuixDropdownPreference,MiuixInput,MiuixBasicComponent,MiuixIcon} from 'miuix-vue'
import {FolderFill,MoveFile,Settings} from 'miuix-vue/icons'
import { run_hybird_api_command } from '../lib/hybrid';
const { t } = useI18n()

const text1 = ref('')
const text2 = ref('')
const display_list = ref<string[]>([])
const lang_code = ref<string[]>([])
const lang_dropdown_index = ref(0)

const overlay_workmode = ref(0)
const daemon = ref(false)
const umount_disabled = ref(false)
onMounted(async () => {
  const supported_locales = await getSupportedLocales()
  const lang_index= await getCurrentLangIndex()
  lang_dropdown_index.value = lang_index
  display_list.value = supported_locales.map(supported_locales => supported_locales.display)
  lang_code.value = supported_locales.map(supported_locales => supported_locales.code)

  const configs = await run_hybird_api_command('config-get')
  text1.value = configs.moduledir
  text2.value = configs.mountsource
  overlay_workmode.value = configs.overlay_mode === 'ext4' ? 1 : 0
  umount_disabled.value = configs.disable_umount
  daemon.value = configs.daemon_startup_mode == 'persistent' ? true : false
})

function handleChange(value: number) {
  switchLocale(lang_code.value[value])
  window.location.reload()
}

</script>

<template>
  <div class="page">
    <MiuixSmallTitle :text="t('config.webui')" />
    <MiuixCard class="ex-card"> 
      <MiuixDropdownPreference :title="t('common.language')" :summary="lang_code[lang_dropdown_index]" v-model="lang_dropdown_index" :items="display_list" />
      <div style="padding: 12px;">
        <MiuixButton @click="handleChange(lang_dropdown_index)">{{t('config.save')}}</MiuixButton>
      </div>
    </MiuixCard>

    <MiuixSmallTitle :text="t('tabs.config')" />
    <MiuixCard class="ex-card"> 
      <MiuixBasicComponent :title="t('config.moduleDir')" :summary="t('config.moduleDirDesc')">
        <template #start>
          <MiuixIcon :icon="FolderFill" />
        </template>
      </MiuixBasicComponent>
      <div style="padding: 0 16px 16px;">
        <MiuixInput v-model="text1" :label="t('config.moduleDir')" single-line />
      </div>
    </MiuixCard>

    <MiuixCard class="ex-card"> 
      <MiuixBasicComponent :title="t('config.mountSource')" :summary="t('config.mountSourceDesc')">
        <template #start>
          <MiuixIcon :icon="MoveFile" />
        </template>
      </MiuixBasicComponent>
      <div style="padding: 0 16px 16px;">
        <MiuixInput v-model="text2" :label="t('config.mountSource')" single-line />
      </div>
    </MiuixCard>

    <MiuixCard class="ex-card"> 
      <MiuixBasicComponent :title="t('config.overlayMode')" :summary="t('config.overlayModeDesc')">
        <template #start>
          <MiuixIcon :icon="Settings" />
        </template>
      </MiuixBasicComponent>
      <MiuixRadioButtonPreference :model-value="overlay_workmode === 0" :title="t('config.mode_tmpfs')" :summary="t('config.mode_tmpfsDesc')" @select="overlay_workmode = 0"/>
      <MiuixRadioButtonPreference :model-value="overlay_workmode === 1" :title="t('config.mode_ext4')" :summary="t('config.mode_ext4Desc')" @select="overlay_workmode = 1"/>
    </MiuixCard>

    <MiuixCard class="ex-card">
      <MiuixBasicComponent> 
        <template #start>
          <MiuixText>{{t('config.disableUmount')}}</MiuixText>
        </template>
        <template #end>
          <MiuixSwitch v-model="umount_disabled" label="Enabled" />
        </template>
      </MiuixBasicComponent>
    </MiuixCard>

    <MiuixCard class="ex-card">
      <MiuixBasicComponent> 
        <template #start>
          <MiuixText>{{t('config.daemonStartupMode')}}</MiuixText>
        </template>
        <template #end>
          <MiuixSwitch v-model="daemon" label="Enabled" />
        </template>
      </MiuixBasicComponent>
    </MiuixCard>
  </div>
</template>

<style scoped>
.ex-card {
  margin: 0 12px 12px;
}
</style>
