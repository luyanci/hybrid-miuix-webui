<script setup lang="ts">
import { ref,computed } from 'vue'
import { MiuixSnackbarHost,MiuixScrollArea } from 'miuix-vue'
import { MiuixIcon,MiuixNavigationBar,type MiuixNavigationItem } from 'miuix-vue'
import { ScreenMirroring,Settings,Info,Folder } from 'miuix-vue/icons/extended'

import miuixhello from './page/miuixhello.vue'
import HelloWorld from './page/HelloWorld.vue'
import Topbar from './components/Topbar.vue'

const pages = [HelloWorld,miuixhello,HelloWorld,miuixhello]
const titles = ['Home','Configure','Modules', 'About']
const navItems: MiuixNavigationItem[] = titles.map((label) => ({ label }))
const navicoms = [ScreenMirroring,Settings,Folder,Info]

const navindex = ref(0)
const activepage = computed(() => pages[navindex.value])
const activetitle = computed(() => titles[navindex.value])

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