<template>
  <div class="max-w-4xl mx-auto my-10">
    <div class="header-box flex items-center justify-between mb-4">
      <h1 class="text-2xl font-semibold">Share Feedback</h1>

      <label class="flex flex-col">
        <span
          class="text-xs uppercase font-bold text-[#59636E] tracking-[1.8px] mb-1"
          >Feedback Period</span
        >
        <select class="h-[48px] w-[342px] border border-[#D9DCDE] rounded px-3">
          <option value="">October 2018</option>
        </select>
      </label>
    </div>

    <div class="wrapper" v-if="!isLoading">
      <div
        v-for="(user, index) in users"
        :key="index"
        class="flex justify-between items-center py-3 hover:bg-[#d5b0f21a] cursor-pointer"
        :class="{ 'border-t border-[#D9DCDE]': index !== 0 }"
      >
        <div class="flex items-center gap-5 px-5">
          <div class="w-[58px] h-[58px] rounded-full">
            <img
              :src="user.photoURL"
              alt=""
              class="rounded-full w-full h-full"
              v-if="user.photoURL"
            />
            <div
              class="w-full h-full bg-gray-200 rounded-full text-lg font-semibold text-gray-400 flex items-center justify-center"
              v-else
            >
              {{ user.firstName[0] }}.{{ user.lastName[0] }}
            </div>
          </div>

          <div class="text-xl font-semibold text-[#59636E]">
            {{ user.firstName }} {{ user.lastName }}
          </div>
        </div>

        <div class="px-5">
          <button
            class="border border-[rgb(172,177,182)] font-semibold rounded hover:bg-[#D9DCDE] w-[198px] h-[48px] focus:text-white focus:bg-[#AB61E5] focus:border-none"
            @click="handleDetail(user)"
          >
            {{ true ? " Fill Out " : "View Submission" }}
          </button>
        </div>
      </div>
    </div>

    <div v-else>
      <LoadingMockup />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getRandomUsers, type IRandomUser, getUsers } from "@/services";
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";
import LoadingMockup from "../components/LoadingMockup.vue";

const router = useRouter();

const users = ref<any>([]);
const isLoading = ref(true);

const handleDetail = (user: IRandomUser) => {
  router.push({
    name: "user-feedback",
    // params: { id: user.login.uuid },
    params: { id: `${user.name.first} ${user.name.last}` },
  });
};

const fetchUsers = async () => {
  try {
    const usersResponse = await getUsers();
    console.log({ users });

    users.value = usersResponse;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

fetchUsers();
</script>

<style scoped>
.wrapper {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}

@media (max-width: 768px) {
  .header-box {
    padding: 0 1rem;
  }
}
</style>
