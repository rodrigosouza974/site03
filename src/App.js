 import { useState } from 'react';
 import{ FiSearch } from 'react-icons/fi'
 import'./styles.css';
import { waitForElementToBeRemoved } from '@testing-library/react';
import api from './services/api';

 function App() {

    const[input,setInput]= useState('');
    const[cep,setCep]=useState({});

    async function handleSearch(){
      //01310930/json/
      if(input === ""){
        alert("preencha algum CEP!!!")
        return;
      }
      try{
        const response = await api.get(`${input}/json`);
        setCep(response.data)
        setInput("");
      }catch{
        alert("Erro ao Buscar");
        setInput("")
      }
      
    }

  return (
    <div className="container">
      <h1 className="title">buscar cep</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF'/>
          </button>
      </div>

        {Object.keys(cep).length > 0 && (

<main className="main">
<h2>CEP:{cep.cep}</h2>

<span>{cep.logradouro}</span>
<span>complememento: {cep.complemento}</span>
<span>{cep.bairro}</span>
<span>{cep.localidade} - {cep.uf}</span>

</main>
        )}
        
    </div>
  );
}

export default App;
