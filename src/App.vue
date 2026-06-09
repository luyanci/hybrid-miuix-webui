<script setup lang="ts">
import { ref,computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { MiuixSnackbarHost,MiuixScrollArea } from 'miuix-vue'
import { MiuixIcon,MiuixNavigationBar,type MiuixNavigationItem } from 'miuix-vue'
import { ScreenMirroring,Settings,Tune,Info,Folder } from 'miuix-vue/icons'

import miuixhello from './page/miuixhello.vue'
import HelloWorld from './page/HelloWorld.vue'
import Topbar from './components/Topbar.vue'

const { t } = useI18n()

const pages = [HelloWorld,miuixhello,HelloWorld,HelloWorld,miuixhello]
const titles = [t('tabs.status'),t('tabs.config'),t('tabs.kasumi'),t('tabs.modules'), t('tabs.info')]
const navItems: MiuixNavigationItem[] = titles.map((label) => ({ label }))
const navicoms = [ScreenMirroring,Settings,Tune,Folder,Info]

const navindex = ref(0)
const activepage = computed(() => pages[navindex.value])
</script>

<template>
    <Topbar />

  <MiuixScrollArea>
  <Transition name="fade">
    <component :is="activepage" v-if="activepage" />
  </Transition>
  </MiuixScrollArea>
  
  <div ref="buttomBarRef" class="app__bottom">
    <MiuixNavigationBar v-model="navindex" :items="navItems">
        <template #icon="{ index }">
            <MiuixIcon :icon="navicoms[index]" :size="20" />
        </template>
    </MiuixNavigationBar>
  </div>
  <MiuixSnackbarHost />
</template>

<style scoped>
.app__bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>