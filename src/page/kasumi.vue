<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import {MiuixCard,MiuixSmallTitle,MiuixSwitch,MiuixText,MiuixButton,MiuixRadioButtonPreference,MiuixDropdownPreference,MiuixInput,MiuixBasicComponent,MiuixIcon} from 'miuix-vue'
import { Info } from 'miuix-vue/icons'
const kasumi = ref({
  enabled: false
})

</script>

<template>
  <div class="page">
    <MiuixCard class="ex-card ex-card--pad"> 
      <MiuixBasicComponent :title="t('kasumi.title')" :summary="t('kasumi.statusDisabled')">
        <template #start>
          <MiuixIcon :icon="Info" />
        </template>
        <template #end>
          <MiuixSwitch v-model="kasumi.enabled" label="Enabled" />
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
