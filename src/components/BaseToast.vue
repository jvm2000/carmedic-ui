<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const message = ref<string>('')

function showToast(text: string, duration = 4000) {
  message.value = text
  visible.value = true
  setTimeout(() => (visible.value = false), duration)
}

defineExpose({ showToast })
</script>
 
 <template>
  <transition name="toast-pop">
    <div 
      v-if="visible" 
      class="fixed bottom-6 right-6 bg-white p-6 rounded-md shadow-lg  justify-start w-full max-w-sm flex flex-col"
    >
      <span class="text-black font-bold">Notice!</span>
      <span class="text-sm text-black">{{ message }}</span>
    </div>
  </transition>
</template>

<style scoped>
@keyframes popUpDown {
  0% {
    transform: translateY(100%);
  }
  30% {
    transform: translateY(-10%);
  }
  60% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(0%);
  }
}

.toast-pop-enter-active {
  animation: popUpDown 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
.toast-pop-leave-active {
  animation: popUpDown 0.6s cubic-bezier(0.25, 1, 0.5, 1) reverse;
}
</style>