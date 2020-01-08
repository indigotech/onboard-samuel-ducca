// src/components/LoginPage.tsx

import * as React from 'react';

function LoginPage() {
  return (
    <div className="login">
      <h1 className="greeting">
        Bem-vindo(a) à Taqtile!
      </h1>
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

export default LoginPage;

// helpers
