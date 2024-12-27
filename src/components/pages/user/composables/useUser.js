import { ref } from "vue";
 import { createUser } from "../service/userService";

export const useUser = () => {

    const data = ref({
        name: '',
        email: '',
        password: '',
        phones: [],
      });
    
    const errorMensage = ref([''])
    const successMensage = ref('')
      const addPhone = () => {
        data.value.phones.push('');
      };
      
     
      const removePhone = (index) => {
        data.value.phones.splice(index, 1);
      };
      
     
      const handleSubmit = () => {
         createUser(data.value).then((response) => {
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
                  password: '',
                  phones: [],
                }
                
              }
          })
      
      }

    const applyPhoneMask = (index) => {
        let phone = data.value.phones[index];
        phone = phone.replace(/\D/g, ''); 
        phone = phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
        phone = phone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        data.value.phones[index] = phone;
      };

      

    return {
        data,
        addPhone,
        removePhone,
        handleSubmit,  
        applyPhoneMask,
        errorMensage,
        successMensage
    }
}