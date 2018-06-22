<template>
  <div>
    <ul class="list">
      <li>
        <label>功能1</label>
        <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </li>
      <li>
        <label>功能2</label>
        <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </li>
      <li>
        <label>功能3</label>
        <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </li>
    </ul>
  </div>
</template>
<style>
.el-container {
  display: flex;
  flex: 1;
}
.list {
  margin: 20px;
}
.list li {
  margin: 10px 0;
}
.list li label {
  vertical-align: middle;
  width: 100px;
  display: inline-block;
}
</style>
<script>
export default {
  props: {},
  data() {
    return {
      value2: true,
      value3: true,
      value4: false
    }
  }
}
</script>
