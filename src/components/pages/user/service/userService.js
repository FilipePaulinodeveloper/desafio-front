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
async function obterUsuarios() {
    try {
        const resposta = await axios.get('/getUsers');
        console.log('Usuários obtidos:', resposta.data);
        return resposta.data;
    } catch (erro) {
        console.error('Erro ao obter usuários:', erro);
        throw erro;
    }
}

// Função para obter um usuário pelo ID
async function obterUsuarioPorId(id) {
    try {
        const resposta = await axios.get(`${'/getUsers'}/${id}`);
        console.log('Usuário obtido:', resposta.data);
        return resposta.data;
    } catch (erro) {
        console.error(`Erro ao obter o usuário com ID ${id}:`, erro);
        throw erro;
    }
}

// Função para atualizar um usuário
async function atualizarUsuario(id, dadosAtualizados) {
    try {
        const resposta = await axios.put(`${'/updateUsers'}/${id}`, dadosAtualizados);
        console.log('Usuário atualizado com sucesso:', resposta.data);
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
    obterUsuarios,
    obterUsuarioPorId,
    atualizarUsuario,
    excluirUsuario
};