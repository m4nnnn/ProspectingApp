import { useEffect, useState } from "react"

function  HeaderPage () {

    const initialValues = {
        firstName: '', lastName: '', email:'', password:'',
    }
    const [values, setvalues]= useState(initialValues)

    useEffect (() =>  {

    })


    // const Create = async () => {
        

    //     try {
    //         const res = await fetch("http://localhost:3000/auth/login", {
    //             method:"POST",
    //             headers:{
    //                 "Content-Type":"application/json","Accept": "application/json"
    //             },
    //             body: JSON.stringify()
    //         })
    //         const data = res.json()
    //         if(!res.ok){
    //             return console.error(`Une nouvelle erreur a été détècter : ${res.status} ${res.statusText}`)
    //         }
    //     }catch (error){
    //         throw new Error(`Une nouvelle erreur a été détècter : ${error}`)
    //     }
        
    // }

    const handlechange = (e) => {
        console.log(e.target)
        setvalues(prev => ({...values, [e.target.name]: e.target.value}))
    }

    const handlersubmit = e => {
        e.preventDefault()
        console.log(JSON.stringify(values))

        fetch('http://localhost:3000/auth/register', {
            method:"POST",
            headers:{
                    "Content-Type":"application/json","Accept": "application/json"
                },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(values => console.log(values))
        .catch(console.error)
        setvalues(initialValues);
    }


return (
<section>
    <header>
      <img className="HeaderImg" src="./public/vite.svg" alt="placeholder"></img>
    </header>
    <div className="LogFull">
    
    <form name="Content-Type" onSubmit={handlersubmit} action="">   

        <div className="LogDiv">
            <h2 className="Log-h2">Créer votre compte</h2>

            <h3 className="Log-h3">prénom</h3>
            <input 
            className="Log-input"  id="Create-name" type="text" value={values.firstName} onChange={handlechange} name="firstName"/>

            <h3 className="Log-h3">nom de famille</h3>
            <input className="Log-input" id="Create-mail" type="text" value={values.lastName} onChange={handlechange} name="lastName"></input>

            <h3 className="Log-h3">Email</h3>
            <input className="Log-input" id="Create-mdp" type="text" value={values.email} onChange={handlechange} name="email"></input>

            <h3 className="Log-h3">mots de passe</h3>
            <input className="Log-input" id="Create-check-mdp" type="text" value={values.password} onChange={handlechange} name="password" ></input>

            <button id="Log-return" class="Create">Créer le compte</button>

            <p id="Log-link" >Vous disposez déjà d'un compte ?</p>
            <button className="Log-btn" id="Log-return" type="submit">annuler</button>
        </div>
    </form>

    <form onSubmit={handlersubmit} action="">
        <div className="LogDiv">
            <h2 className="Log-h2">Connexion</h2>

            <h3 className="NewAccount-h3">Nom d'utilisateur</h3>
            <input className="Log-input" id="Login-name" type="text"></input>

            <h3 className="Log-h3">Mots de passe</h3>
            <input className="Log-input" id="Login-mdp" type="text"></input>
            <button id="Log-return" class="Connect">se connecter</button>
            <p id="Log-link">Mots de passe oublié ?</p>
            <button className="Log-btn" id="Log-return">annuler</button>
        </div>
    </form>
        <div className="LogDiv">
            <h2 className="Log-h2">Déconnexion</h2>
            <button className="deconnect" id="Log-return">Se déconnecter</button>
            <button className="Log-btn" id="Log-return">annuler</button>
        </div>
        
    </div>

</section>
    )
    
    
}

export default HeaderPage

