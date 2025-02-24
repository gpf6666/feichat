<script setup lang="ts">
import { ref, computed } from "vue";
import { SwitchFilled } from "@element-plus/icons-vue";
import Aichat from "./Aichat.vue";

interface Props {
  groupName: string;
  personNumber: number;
  userList: Map<any, any>;
  curUserId: string;
  curUser: any;
}
interface User {
  id: string;
  avatar: string;
  name: string;
  new: boolean;
}

const aichat = ref<{ dialogVisible: boolean } | null>(null);

const theme = ref("Dark");
const props = defineProps<Props>();
const emit = defineEmits(["more"]);
const handleMore = (user: User) => {
  emit("more", user);
};
const users = computed<User[]>(() => {
  const list: User[] = [];
  if (props.userList.size === 0) return [];
  props.userList.forEach((value, key) => {
    if (key !== props.curUserId) {
      list.push({
        avatar: value.avatar,
        id: key,
        name: value.name,
        new: value.new,
      });
    }
  });
  return list;
});

const changeTheme = (flag: Boolean) => {
  const newTheme = flag ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
};
const openChat = () => {
  if (aichat.value) {
    aichat.value.dialogVisible = true;
  }
}


</script>

<template>
  <!-- 顶部栏 -->
  <div class="navbar text-primary-content rounded-box space-x-1 h-16">
    <div class="flex-1">
      <a class="normal-case text-xl pl-4" style="color: #666666"
        >{{ props.groupName }}({{ props.personNumber }})</a
      >
    </div>
    <div class="flex-none avatar-list pr-4" v-if="users.length > 0">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          Online List
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              @click="handleMore(item)"
              v-for="item in users"
              :key="item.id"
            >
              <div
                class="avatar ml-1 cursor-pointer w-6 rounded-full"
                :class="item.new ? 'online' : ''"
              >
                <img :src="item.avatar" />
              </div>
              <span style="padding: 5px 20px">{{ item.name }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        Profile
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="true">
            <div>
              <img
                class="avatar ml-1 cursor-pointer w-6 rounded-full"
                style="marginbottom: 5px"
                :src="props.curUser.avatar"
                alt=""
              />
              <span style="padding: 0 10px"> {{ props.curUser.name }}</span>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div>
              Theme:
              <el-switch
                v-model="theme"
                class="ml-2"
                inline-prompt
                style="
                  --el-switch-on-color: #333333;
                  --el-switch-off-color: #cccccc;
                "
                active-text="Dark"
                inactive-text="Light"
                @change="changeTheme"
              />
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="openChat">AI Chat(DeepSeek)</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <Aichat ref="aichat" :curUser="props.curUser"></Aichat>
  </div>
</template>

<style scoped></style>
