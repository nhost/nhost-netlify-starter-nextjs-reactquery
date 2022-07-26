<template>
  <div className="d-flex align-center flex-column">
    <v-card width="400" tile>
      <v-card-title> Apollo </v-card-title>
      <v-card-text>
        <v-list density="compact" v-if="result">
          <v-list-subheader>Conferences</v-list-subheader>
          <v-list-item
            v-for="(item, i) in result.conferences"
            :key="i"
            :value="item.id"
          >
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
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
    }
  }
`;

const isAuthenticated = useAuthenticated();
// TODO check if the query always runs with the headers
const { result } = useQuery(
  GET_CONFERENCES,
  null,
  computed(() => ({
    pollInterval: 5000,
    fetchPolicy: "cache-and-network",
    enabled: isAuthenticated.value,
  }))
);
</script>
