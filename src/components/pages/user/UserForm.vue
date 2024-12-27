<template>
  <div class="mx-2 p-5 bg-white shadow-md rounded-md">
    <h2 class="text-2xl font-bold mb-4">Formulário de Usuário</h2>
    <h2 v-if="errorMensage.length" class="text-red-500 text-sm mt-1">      
     
      <div v-for="(erro, index) in errorMensage" :key="index" class="flex items-center space-x-2 mt-2">
        {{ errorMensage[index] }}
        </div>
    </h2>
    <h2 v-if="successMensage" class="text-green-500 text-sm mt-1">
        {{ successMensage }}

    </h2>
    <form @submit.prevent="handleSubmit(props.isEditing)">
      <!-- Nome -->
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
        <input type="text" id="name" v-model="form.name"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite seu nome" required @input="validateRequiredFields('name')" />
          <p v-if="requiredError" class="text-red-500 text-sm mt-1">{{ requiredError.name }}</p>

      </div>

      <!-- Empresa -->
            <div class="mb-4">
        <label for="empresa" class="block text-sm font-medium text-gray-700">Empresa</label>
        <input type="text" id="empresa" v-model="form.empresa"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite o nome da Empresa" required @input="validateRequiredFields('empresa')" />
          <p v-if="requiredError" class="text-red-500 text-sm mt-1">{{ requiredError.empresa }}</p>

      </div>

      <!-- Email -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        

          <input
            type="email"
            id="email"
            v-model="form.email"
            @input="validateEmail"
            :class="{ 'border-red-500': emailError }"
            class="mt-1 block w-full border rounded-md shadow-sm p-2"
            placeholder="Digite seu email"
            required
          />

          <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>

      </div>

      <!-- Senha -->
      <div class="mb-4" v-if="!props.isEditing">
        <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
        <input type="password" id="password" v-model="form.password"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite sua senha" required @input="validateRequiredFields('password')" maxlength="20" />
          <p v-if="requiredError" class="text-red-500 text-sm mt-1">{{ requiredError.password }}</p>
      </div>

      <!-- Telefones -->
      <div class="mb-4" v-if="!props.isEditing">
        <label class="block text-sm font-medium text-gray-700">Telefones</label>
        <div v-for="(phone, index) in form.phones" :key="index" class="flex items-center space-x-2 mt-2">
          <input type="tel" v-model="form.phones[index]" @input="applyPhoneMask(index, props.isEditing)"
            class="flex-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Digite um telefone" maxlength="16" />
          <button type="button" @click="removePhone(index)" class="text-red-500 hover:text-red-700">
            Remover
          </button>
        </div>
        
        <button type="button" @click="addPhone" class="mt-2 text-blue-500 hover:text-blue-700">
          + Adicionar Telefone
        </button>
      </div>
      <!-- Telefones edição  -->
      <div class="mb-4" v-else>
        <label class="block text-sm font-medium text-gray-700">Telefones</label>
        <div v-for="(phone, index) in form.phones" :key="index" class="flex items-center space-x-2 mt-2">          
          
          <input 
            type="tel" 
            v-model="phone.phone_number" 
            @input="applyPhoneMask(phone, props.isEditing)"
            class="flex-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Digite um telefone" 
            maxlength="16" 
          />
          <button type="button" @click="removePhone(phone)" class="text-red-500 hover:text-red-700">
            Remover
          </button>
        </div>
        
        <button type="button" @click="addPhone(props.isEditing)" class="mt-2 text-blue-500 hover:text-blue-700">
          + Adicionar Telefone
        </button>
      </div>

      <!-- Botão de Enviar -->
      <button type="submit" class="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600">
        Enviar
      </button>
    </form>
  </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { useUser } from './composables/useUser.js'
import { useRoute } from 'vue-router'

const route = useRoute()

/* eslint-disable */
const props = defineProps({
  isEditing: {
    type: Boolean, 
    default: false 
  }
})

const user = useUser()
const {
  addPhone,
  removePhone,
  handleSubmit,
  applyPhoneMask,
  getOneUser,
  updateOneUser,
  errorMensage,
  successMensage,
  id
} = user
let form = user.data
onMounted(() => {
  
  if (props.isEditing) {
    getOneUser(route.params.id)
    id.value = route.params.id
  }
 
})



const emailError = ref('');
const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.value.email) {    
    emailError.value = 'O campo de email é obrigatório.';
  } else if (!emailPattern.test(form.value.email)) {
    emailError.value = 'Por favor, insira um email válido.';
  } else {
    emailError.value = '';
  }
};

const requiredError = ref({
    name: '',  
    password: '',
    empresa: '',    
});

const validateRequiredFields = (field) => {
  if (!form.value[field]) {    
    requiredError.value[field] = 'Este campo é obrigatório.';
  }else {
    requiredError.value[field] = '';
  }
}

</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>