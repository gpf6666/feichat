<template>
  <div>
    <!-- 弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="AI Chat"
      width="70%"
      :before-close="handleClose"
    >
      <div class="chat-container">
        <div class="messages" ref="messagesContainer">
          <div v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
            <div v-if="message.type === 'user'">
              <div class="message-row">
              <img  :src="props.curUser.avatar"/><el-tag type="primary" style="paddingTop:4px">{{ message.text }}</el-tag>
            </div> 
            </div>
            <div v-else>
                  <div class="message-row">
              <img src="../assets/ai.webp" /> <el-tag type="success" style="paddingTop:4px">{{ message.text }}</el-tag>
            </div> 
             
            </div>
          </div>
        </div>
        </div>
        
        <!-- 用户输入 -->

        <div class="input-group px-4">
           <input
        type="text"
        v-model="userInput"
        placeholder="Please enter your question"
        class="input input-bordered w-full ai-input"
        style="--tw-bg-opacity: 0.7"
        @keyup.enter="sendMessage"
      />
                <button
        class=" btn-square"
        style="--tw-bg-opacity: 0.7;background:#cccccc"
        @click="sendMessage"
      >
        Send
      </button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { ElButton, ElDialog, ElInput, ElTag } from 'element-plus';
interface Props {
  curUser: any;
}
// 定义组件的响应式数据
const props = defineProps<Props>();
const dialogVisible = ref(false);  // 弹窗的可见性
const userInput = ref('');  // 用户输入的内容
const messages = ref<{ type: 'user' | 'ai'; text: string }[]>([]);  // 消息列表，定义消息类型
const loading = ref(false);  // 发送请求时的加载状态

// 发送消息的方法
const sendMessage = async () => {
  if (!userInput.value.trim()) return;  // 如果输入为空，直接返回

  // 用户消息
  messages.value.push({ type: 'user', text: userInput.value });
  const querymsg= userInput.value;
  userInput.value = '';  // 清空输入框
  loading.value = true;  // 显示加载状态

  // 向 DeepSeek 或 AI 服务发送请求
  try {
    const response = await axios.post('https://smart-soft-stallion.glitch.me/chat', {
      querymsg: querymsg,  // 用户输入的内容
    });

    const aiResponse = response.data.response;  // 假设 API 返回的是 `response` 字段
    messages.value.push({ type: 'ai', text: aiResponse });
  } catch (error) {
    messages.value.push({ type: 'ai', text: 'AI 服务请求失败，请稍后再试。' });
  } finally {
    loading.value = false;  // 请求结束，隐藏加载状态
    scrollToBottom();  // 滚动到底部
  }
};

// 自动滚动到最底部
const scrollToBottom = () => {
  const container = document.querySelector('.messages') as HTMLElement;
  container.scrollTop = container.scrollHeight;
};

// 关闭弹窗时的操作
const handleClose = () => {
    dialogVisible.value = false;
  messages.value = [];  // 关闭时清空消息
};

defineExpose({
  dialogVisible,
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  max-height: 400px;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  margin: 5px 0;
}

.send-btn {
  display: flex;
  justify-content: flex-end;
}

.el-input {
  margin-bottom: 10px;
}

.el-tag {
  display: inline-block;
  margin: 5px;
}
.ai-input {
background-color: #ffffff!important;
color:#111111!important
}

.message-row {
    display :flex;
    align-items: center;
}
.message-row img {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    object-fit: cover;
}
</style>
