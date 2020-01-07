// src/components/Login.tsx

import * as React from 'react';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

function Login({ name, enthusiasmLevel = 1, onIncrement, onDecrement }: Props) {
  return (
    <div className="login">
      <div className="greeting">
        Bem-vindo(a) à {name}!
      </div>
      <div className="inputArea">

        <form>
            <div className="inputField">
                <label>Email</label> <br></br>
                 <input placeholder="nome.sobrenome@taqtile.com.br"></input>
            </div>
            <div className="inputField">
                <label>Senha</label> <br></br>
                <input></input>
            </div>
            <button className="submitButton">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

// helpers
