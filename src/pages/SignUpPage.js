import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"


export default function SignUpPage() {
  const navigate = useNavigate()
  const [name, setNomeUsuario] = useState("")
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [ConfirmaçãoSenha, setConfirmaçãoSenha] = useState("");

  function passarDados(event) {
    event.preventDefault()
    const EmailValido = /\S+@\S+\.\S+/;
    const dados = { name, email, senha}

    if (name.length > 0 && (email.search(EmailValido) !== -1) && email.length > 11 && senha.length >= 3 && senha === ConfirmaçãoSenha) {
      const promise = axios.post(`${process.env.REACT_APP_API_URL}/cadastro`, dados)
        promise.then(response => {
            alert("Usuário cadastrado com sucesso")
            navigate('/')
        })
        promise.catch((err) => {
            console.log(err)
        })
    } else {
      alert("erro: preencha os dados corretamente")
    }

  }
  return (
    <SingUpContainer>
      <form>
        <MyWalletLogo />
        <input
          placeholder="Nome"
          type="text"
          required value={name}
          onChange={(e) => setNomeUsuario(e.target.value)} />
        <input
          placeholder="E-mail"
          type="email"
          required value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          required value={senha}
          onChange={(e) => setSenha(e.target.value)} />
        <input placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          required value={ConfirmaçãoSenha}
          onChange={(e) => setConfirmaçãoSenha(e.target.value)} />
        <button onClick={passarDados} >Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
