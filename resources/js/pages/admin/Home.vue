<template>
  <div>
    <h2>Home</h2>
  </div>
</template>

<script>
export default {
  created() {
    // eslint-disable-next-line no-undef
    axios.get('/user')
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
}
</script>
