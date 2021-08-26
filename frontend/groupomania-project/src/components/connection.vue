<template>
  <div class="userConnection">
      <h1>Connectez vous</h1>
      <form class="userConnectionForm" method="post">
        <label for="connectionEmail">Email</label>
        <input type="email" id="connectionEmail" name="connectionEmail" required>

        <label for="connectionPassword">Password</label>
        <input type="text" id="connectionPassword" name="connectionPassword" required>

        <input type="submit" value="Connection">
      </form>
  </div>
</template>

<script>
export default {
  name: 'Connection',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div, form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
img {
  height: 500px;
}
</style>
