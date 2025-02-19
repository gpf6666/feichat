<script setup lang="ts">
import { computed,ref } from 'vue'
import EmojiPicker  from 'vue3-emoji-picker';
import "vue3-emoji-picker/css";
interface Props {
  modelValue: string
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'send'])
const showEmojiPicker = ref(false);
// 用于绑定选中的表情
const selectedEmoji = ref('');
// 表情点击事件处理
function onEmojiSelect(emoji:any) {
  console.log(emoji,'llll')
  value.value += emoji.i;
  showEmojiPicker.value = false;  // 隐藏表情选择器
}
const value = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emits('update:modelValue', v)
  },
})
const handleSend = () => {
  emits('send', value.value)
}

</script>
<template>
  <div class="form-control mt-4">
    <div class="input-group px-4">
      <input
        type="text"
        v-model="value"
        placeholder="..."
        class="input input-bordered w-full"
        style="--tw-bg-opacity: 0.7"
        @keyup.enter="handleSend"
      />
        <button
        class="btn btn-square"
        style="--tw-bg-opacity: 0.7"
        @click="showEmojiPicker = !showEmojiPicker"
      >
        😀
      </button>
      <button
        class="btn btn-square"
        style="--tw-bg-opacity: 0.7"
        @click="handleSend"
      >
        发送
      </button>
    </div>
        <div class="emoji-picker">
       <EmojiPicker  v-if="showEmojiPicker" :native="true" :disable-skin-tones="true"   @select="onEmojiSelect" />
      </div>
  </div>
</template>

<style  scoped>
.emoji-picker {
  position: absolute;
  bottom: 80px;
  right: 60px;
}
::v-deep .input-group :where(span)  {
   background-color: #fff!important
}
</style>

