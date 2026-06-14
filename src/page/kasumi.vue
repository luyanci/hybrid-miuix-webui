<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import {MiuixCard,MiuixSmallTitle,MiuixSwitch,MiuixText,MiuixButton,MiuixRadioButtonPreference,MiuixDropdownPreference,MiuixInput,MiuixBasicComponent,MiuixIcon} from 'miuix-vue'
import { Info } from 'miuix-vue/icons'
import { Motion,AnimatePresence } from 'motion-v'
const kasumi = ref({
  enabled: false
})
const expandSpring = { type: 'spring' as const, stiffness: 400, damping: 40 }

</script>

<template>
  <div class="page">
    <MiuixCard class="ex-card ex-card--pad"
      show-indication
      style="--m-card-color: var(--m-color-error)"> 
      <MiuixBasicComponent :title="t('kasumi.title')" titleColor="var(--m-color-on-error)" :summary="t('kasumi.statusDisabled')" summaryColor="var(--m-color-on-error)">
        <template #start>
          <MiuixIcon :icon="Info" color="var(--m-color-on-error)"/>
        </template>
      </MiuixBasicComponent>

    </MiuixCard>
    <MiuixCard class="ex-card">
      <MiuixBasicComponent> 
        <template #start>
          <MiuixText>{{t('config.kasumiMasterSwitch')}}</MiuixText>
        </template>
        <template #end>
          <MiuixSwitch v-model="kasumi.enabled" label="Enabled" />
        </template>
      </MiuixBasicComponent>
    </MiuixCard>
    <AnimatePresence :initial="false">
      <Motion v-if="kasumi.enabled" class="ex-expand"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{ height: 'auto', opacity: 1 }"
            :exit="{ height: 0, opacity: 0 }"
            :transition="expandSpring">
        <MiuixCard class="ex-card">
          <MiuixBasicComponent> 
            <template #start>
              <MiuixText>{{t('config.kasumiMasterSwitch')}}</MiuixText>
            </template>
            <template #end>
              <MiuixSwitch v-model="kasumi.enabled" label="Enabled" />
            </template>
          </MiuixBasicComponent>
        </MiuixCard>
      </Motion>
    </AnimatePresence>
  </div>
</template>

<style scoped>
.ex-card {
  margin: 0 12px 12px;

  &--pad .m-card {
    padding: 16px;
  }
}
.ex-card-row {
  display: flex;
  gap: 12px;
  margin: 0 12px 12px;
}
.ex-expand {
  overflow: hidden;
}
</style>
