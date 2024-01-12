import React, { useState } from "react"
import { useLoaderData, useNavigation, Form, redirect, useActionData } from "react-router-dom"
import { loginUser } from "../api";


export function loader({ request, params }) {
    return new URL(request.url).searchParams.get('message')
}

 async function  sleep(time){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(); 
        }, time)
    })
}

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get('email')
    const password = formData.get('password')
  
    const redirectTo = new URL(request.url).searchParams.get('redirectTo') ||  '/host'
    try {
        await sleep(3000);
        const data = await loginUser({ email, password })
        localStorage.setItem('loggedin', true)
        return redirect(redirectTo)

    } catch (error) {
        return error.message
    }


    //return redirect('/host') 
    return "couldn't login "
}


export default function Login() {

    const [status, setStatus] = useState('idle')

    const errorMesage = useActionData()



    const message = useLoaderData();
    const navigation = useNavigation();
    console.log('navigation', navigation)

  

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {errorMesage && <h3 className="red">{errorMesage}</h3>}
          

            <Form method="post" replace className="login-form">
                <input
                    name="email"

                    type="email"
                    placeholder="Email address"

                />
                <input
                    name="password"

                    type="password"
                    placeholder="Password"

                />
                <button disabled={navigation.state == 'submitting'}>
                    {navigation.state == 'submitting' ? 'Log in...' : 'Log in'}
                </button>
            </Form>
        </div>
    )

}