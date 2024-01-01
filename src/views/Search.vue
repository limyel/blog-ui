<template>
  <div class="search container">
    <div class="search-input">
      <input/>
      <button>搜索</button>
    </div>

    <div class="search-result">
      <div class="search-result-item">
        <div class="search-result-title">
          <router-link to="">Python 从入门到入坟</router-link>
        </div>
        <div class="search-result-content">
          ...lskjdfal;sdkfjasl;dfjas;dlfkjasl;fsadfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdkfjls...
        </div>
      </div>

      <div class="search-result-item">
        <div class="search-result-title">
          <router-link to="">Python 从入门到入坟</router-link>
        </div>
        <div class="search-result-content">
          ...lskjdfal;sdkfjasl;dfjas;dlfkjasl;fsadfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdkfjls...
        </div>
      </div>

      <div class="search-result-item">
        <div class="search-result-title">
          <router-link to="">Python 从入门到入坟</router-link>
        </div>
        <div class="search-result-content">
          ...lskjdfal;sdkfjasl;dfjas;dlfkjasl;fsadfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdkfjls...
        </div>
      </div>

      <div class="search-result-item">
        <div class="search-result-title">
          <router-link to="">Python 从入门到入坟</router-link>
        </div>
        <div class="search-result-content">
          ...lskjdfal;sdkfjasl;dfjas;dlfkjasl;fsadfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdkfjls...
        </div>
      </div>

      <div class="search-result-item">
        <div class="search-result-title">
          <router-link to="">Python 从入门到入坟</router-link>
        </div>
        <div class="search-result-content">
          ...lskjdfal;sdkfjasl;dfjas;dlfkjasl;fsadfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdkfjls...
        </div>
      </div>

      <div class="search-result-item">
        <div class="search-result-title">
          <router-link to="">Python 从入门到入坟</router-link>
        </div>
        <div class="search-result-content">
          ...lskjdfal;sdkfjasl;dfjas;dlfkjasl;fsadfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdkfjls...
          ...lskjdfal;sdkfjasl;dfjas;dlfkjasl;fsadfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdkfjls...
          ...lskjdfal;sdkfjasl;dfjas;dlfkjasl;fsadfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdkfjls...
        </div>
      </div>

      <div class="search-result-item">
        <div class="search-result-title">
          <router-link to="">Python 从入门到入坟</router-link>
        </div>
        <div class="search-result-content">
          ...lskjdfal;sdkfjasl;dfjas;dlfkjasl;fsadfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdkfjls...
        </div>
      </div>
    </div>

    <Page/>
  </div>
</template>

<script>
export default {
  name: "Search"
}
</script>

<style lang="scss">
.search {
  margin-top: 50px;

  .search-input {
    margin-bottom: 10px;

    input {
      padding: 5px;
      width: 350px;
      border-radius: 5px;
      border: 1px solid #787878;
      outline: none;
    }

    button {
      width: 90px;
      margin-left: 10px;
    }
  }

  .search-result {

    .search-result-item {
      margin-bottom: 20px;

      .search-result-title {
        margin-bottom: 5px;
      }

      .search-result-content {
        width: 100%;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
      }
    }

  }
}
</style>
