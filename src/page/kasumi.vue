<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import {MiuixCard,MiuixSmallTitle,MiuixSwitch,MiuixText,MiuixButton,MiuixRadioButtonPreference,MiuixDropdownPreference,MiuixInput,MiuixBasicComponent,MiuixIcon} from 'miuix-vue'
import { Info,Close } from 'miuix-vue/icons'
import { Motion,AnimatePresence } from 'motion-v'
import { run_hybird_daemon_status_command,run_hybird_api_command } from '../lib/hybrid';

const kasumi = ref({
  enabled: false,
  available: false,
  lkm_autoload: true,
  lkm_loaded: false,
  mirror_path: '',
  protocol_version: null,
  rule_count: 0,
  lkm_current_kmi: '',
  
})
const show_lkm_settings = ref(false)
const expandSpring = { type: 'spring' as const, stiffness: 400, damping: 40 }

onMounted(
  async () => { 
    await run_hybird_daemon_status_command().then(async (daemon_status) => { 
      console.log(daemon_status.kasumi);
      kasumi.value = daemon_status.kasumi;
      console.info(kasumi.value);
    });

    await run_hybird_api_command('config-get').then(async (configs) => {
      console.log(configs);
      kasumi.value.enabled = configs.kasumi.enabled;
      console.info(kasumi.value);
    });
  }
)


</script>

<template>
  <div class="page">
    <div v-if="!kasumi.available || !kasumi.lkm_loaded">
      <MiuixCard class="ex-card ex-card--pad"
        show-indication
        style="--m-card-color: var(--m-color-error)"> 
        <MiuixBasicComponent :title="t('kasumi.title')" titleColor="var(--m-color-on-error)">
          <template #start>
            <MiuixIcon :icon="Close" color="var(--m-color-on-error)"/>
          </template>
          <template #end>
            <MiuixText style="color:var(--m-color-on-error);"><b>{{!kasumi.available? t('kasumi.statusUnavailable'):t('kasumi.statusDisabled')}}</b></MiuixText>
          </template>
        </MiuixBasicComponent>
      </MiuixCard>
    </div>
    <div v-else-if="kasumi.available&&kasumi.lkm_loaded"> 
      <MiuixCard class="ex-card ex-card--pad"
        show-indication
        style="--m-card-color: var(--m-color-primary-variant)"> 
        <MiuixBasicComponent :title="t('kasumi.title')" titleColor="var(--m-color-on-primary-variant)" :summary="kasumi.mirror_path" summaryColor="var(--m-color-on-primary-variant)">
          <template #start>
            <MiuixIcon :icon="Info" color="var(--m-color-on-primary-variant)"/>
          </template>
          <template #end>
            <MiuixText :size="18" weight="medium"><b>{{t('kasumi.statusWorking')}}</b></MiuixText>
          </template>
        </MiuixBasicComponent>
      </MiuixCard>
      <div class="ex-card-row">
        <MiuixCard class="ex-card--pad ex-grow">
          <MiuixBasicComponent title="API">
            <template #end>
              <MiuixText :size="18" weight="medium"><b>{{kasumi.protocol_version}}</b></MiuixText>
            </template>
          </MiuixBasicComponent>
        </MiuixCard>
        <MiuixCard class="ex-card--pad ex-grow">
          <MiuixBasicComponent :title="t('kasumi.rulesBadge')">
            <template #end>
              <MiuixText :size="18" weight="medium"><b>{{kasumi.rule_count}}</b></MiuixText>
            </template>
          </MiuixBasicComponent>
        </MiuixCard>
      </div>
    </div>

    <MiuixCard class="ex-card">
      <MiuixBasicComponent> 
        <template #start>
          <MiuixText>{{t('config.kasumiMasterSwitch')}}</MiuixText>
        </template>
        <template #end>
          <MiuixSwitch v-model="kasumi.enabled" label="Enabled" :disabled="!kasumi.available" />
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
            <MiuixBasicComponent :title="t('kasumi.lkmTitle')" :clickable="true" @click="show_lkm_settings = !show_lkm_settings">
              <template #end>
                <MiuixText :size="18" weight="medium">{{t('kasumi.autoloadOn')}}</MiuixText>
              </template>
            </MiuixBasicComponent>
            <Motion v-if="show_lkm_settings" class="ex-expand"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{ height: 'auto', opacity: 1 }"
            :exit="{ height: 0, opacity: 0 }"
            :transition="expandSpring"> 
              <MiuixBasicComponent :title="t('kasumi.currentKmi')">
                <template #end>
                  <MiuixText>{{kasumi.lkm_current_kmi}}</MiuixText>
                </template>
              </MiuixBasicComponent>
            </Motion>
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
