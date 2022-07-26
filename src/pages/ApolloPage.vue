<template>
  <div className="d-flex align-center flex-column">asd</div>
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
    fetchPolicy: "cache-and-network",
  }))
);
</script>
