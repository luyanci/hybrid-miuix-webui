<script setup lang="ts"> 
import { MiuixIcon,MiuixNavigationBar,type MiuixNavigationItem } from 'miuix-vue'
import { ScreenMirroring,Settings,Info,Folder } from 'miuix-vue/icons/extended'

const title = ['Home','Configure','Modules', 'About']
const navItems: MiuixNavigationItem[] = title.map((label) => ({ label }))
const navicoms = [ScreenMirroring,Settings,Folder,Info]
</script>

<template>
  <div ref="buttomBarRef" class="app__bottom">

    <MiuixNavigationBar v-model="navindex" :items="navItems">
        <template #icon="{ index }">
            <MiuixIcon :icon="navicoms[index]" :size="20" />
        </template>
    </MiuixNavigationBar>

  </div>
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