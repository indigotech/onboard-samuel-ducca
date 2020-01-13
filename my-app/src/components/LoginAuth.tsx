import * as React from 'react';
import { client } from '..';
import gql from 'graphql-tag';

export function storeToken(token: string)
{
  localStorage.setItem("@onboarding/token", token);
}

export async function doLogin(email:string,password:string) : Promise<void>
{
  const LOGIN_MUTATION = gql`
  mutation Authenticate{
    Login(data: {email: "${email}", password: "${password}"})
    {
      token
    }
  }
  `;

  var result = await client.mutate({mutation: LOGIN_MUTATION});
  storeToken(result.data.Login.token);
}
