<script setup lang="ts">
import { ref } from 'vue'
import { 
  MiuixCard,
  MiuixArrowPreference,
  MiuixBottomSheet,
  MiuixSmallTitle,
 } from 'miuix-vue'
import hybrid from '../assets/icon.svg'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const open_donate = ref(false)
function open_github_repo() {
  window.open('https://github.com/hybrid-mount/meta-hybrid_mount')
}

function open_telegram() {
  window.open('https://t.me/hybridmountchat')
}

function open_koukuban_paypal() {
  window.open('https://www.paypal.com/paypalme/LangQin280')
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
      <MiuixArrowPreference :title="t('info.donate')" @click="open_donate = true" />
  </MiuixCard>

  <MiuixBottomSheet v-model="open_donate" :title="t('info.supportUs')">
    <MiuixCard>
      <MiuixSmallTitle>YuzakiKokuban</MiuixSmallTitle>
      <MiuixCard>
        <MiuixArrowPreference title="Alipay" />
        <MiuixArrowPreference title="Wechat" />
        <MiuixArrowPreference title="Binance" />
        <MiuixArrowPreference title="PayPal" @click="open_koukuban_paypal" />
      </MiuixCard>
      <MiuixSmallTitle>Tool-cx-app</MiuixSmallTitle>
      <MiuixArrowPreference title="Wechat" />

    </MiuixCard>
  </MiuixBottomSheet>

</template>
