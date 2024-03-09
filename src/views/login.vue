<template>
  <div
    class="bg-[url('../assets/images/login-bg.png')] h-screen bg-cover relative"
  >
    <form
      class="bg-white w-[371px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pt-24 pb-12"
    >
      <h-logo class="mx-auto" />

      <div class="text-2xl font-semibold text-center mb-10">Honesto</div>

      <div class="px-16 space-y-5">
        <label class="font-semibold flex flex-col gap-y-1">
          Email:

          <input
            class="border border-solid w-full font-normal px-3 h-[43px]"
            v-model="v$.email.$model"
          />

          <small class="text-red-500" v-if="v$.email.$errors.length">{{
            v$.email.$errors[0].$message
          }}</small>
        </label>

        <label class="font-semibold flex flex-col gap-y-1">
          Password:

          <input
            class="border border-solid w-full font-normal px-3 h-[43px]"
            type="password"
            v-model="v$.password.$model"
          />

          <small class="text-red-500" v-if="v$.password.$errors.length">{{
            v$.password.$errors[0].$message
          }}</small>
        </label>

        <button
          class="bg-[#AB61E5] w-full text-white font-semibold py-3 rounded"
          type="button"
          @click="handleLogin"
        >
          Login
        </button>

        <small
          >Don't have an account?
          <router-link to="/signup" class="font-semibold text-[#AB61E5]"
            >Signup</router-link
          ></small
        >
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "vue3-toastify";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

import { auth } from "@/utils/firebase";
import HLogo from "@/components/svg-components/h-logo.vue";

const router = useRouter();

const user = reactive({ email: "", password: "" });

const userRules = {
  email: { required, email },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(userRules, user);

const handleLogin = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    const response = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    if (response.user) {
      localStorage.setItem("isLoggedIn", "true");

      router.push("/share-feedback");
    }
  } catch (error: any) {
    toast.error(error.message);
  }
};
</script>

<style scoped></style>
