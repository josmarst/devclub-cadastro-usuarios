// import { useState } from 'react'
// import reactLogo from './../../assets/react.svg'
// import viteLogo from '/vite.svg'
import './style.css'
//import Trash from './../../assets/trash.svg'
import Trash from './../../assets/react.svg'
import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'
//useState é usado pra alterar o valor de uma variável
// useRef pra pegar os dados inseridos no form e enviar pro banco

function Home() {
  // const [count, setCount] = useState(0)
  // const users = [
  //   {
  //     id: '123',
  //     name: 'Nome dos Santos',
  //     idade: 53,
  //     email: 'emailsantos@email.com',
  //   },
  //   {
  //     id: '456',
  //     name: 'Nome da Silva',
  //     idade: 43,
  //     email: 'emailsilva@email.com',
  //   },
  //   {
  //     id: '789',
  //     name: 'Terceiro do Silva',
  //     idade: 22,
  //     email: 'terceiro@email.com',
  //   },
  // ]

  // let users = [] // const não se pode atribuir um novo valor, por isso é "let"
  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  // Retorna todos os usuarios pra tela
  async function getUsers() {
    const usersFromAPI = await api.get('/usuarios')
    setUsers(usersFromAPI.data)
    // console.log(users)
  }

  // Cria um novo usuario e imprime na tela
  async function createtUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  // Exclui um usuario e atualiza a tela
  async function deletertUsers(id) {
    await api.delete(`/usuarios/${id}`)  // usar crase
    getUsers()
  }

  useEffect(() => { }, [])

  return (

    <div className="container">

      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='nome' type='text' ref={inputName}></input>
        <input placeholder='Idade' name='idade' type='number' ref={inputAge}></input>
        <input placeholder='E-mail' name='email' type='email' ref={inputEmail}></input>
        <button type='button' onClick={(createtUsers)}>Cadastrar</button>
      </form>

      {users.map(user => (

        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade:<span>{user.age}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
          </div>

          <button onClick={() => deletertUsers(user.id)}>
            <img src={Trash}></img>
          </button>
        </div>
      ))}


    </div>)
}

export default Home
