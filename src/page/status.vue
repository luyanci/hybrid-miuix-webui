<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import {MiuixCard,MiuixSmallTitle,MiuixText,MiuixSwitch,MiuixButton,MiuixRadioButtonPreference,MiuixDropdownPreference,MiuixInput,MiuixBasicComponent,MiuixIcon} from 'miuix-vue'


const count = ref(0)
</script>

<template>
  <div class="page">
    <MiuixSmallTitle :text="t('status.storageTitle')" />
    <MiuixCard class="ex-card ex-card--pad" style="--m-card-color: var(--m-color-primary-variant);"> 
      <MiuixText :size="17"
       weight="semibold"
       color="var(--m-color-on-primary-variant)">{{t("status.storageTitle")}}</MiuixText>
      <MiuixText :size="19" color="var(--m-color-on-primary-variant)">Ext4</MiuixText>
    </MiuixCard>

    <MiuixSmallTitle :text="t('status.sysInfoTitle')" />
    <MiuixCard class="ex-card">
      <MiuixBasicComponent :title="t('status.kernel')" :summary="t('config.moduleDirDesc')" /> 
      <MiuixBasicComponent :title="t('status.selinux')" :summary="t('config.moduleDirDesc')" /> 
    </MiuixCard>

    <MiuixSmallTitle :text="t('status.activePartitions')" />
  </div>
</template>

<style scoped>
.ex-card {
  margin: 0 12px 12px;

  &--pad .m-card {
    padding: 16px;
  }
}
</style>
