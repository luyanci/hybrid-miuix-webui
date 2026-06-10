<script setup lang="ts">
import { ref } from 'vue'
import { 
  MiuixCard,
  MiuixArrowPreference,
 } from 'miuix-vue'
import hybrid from '../assets/icon.svg'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

function open_github_repo() {
  window.open('https://github.com/hybrid-mount/meta-hybrid_mount')
}

function open_telegram() {
  window.open('https://github.com/hybrid-mount/meta-hybrid_mount')
}

</script>

<template>
  <div class="hero">
    <img :src="hybrid" class="base" alt="" />
    <h1>{{t('common.appName')}}</h1>
  </div>
  <MiuixCard>
      <MiuixArrowPreference :title="t('info.projectLink')" @click="open_github_repo" />
      <MiuixArrowPreference :title="t('info.telegram')" @click="open_telegram" />
      <MiuixArrowPreference :title="t('info.supportUs')" @click="open_github_repo" />
  </MiuixCard>



</template>
