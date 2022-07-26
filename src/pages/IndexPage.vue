<template>
  <div class="">
    <div class="bg-header">
      <div
        className="md:max-w-6xl mx-auto font-display flex flex-row antialiased px-2 py-3"
      >
        <div
          className="flex flex-row w-full mx-auto place-content-between py-2"
        >
          <div>
            <h1 class="text-white font-semibold">
              Nhost Vue.Js Netlify Starter
            </h1>
          </div>
          <div class="flex flex-row space-x-4">
            <a class="text-white font-medium cursor-pointer">Speakers</a>
            <a class="text-white font-medium cursor-pointer">Talks</a>
            <a class="text-white font-medium cursor-pointer">Log in</a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-header border-t-[0.5px] border-b border-t-gray-500 border-b-gray-500 h-screen"
    >
      <div className="md:max-w-xl mx-auto h-full">
        <div
          className="flex flex-col w-full  mx-auto place-content-between py-20"
        >
          <h1 class="text-white font-bold text-center text-5xl leading-snug">
            Custom Conference Project (Nhost + Vue.js)
          </h1>
          <h2
            class="text-white font-medium text-center text-xl leading-normal py-2"
          >
            7-8 Nov 2022 · San Francisco and online
          </h2>
          <div class="mx-auto space-x-3 mt-2">
            <button
              class="font-medium text-white cursor-pointer border px-2 py-2 rounded-md"
            >
              Register
            </button>
            <button
              class="font-medium text-white cursor-pointer border px-2 py-2 rounded-md"
            >
              See Talks
            </button>
          </div>
          <div>
            <h2
              class="text-white font-medium text-center text-xl leading-normal py-2 mt-12"
            >
              Agenda
            </h2>
            <div
              v-for="(item, i) in result.conferences"
              :key="i"
              :value="item.id"
            >
              <h2
                v-for="talk in item.talks"
                class="text-white font-medium flex"
                text="item.name"
              >
                {{ talk.name }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-header">
      <div
        className="md:max-w-6xl mx-auto font-display flex flex-row antialiased px-2 py-3"
      >
        <div
          className="flex flex-row w-full mx-auto place-content-between py-2"
        >
          <div>
            <h1 class="text-white font-semibold">
              Nhost Vue.Js Netlify Starter
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { gql } from "@apollo/client/core";
import { useAuthenticated } from "@nhost/vue";
import { useQuery } from "@vue/apollo-composable";

const GET_CONFERENCES = gql`
  query ConferencesQuery {
    conferences {
      id
      name
      speakers {
        name
      }
      talks {
        name
        speaker {
          name
          bio
        }
      }
    }
  }
`;

const isAuthenticated = useAuthenticated();
// TODO check if the query always runs with the headers
const { result } = useQuery(
  GET_CONFERENCES,
  null,
  computed(() => ({
    fetchPolicy: "cache-and-network",
  }))
);
</script>
