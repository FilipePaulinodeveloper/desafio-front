<template>

  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Usuários</h1>
        <p class="mt-2 text-sm text-gray-700">Lista de usuários cadastros no sistema.</p>
       
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link to="create-users">
        <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent 
        bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"        
        >
          Novo usuário
        </button>
      </router-link>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nome</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Empresa</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">E-mail</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Número</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Data de cadastro</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">                                
                <tr v-for="user in users" :key="user.email">                  
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ user.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.empresa }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.email }}</td>
                  <td v-if="user.phones && user.phones.length > 0" class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.phones[0].phone_number}}</td>
                  <td v-else class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    Não disponível
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ formatDate(user.created_at) }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    @click="getOneUser(user)"
                      >Editar<span class="sr-only">, {{ user.name }}</span></a
                    >
                    <a 
                    v-if="!confirmDelete"
                      href="#" 
                      class="text-red-600 hover:text-red-900 ml-4" 
                      @click="confirmDelete = true"
                    >
                      Excluir<span class="sr-only">, {{ user.name }}</span>
                    </a>
                    <a 
                      v-else
                      href="#" 
                      class="text-red-600 hover:text-red-900 ml-4" 
                      @click="deleteUser(user.id)"
                    >
                      Confirmar<span class="sr-only">, {{ user.name }}</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import {onMounted} from "vue";
import { useUser } from "./composables/useUser";
 import { useRouter } from 'vue-router'

 const router = useRouter()
const user = useUser()

const { listUsers,deleteUser, confirmDelete } = user

const users = user.data

onMounted(() => {
  listUsers()
})

function getOneUser(data){
  router.push({ name: 'update-users', params: { id: data.id } })   
}

function formatDate(isoDate) {
  // Cria um objeto Date a partir da string ISO
  const date = new Date(isoDate);

  // Formata a data no formato DD/MM/YYYY
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth retorna 0-11
  const year = date.getFullYear();

  // Retorna apenas a data
  return `${day}/${month}/${year}`;
}

</script>