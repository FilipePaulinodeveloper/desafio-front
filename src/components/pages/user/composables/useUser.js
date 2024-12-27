import { ref } from "vue";
 import { createUser, getUserById, getUsers, updateUser } from "../service/userService";

export const useUser = () => {

    const data = ref({        
        name: '',
        email: '',
        empresa: '',
        password: '',
        phones: [],
      });

    const id = ref('')
    
    const errorMensage = ref([''])
    const successMensage = ref('')
      const addPhone = (isEditing) => {
        if(isEditing){
          data.value.phones.push({ phone_number: '' });
        }else {
          data.value.phones.push('');
        }
      };
      
     
      const removePhone = (index) => {
        data.value.phones.splice(index, 1);
      };
      
     const createOneUser = () => {
      return  createUser(data.value).then((response) => {
        if(response.errors){
          successMensage.value = ''
          Object.entries(response.errors).forEach(element => {                  
            errorMensage.value.push(element[1][0])
          });
        }else {                
          successMensage.value = 'Usuário criado com sucesso!'
          errorMensage.value = ['']               
          data.value = {
            name: '',
            email: '',
            empresa: '',
            password: '',
            phones: [],
          }
          
        }
    })
     }
      const handleSubmit = (isEditing) => {
         if(!isEditing){
          createOneUser()
         }else {
          console.log(id.value)
          updateOneUser(id.value)
         }
        
      }

      const listUsers = () => {
        getUsers().then((response) => {
          data.value = response
        })
      }

      const getOneUser = (id) => {
        getUserById(id).then((response)=>{          
          data.value = {
            ...response,
            phones: response.phones.map((phone) => ({
              id: phone.id,  // Mantendo o ID do telefone
              phone_number: phone.phone_number
            })),
          };
        console.log(data.value)
        })
      }

    const applyPhoneMask = (index, isEditing) => {
      if(!isEditing){
        
        let phone = data.value.phones[index];
        phone = phone.replace(/\D/g, ''); 
        phone = phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
        phone = phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        data.value.phones[index] = phone;
      }else {
        let phone = index.phone_number
        phone = phone.replace(/\D/g, ''); 
        phone = phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
        phone = phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        index.phone_number = phone;
      }
      };

    const updateOneUser = (id) => {
      console.log(data.value)
      data.value.phones = data.value.phones.map((phone) => ({
        id: phone.id, // Certifique-se de que o id está presente
        phone_number: phone.phone_number // Adicionando phone_number
      }));
       updateUser(id,data.value).then((response) => {
          if(response.errors){
            successMensage.value = ''
            Object.entries(response.errors).forEach(element => {                  
              errorMensage.value.push(element[1][0])
            });
          }else {                
            successMensage.value = 'Usuário atualizado com sucesso!'
            errorMensage.value = ['']                
            
          }
        })
    }
    
      

    return {
        data,
        addPhone,
        removePhone,
        handleSubmit,  
        applyPhoneMask,
        listUsers,
        getOneUser,
        updateOneUser,
        errorMensage,
        successMensage,
        id
    }
}