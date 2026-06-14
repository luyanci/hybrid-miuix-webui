<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import {MiuixCard,MiuixSmallTitle,MiuixBasicComponent,MiuixIcon} from 'miuix-vue'
import { Info } from 'miuix-vue/icons'
import { run_hybird_api_command,run_hybird_daemon_status_command } from '../lib/hybrid'

const storage_path = ref('/dev/homo/114514');
const storage_mode = ref('HomoFS');
const actived_count = ref(0);
const kernel_version = ref('5.14.114-homo');
const selinux = ref('Enforcing');
const mount_source = ref('HOMO');
const overlay_count = ref(1);
const magic_count = ref(1);
const kasumi_count = ref(4);


onMounted(async () => {
  const info = await run_hybird_api_command('system-info');
  kernel_version.value = info.kernel;
  selinux.value = info.selinux;
  const storage_info = await run_hybird_api_command('storage');
  storage_mode.value = storage_info.mode;
  storage_path.value = storage_info.path;
  const mounts = await run_hybird_api_command('modules-list');
  actived_count.value = mounts.length;
  const configs = await run_hybird_api_command('config-get');
  mount_source.value = configs.mountsource;
  const daemon_status = await run_hybird_daemon_status_command();
  const mode_stats = daemon_status.mode_stats
  overlay_count.value = mode_stats.overlayfs;
  magic_count.value = mode_stats.magicmount;
  kasumi_count.value = mode_stats.kasumi;
});

</script>

<template>
  <div class="page">
    <MiuixCard class="ex-card ex-card--pad"
      show-indication
      style="--m-card-color: var(--m-color-primary-variant)"> 
      <MiuixBasicComponent :title="t('status.storageTitle')" titleColor="var(--m-color-on-primary-variant)" :summary="storage_path" summaryColor="var(--m-color-on-primary-variant)">
        <template #start>
          <MiuixIcon color="var(--m-color-on-primary-variant)" :icon="Info" />
        </template>
        <template #end>
          <MiuixText style="color:var(--m-color-on-primary-variant);" >{{storage_mode}}</MiuixText>
        </template>
      </MiuixBasicComponent>
    </MiuixCard>
    <div class="ex-card-row">
      <MiuixCard class="ex-card--pad ex-grow">
        <MiuixBasicComponent :title="t('status.moduleActive')">
          <template #end>
            <MiuixText :size="18" weight="medium"><b>{{actived_count}}</b></MiuixText>
          </template>
        </MiuixBasicComponent>
      </MiuixCard>
      <MiuixCard class="ex-card--pad ex-grow">
        <MiuixBasicComponent :title="t('status.mountBase')">
          <template #end>
            <MiuixText :size="18" weight="medium"><b>{{mount_source}}</b></MiuixText>
          </template>
        </MiuixBasicComponent>
      </MiuixCard>

    </div>
    <MiuixSmallTitle :text="t('status.modeStats')" />
    <MiuixCard class="ex-card">
      <div class="ex-basic-row ex-grow">
        <MiuixBasicComponent title="Overlay">
          <template #end>
            <MiuixText>{{overlay_count}}</MiuixText>
          </template>
        </MiuixBasicComponent>
        <MiuixBasicComponent title="Magic">
          <template #end>
            <MiuixText>{{magic_count}}</MiuixText>
          </template>
        </MiuixBasicComponent>
        <MiuixBasicComponent title="Kasumi">
          <template #end>
            <MiuixText>{{kasumi_count}}</MiuixText>
          </template>
        </MiuixBasicComponent>
      </div>
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
.ex-card-row {
  display: flex;
  gap: 12px;
  margin: 0 12px 12px;
}
.ex-basic-row {
  display: flex;
  gap: 12px;
}
.ex-grow {
  flex: 1;
}
</style>
