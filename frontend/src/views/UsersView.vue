<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getUsers() {
      fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => (this.users = data));
    },
  },
  
  created() {
    this.getUsers();
  },
};
</script>

<template>
  <main>
    <div v-for="user in users">
      {{ user.name }}
      {{ user.address }}
    </div>
  </main>
</template>
