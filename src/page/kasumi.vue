<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import {MiuixCard,MiuixSmallTitle,MiuixSwitch,MiuixText,MiuixButton,MiuixRadioButtonPreference,MiuixDropdownPreference,MiuixInput,MiuixBasicComponent,MiuixIcon} from 'miuix-vue'

const kasumi = ref({
  enabled: false
})

</script>

<template>
  <MiuixSmallTitle>Kasumi</MiuixSmallTitle>
  <MiuixCard>
    <MiuixBasicComponent> 
      <template #start>
        <MiuixText>{{t('config.kasumiMasterSwitch')}}</MiuixText>
      </template>
      <template #end>
        <MiuixSwitch v-model="kasumi.enabled" label="Enabled" />
      </template>
    </MiuixBasicComponent>
  </MiuixCard>

</template>
