<template>
  <div className="d-flex align-center flex-column">
    <div width="400">
      <h2>Sign in to the Application</h2>
      <router-view />
    </div>
    <div>
      Don&lsquo;t have an account?
      <router-link to="/signup"> Sign up </router-link> or
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import { useSignInAnonymous } from "@nhost/vue";
const { signInAnonymous, error, isLoading } = useSignInAnonymous();
const router = useRouter();
const handleSignInAnonymous = async (e: Event) => {
  e.preventDefault();
  const { isSuccess } = await signInAnonymous();
  if (isSuccess) {
    router.push("/profile");
  }
};
</script>
