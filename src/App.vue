<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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
const navItems = titles.map((label) => ({ label }))
const navicoms = [ScreenMirroring,Settings,Tune,Folder,Info]

const navindex = ref(0)
const activepage = computed(() => pages[navindex.value])

// Each tab keeps its own scroll position
interface Scroller {
  getScrollTop: () => number
  setScrollTop: (top: number) => void
}
const scrollerRef = ref<Scroller | null>(null)
const scrollPositions = new Map<number, number>()

watch(
  navindex,
  (_next, prev) => {
    scrollPositions.set(prev, scrollerRef.value?.getScrollTop() ?? 0)
  },
  { flush: 'pre' },
)

function onPageEnter(): void {
  scrollerRef.value?.setScrollTop(scrollPositions.get(navindex.value) ?? 0)
}

function reboot_system(): void {
    exec('reboot')
}
</script>

<template>
  <div class="app">
    <!-- The TopAppBar is the screen's top bar -->
    <MiuixScrollArea ref="scrollerRef" class="app__body">
      <MiuixTopAppBar :large="false" :title="Apptitle">
        <template #actions>
          <MiuixIconButton aria-label="Toggle" @click="rebootreq_click = true">
            <MiuixIcon :icon="Close2" :size="24" />
          </MiuixIconButton>
        </template>
      </MiuixTopAppBar>

      <Transition name="page" mode="out-in" @enter="onPageEnter">
        <KeepAlive>
          <component :is="activepage" :key="navindex" v-if="activepage" />
        </KeepAlive>
      </Transition>
    </MiuixScrollArea>
  
    <div class="app__bottom">
      <MiuixNavigationBar v-model="navindex" :items="navItems">
        <template #icon="{ index }">
          <MiuixIcon :icon="navicoms[index]" :size="26" />
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
      <div class="ex-dialog-actions"> 
        <MiuixButton class="ex-grow" @click="close">{{t('common.cancel')}}</MiuixButton>
        <MiuixButton class="ex-grow" type="primary" @click="reboot_system">{{t('common.reboot')}}</MiuixButton>
      </div>
    </template>
  </MiuixDialog>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  min-height: 0;
  background: var(--m-color-surface);

  &__body {
    flex: 1;
    min-height: 0;
    --m-scroll-area-inset-top: 52px;
  }


}
.app__bottom {
  flex:none;
  z-index: 10;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.ex-dialog-actions {
  display: flex;
  gap: 12px;
}

.ex-grow {
  flex: 1;
}
</style>