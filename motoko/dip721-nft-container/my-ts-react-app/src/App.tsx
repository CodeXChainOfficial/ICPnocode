import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react"
import axios from "axios"; // Import Axios for making HTTP requests
import { HttpAgent, Actor, ActorConfig } from '@dfinity/agent';
import { canisterId, idlFactory } from './declarations';

  




const App: React.FC = () => {





const [image_url, setImage_url] = useState("");
const [mintname, setMintName] = useState("");
const [description, setDescription] = useState("");
const [CollectionName, setCollectionNamel] = useState("");
const [CollectionLimit, setCollectionLimit] = useState("");
const [result1, setResult1] = useState<string>("");
const [canisterIds, setCanisterIds] = useState<string[]>([]);
const [resulto, setResulto] = useState<string>("");
const [name, setName] = useState<string>("");
const [logo, setLogo] = useState<string>("");






const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
  setState(e.target.value);

};

const handleReusltChange = (newResult: string) => {
    setResult1(newResult);
    console.log("result change", newResult);

    if (!canisterIds.includes(newResult)) {
      // Append the new canisterId to the list
      setCanisterIds((prevIds: string[]) => [...prevIds, newResult]);
    }
  };
// Assuming you have a function to handle the API call
const deployTokenApiCall = async () => {
  try {
    const response = await fetch('http://34.42.152.203:5004/api/createToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ CollectionName, CollectionLimit, image_url, mintname, description }),
    });

    if (!response.ok) {
      throw new Error('Error deploying token.');
    }

    const result = await response.json();
    console.log('API Call Result:', result);
    console.log('call',callCanister())
    handleReusltChange(result.canisterId);

    // Handle the result as needed
  } catch (error) {
    console.error('API Call Error:', error);
    // Handle the error as needed
  }
};
const canisterLink = `http://127.0.0.1:4943/?canisterId=zdtmx-wmaaa-aaaaa-qac2q-cai&id=${result1}`; // Replace 'your-id' with the actual id






const callCanister = async () => {
  const canisterId = result1; // Replace with your actual canister ID
  const endpointUrl = 'http://127.0.0.1:4943/?canisterId=zdtmx-wmaaa-aaaaa-qac2q-cai&id='; // Replace with the appropriate endpoint

  const agent = new HttpAgent({ host: endpointUrl });
  const actorConfig: ActorConfig = {
    canisterId: canisterId,
    agent: agent,
  };

  const myActor = Actor.createActor(idlFactory,{
    agent,
    canisterId,
});
  try {
    // Call a function on the canister
    const name = await myActor.nameDip721();
    console.log('name',name)
    const logo = await myActor.logoDip721();
console.log('logo',logo)


    
    return name;
  } catch (error) {
    console.error('Error calling canister:', error);
  }
};

return (
  <div className="App">

    <header className="App-header">
      <title>Token Deployment</title>
      <input type="text" placeholder="Collection Name" value={CollectionName} onChange={(e) => handleInputChange(e, setCollectionNamel)} />
      <input type="text" placeholder="Mint Limit" value={CollectionLimit} onChange={(e) => handleInputChange(e, setCollectionLimit)} />
     

      <input type="text" placeholder="Img" value={image_url} onChange={(e) => handleInputChange(e, setImage_url)} />
      <input type="text" placeholder="Name" value={mintname} onChange={(e) => handleInputChange(e, setMintName)} />
      <input type="text" placeholder="Symbol" value={description} onChange={(e) => handleInputChange(e, setDescription)} />
      <button onClick={deployTokenApiCall}>Deploy</button>

      <div>
      <p>New Canister ID created is: {result1}</p>
      <ul>
        {canisterIds.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
      <a href={canisterLink} target="_blank" rel="noopener noreferrer">Open Canister</a>

      {/* Other JSX elements in your component */}
    </div>
    </header>
  </div>
);

};
export default App;
