<script setup lang="ts">
import { MiuixTopAppBar,MiuixIconButton,MiuixIcon } from 'miuix-vue'
import { Translate } from 'miuix-vue/icons/extended'
function handleClick(): void {
  console.log('click')
}
</script>

<template>
    <div class="topbar">
        <MiuixTopAppBar :large="false" title="Hybird Mount">
        <template #actions>
            <MiuixIconButton aria-label="Toggle" @click="handleClick">
                <MiuixIcon :icon="Translate" :size="24" />
            </MiuixIconButton>
        </template>
        </MiuixTopAppBar>
    </div>
</template>

<style scoped>
.topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
}
</style>