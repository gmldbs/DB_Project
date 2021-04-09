<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        <h1>Home page</h1>
        <p>This is a user's home page</p>
      </v-col>
      <v-col class="text-center">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    created () {
      this.$router.push('/Home')
    },
  }
</script>
