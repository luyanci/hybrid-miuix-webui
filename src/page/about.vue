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
  <div class="page">
    <div class="hero">
      <img :src="hybrid" class="base" alt="" />
      <h1>{{t('common.appName')}}</h1>
    </div>
    
    <MiuixCard class="ex-card">
      <MiuixArrowPreference :title="t('info.projectLink')" summary="github.com/hybrid-mount/meta-hybrid_mount" @click="open_github_repo" />
      <MiuixArrowPreference :title="t('info.telegram')" summary="@hybridmountchat" @click="open_telegram" />
      <MiuixArrowPreference :title="t('info.donate')" @click="open_donate = true" />
    </MiuixCard>

    <MiuixBottomSheet v-model="open_donate" :title="t('info.supportUs')">
      <MiuixSmallTitle :text="'YuzakiKokuban'" />
      <MiuixCard class="ex-mb12">
        <MiuixArrowPreference title="Alipay" />
        <MiuixArrowPreference title="Wechat" />
        <MiuixArrowPreference title="Binance" />
        <MiuixArrowPreference title="PayPal" @click="open_koukuban_paypal" />
      </MiuixCard>
      <MiuixSmallTitle :text="'Tool-cx-app'" />
      <MiuixArrowPreference title="Wechat" />
    </MiuixBottomSheet>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  text-align: center;
  padding: 32px 0;

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  h1 {
    font-size: 56px;
    letter-spacing: -1.68px;
    margin: 32px 0;
    font-weight: 500;
    color: var(--m-color-on-background);

    @media (max-width: 1024px) {
      font-size: 36px;
      margin: 20px 0;
    }
  }
}

.ex-card {
  margin: 0 12px 12px;
}

.ex-mb12 {
  margin-bottom: 12px;
}
</style>
