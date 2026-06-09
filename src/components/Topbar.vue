<script setup lang="ts">
import { MiuixTopAppBar,MiuixIconButton,MiuixIcon } from 'miuix-vue'
import { Translate } from 'miuix-vue/icons'
import Lang from './Lang.vue'
import { useI18n } from 'vue-i18n'
import { loadLocale, getSupportedLocales, initI18n, switchLocale } from '../locales'

const { t } = useI18n()
const Apptitle = t('common.appName')

function handleClick(): void {
    switchLocale("ru-RU")
    window.location.reload()
}
</script>

<template>
    <div class="topbar">
        <MiuixTopAppBar :large="false" :title="Apptitle">
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