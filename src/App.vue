<script setup lang="ts">
import { ref,computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  MiuixSnackbarHost,
  MiuixScrollArea,
  MiuixIcon,
  MiuixNavigationBar,
  type MiuixNavigationItem,
  MiuixTopAppBar,
  MiuixIconButton,
  MiuixButton,
  MiuixDialog } from 'miuix-vue'
import {
  ScreenMirroring,
  Settings,
  Tune,
  Info,
  Folder,
  Close2  } from 'miuix-vue/icons'
import { exec } from 'kernelsu'
import { loadLocale } from './locales'

import status from './page/status.vue'
import config from './page/config.vue'
import kasumi from './page/kasumi.vue'
import modules from './page/modules.vue'
import about from './page/about.vue'

const { t } = useI18n()

const Apptitle = t('common.appName')
const Reboottitle = t('common.rebootTitle')
const RebootSummary = t('common.rebootConfirm')

const rebootreq_click = ref(false)


const pages = [status,config,kasumi,modules,about]
const titles = [t('tabs.status'),t('tabs.config'),t('tabs.kasumi'),t('tabs.modules'), t('tabs.info')]
const navItems: MiuixNavigationItem[] = titles.map((label) => ({ label }))
const navicoms = [ScreenMirroring,Settings,Tune,Folder,Info]

const navindex = ref(0)
const activepage = computed(() => pages[navindex.value])
function reboot_system(): void {
    exec('reboot')
}
</script>

<template>
  <div class="app">
  <MiuixScrollArea class="app__body">
        <MiuixTopAppBar :large="false" :title="Apptitle">
        <template #actions>
            <MiuixIconButton aria-label="Toggle" @click="rebootreq_click = true">
                <MiuixIcon :icon="Close2" :size="24" />
            </MiuixIconButton>
        </template>
        </MiuixTopAppBar>

  <Transition name="fade" mode="out-in">
    <div>
      <component :is="activepage" v-if="activepage" />
    </div>
  </Transition>
  </MiuixScrollArea>
  
  <div ref="buttomBarRef" class="app__bottom">
    <MiuixNavigationBar v-model="navindex" :items="navItems">
        <template #icon="{ index }">
            <MiuixIcon :icon="navicoms[index]" :size="20" />
        </template>
    </MiuixNavigationBar>
  </div>
  </div>
  <MiuixSnackbarHost />

  
  <MiuixDialog 
    v-model="rebootreq_click"
    :title="Reboottitle"
    :summary="RebootSummary"
    @close="rebootreq_click = false"> 
        <template #default="{close}">
            <div class="miuix-dialog-actions"> 
                <MiuixButton class="ex-glow" type="Secondary" @click="close">{{t('common.cancel')}}</MiuixButton>
                <MiuixButton class="ex-glow" type="primary" @click="reboot_system">{{t('common.reboot')}}</MiuixButton>
            </div>
        </template>
  </MiuixDialog>
</template>

<style scoped>
html,
body {
  margin: 0;
  height: 100%;
}

body {
  font-family: 'Misans VF', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: var(--m-color-background);
  color: var(--m-color-on-background)
}
.app { 
  &__body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    --m-scroll-area-inset-top: 52px;
  }
  
}
.app__bottom {
  flex: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
}
.miuix-dialog-actions {
    display: flex;
    gap: 12px;
}
.ex-glow {
    flex: 1;
}

</style>