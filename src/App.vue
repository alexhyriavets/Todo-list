<template>
  <el-container>
    <el-header>
      <h1>
        <a class="title" href="/#/">Todo List</a>
      </h1>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style lang="scss">
body, html {
  padding: 0;
  margin: 0;
}

h1 {
  color: #fff;
}

.el-header {
  background-color: #409eff;
}

.title {
  color: white;
  text-decoration: none;
}
</style>
