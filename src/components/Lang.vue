<!-- TODO: Will implement in config page in the future.-->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getSupportedLocales, switchLocale, type LocaleInfo } from '../locales'

const { t, locale } = useI18n()
const isOpen = ref(false)
const supportedLocales = ref<LocaleInfo[]>([])
const currentLocale = computed(() => locale.value)
const isSwitching = ref(false)

const loadLocales = async () => {
  supportedLocales.value = await getSupportedLocales()
}

const handleSwitchLocale = async (code: string) => {
  if (code === currentLocale.value) return
  isSwitching.value = true
  try {
    await switchLocale(code)
    isOpen.value = false
  } finally {
    isSwitching.value = false
  }
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

onMounted(() => {
  loadLocales()
})
</script>

<template>
  <div class="lang-menu" @click.stop>
    <slot @click="toggleMenu" />
    
    <!-- 下拉菜单 -->
    <Transition name="fade">
      <div v-if="isOpen" class="lang-dropdown">
        <button
          v-for="lang in supportedLocales"
          :key="lang.code"
          class="lang-option"
          :class="{ active: currentLocale === lang.code }"
          @click="handleSwitchLocale(lang.code)"
          :disabled="isSwitching"
        >
          {{ lang.display }}
          <span v-if="currentLocale === lang.code" class="check">✓</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lang-menu {
  position: relative;
  display: inline-flex;
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  min-width: 120px;
  background: var(--md-sys-color-surface-container, #fff);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
}

.lang-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  transition: background 0.2s;
}

.lang-option:hover {
  background: var(--md-sys-color-surface-container-highest, #f0f0f0);
}

.lang-option.active {
  color: var(--md-sys-color-primary, #6200ee);
  font-weight: 500;
}

.lang-option:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.check {
  margin-left: 8px;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>