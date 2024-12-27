import axios from 'axios';

// Função para criar um novo usuário
const urlBack = 'http://127.0.0.1:8000/api/'
async function createUser(userData) {
    try {        
        const resposta = await axios.post(`${urlBack}user`, userData);        
        return resposta.data;
    } catch (erro) {        
        return erro.response.data
    }
}

// Função para obter a lista de usuários
async function getUsers() {
   
        const resposta = await axios.get(`${urlBack}users`);        
        return resposta.data;
    
}

// Função para obter um usuário pelo ID
async function getUserById(id) {
    try {
        const resposta = await axios.get(`${urlBack}user/${id}`);
        
        return resposta.data;
    } catch (erro) {
        console.error(`Erro ao obter o usuário com ID ${id}:`, erro);
        throw erro;
    }
}

// Função para atualizar um usuário
async function updateUser(id, dadosAtualizados) {
    try {
        const resposta = await axios.put(`${urlBack}user/${id}`, dadosAtualizados);        
        return resposta.data;
    } catch (erro) {
        console.error(`Erro ao atualizar o usuário com ID ${id}:`, erro);
        throw erro;
    }
}

// Função para excluir um usuário
async function excluirUsuario(id) {
    try {
        const resposta = await axios.delete(`${'/deleteUsers'}/${id}`);
        console.log('Usuário excluído com sucesso:', resposta.data);
        return resposta.data;
    } catch (erro) {
        console.error(`Erro ao excluir o usuário com ID ${id}:`, erro);
        throw erro;
    }
}

// Exportar as funções
export {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    excluirUsuario
};