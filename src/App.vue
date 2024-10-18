<script setup>
import { ref } from 'vue'

const SITE_NAME = import.meta.env.VITE_SITE_TITLE

const brands = ref([])
const fetchBrands = async () => {
  const fetch_response = await fetch('/brands.json')
  const data = await fetch_response.json()
  brands.value = data
}

fetchBrands()
</script>

<template>
<header>
  <div class="w-11/12 mx-auto max-w-5xl py-6">
    <router-link class="p-2 rounded-md hover:bg-primary/10 inline-block font-bold" to="/">
      <img class=" inline-block align-middle" src="/ice-cream.svg" alt="ice cream logo">
      <span class=" inline-block align-middle">{{ SITE_NAME }}</span>
    </router-link>
  </div>
</header>
<main class="mb-10">
  <router-view />
</main>
<footer class=" bg-slate-950 text-slate-50 py-10">
  <div class="w-11/12 mx-auto max-w-5xl grid gap-10 md:grid-cols-2 mb-10">
    <div>
      <h3 class="mb-4">
      <router-link class="p-2 rounded-md hover:bg-primary/10 inline-block font-bold" to="/">
        <img class=" inline-block align-middle" src="/ice-cream.svg" alt="ice cream logo">
        <span class=" inline-block align-middle">{{ SITE_NAME }}</span>
      </router-link>
      </h3>
      <p>
        <a class="hover:bg-slate-900 inline-block p-1 rounded-md" href="mailto:contact@nosegates.com">
          <i class='bx bxl-gmail bx-sm'></i>
        </a>
      </p>
    </div>
    <div>
      <h5 class="title mb-4"><i class="bx bx-cube-alt" />Brands</h5>
      <ul class="*:mb-1">
        <li class="last:mb-0" v-for="brand in brands">
          <a class="font-title hover:underline text-xs/loose" :href="brand.url" target="_blank">{{ brand.name }}<i class='bx bx-link-external'></i></a>
        </li>
      </ul>
    </div>
  </div>
  <div class="text-center mb-10">
    <a class="inline-block p-2 rounded-md hover:bg-slate-900" href="https://github.com/connectshark/csv-map" target="_blank" rel="noopener noreferrer">
      <i class='bx bxl-github bx-sm'></i>
    </a>
  </div>
  <div class="text-center">
    <h6 class="title text-xs">Copyright <i class='bx bx-copyright'></i> 2024 <router-link class="hover:underline" to="/">{{ SITE_NAME }}</router-link> <a class="underline" href="https://github.com/connectshark/csv-map/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>.</h6>
  </div>
</footer>
</template>