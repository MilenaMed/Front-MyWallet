import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useContext } from "react";
import { useState } from "react"
import AuthContext from "../context/AuthContext";


export default function SignInPage() {
  const navigate = useNavigate();
  const {setToken, setNomeUsuário} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function checarDados(event) {
    event.preventDefault()
    const dados = { email, senha }
    const EmailValido = /\S+@\S+\.\S+/;

    if ((email.search(EmailValido) !== -1) && senha.length >= 3) {
      const promise = axios.post(`${process.env.REACT_APP_API_URL}/`, dados)
      console.log("entrou promise")
      promise.then(response => {
        setToken(response.data.token)
        setNomeUsuário (response.data.nomeUsuário)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("nomeUsuario", response.data.nomeUsuario)
        alert("Usuário logado")
        navigate('/home')
      })
      promise.catch((err) => {
        console.log(err)
        alert("dados inválidos")
      })
    } else {
      alert("erro: preencha os dados corretamente")
    }
  }
  return (
    <SingInContainer>
      <form>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          required value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          required value={senha}
          onChange={(e) => setSenha(e.target.value)} />
        <button onClick={checarDados}>Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
