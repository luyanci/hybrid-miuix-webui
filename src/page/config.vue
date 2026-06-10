<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getCurrentLangIndex, switchLocale, getSupportedLocales } from '../locales'
import {MiuixCard,MiuixSmallTitle,MiuixText,MiuixSwitch,MiuixButton,MiuixRadioButtonPreference,MiuixDropdownPreference,MiuixInput,MiuixBasicComponent,MiuixIcon} from 'miuix-vue'
import {Folder} from 'miuix-vue/icons'
const { t } = useI18n()

const text1 = ref('')
const text2 = ref('')
const display_list = ref<string[]>([])
const lang_code = ref<string[]>([])
const lang_dropdown_index = ref(0)

const overlay_workmode = ref(0)
const daemon = ref(false)
const umount_enabled = ref(false)
onMounted(async () => {
  const supported_locales = await getSupportedLocales()
  const lang_index= await getCurrentLangIndex()
  lang_dropdown_index.value = lang_index
  display_list.value = supported_locales.map(supported_locales => supported_locales.display)
  lang_code.value = supported_locales.map(supported_locales => supported_locales.code)
})

function handleChange(value: number) {
  switchLocale(lang_code.value[value])
  window.location.reload()
}

</script>

<template>
  <div>
  <MiuixSmallTitle>lang</MiuixSmallTitle>

  <MiuixCard> 
    <MiuixDropdownPreference title="Language" :summary="lang_code[lang_dropdown_index]" v-model="lang_dropdown_index" :items="display_list" />
    <MiuixButton @click="handleChange(lang_dropdown_index)">{{t('config.save')}}</MiuixButton>
  </MiuixCard></div>
  <MiuixSmallTitle>Config</MiuixSmallTitle>
  <MiuixCard> 
    <MiuixBasicComponent :title="t('config.moduleDir')" :summary="t('config.moduleDirDesc')">
      <template #start>
        <MiuixIcon :icon="Folder" />
      </template>
    </MiuixBasicComponent>
    <MiuixCard>
    <MiuixInput v-model="text1" :label="t('config.moduleDir')" single-line />
    </MiuixCard>
  </MiuixCard>
  <div>
    <MiuixCard> 
    <MiuixBasicComponent :title="t('config.mountSource')" :summary="t('config.mountSourceDesc')">
      <template #start>
        <MiuixIcon :icon="Folder" />
      </template>
    </MiuixBasicComponent>
    <MiuixInput v-model="text2" :label="t('config.mountSource')" single-line />
  </MiuixCard>
  </div>
  <div>
  <MiuixCard> 
    <MiuixBasicComponent :title="t('config.overlayMode')" :summary="t('config.overlayModeDesc')">
      <template #start>
        <MiuixIcon :icon="Folder" />
      </template>
    </MiuixBasicComponent>
    <MiuixCard>
      <MiuixRadioButtonPreference :model-value="overlay_workmode === 0" :title="t('config.mode_ext4')" :summary="t('config.mode_ext4Desc')" @select="overlay_workmode = 0"/>
      <MiuixRadioButtonPreference :model-value="overlay_workmode === 1" :title="t('config.mode_tmpfs')" :summary="t('config.mode_tmpfsDesc')" @select="overlay_workmode = 1"/>
    </MiuixCard>
  </MiuixCard></div>
  <MiuixCard>
    <MiuixBasicComponent> 
      <template #start>
        <MiuixText>{{t('config.disableUmount')}}</MiuixText>
      </template>
      <template #end>
        <MiuixSwitch v-model="umount_enabled" label="Enabled" />
      </template>
    </MiuixBasicComponent>
  </MiuixCard>
  <MiuixCard>
    <MiuixBasicComponent> 
      <template #start>
        <MiuixText>{{t('config.daemonStartupMode')}}</MiuixText>
      </template>
      <template #end>
        <MiuixSwitch v-model="daemon" label="Enabled" />
      </template>
    </MiuixBasicComponent>
  </MiuixCard>
</template>
