<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { exec } from 'kernelsu'
import {MiuixCard,MiuixSmallTitle,MiuixText,MiuixSwitch,MiuixButton,MiuixRadioButtonPreference,MiuixDropdownPreference,MiuixInput,MiuixBasicComponent,MiuixIcon} from 'miuix-vue'
import { Info } from 'miuix-vue/icons'

const storage = ref('Ext4');
const kernel_version = ref('5.14.114-homo');
const selinux = ref('Enforcing');


onMounted(async () => {
  const kversion = await exec('uname -r')
  kernel_version.value = kversion.stdout
  const selinux_status = await exec('getenforce')
  selinux.value = selinux_status.stdout
});

</script>

<template>
  <div class="page">
    <MiuixCard class="ex-card ex-card--pad"> 
      <MiuixBasicComponent :title="t('status.storageTitle')" :summary="storage">
        <template #start>
          <MiuixIcon :icon="Info" />
        </template>
      </MiuixBasicComponent>
    </MiuixCard>

    <MiuixSmallTitle :text="t('status.sysInfoTitle')" />
    <MiuixCard class="ex-card">
      <MiuixBasicComponent :title="t('status.kernel')" :summary="kernel_version" /> 
      <MiuixBasicComponent :title="t('status.selinux')" :summary="selinux" /> 
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
