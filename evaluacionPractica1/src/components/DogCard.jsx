import React, { useState, useEffect } from 'react';

const DogCard = () => {
  // Estado para la URL de la imagen del perro
  const [dogImageUrl, setDogImageUrl] = useState('');
  // Estado para el nombre del perro candidato (generado aleatoriamente)
  const [dogName, setDogName] = useState('');
  const [acceptedDogs, setAcceptedDogs] = useState([]);
  const [rejectedDogs, setRejectedDogs] = useState([]);


  // Función para cargar una nueva imagen de perro al azar
  const fetchRandomDog = async (accept) => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      const imageUrl = data.message;
  
      // Genera un nuevo nombre de perro
      generateRandomName();
  
      // Actualiza la imagen del perro
      setDogImageUrl(imageUrl);
  
      // Si se acepta el perro, agrega el nombre a la lista de perros aceptados
      if (accept) {
        setAcceptedDogs([...acceptedDogs, dogName]);
      } else if(accept == false){
        // Si se rechaza el perro, agrega el nombre a la lista de perros rechazados
        setRejectedDogs([...rejectedDogs, dogName]);
      }
    } catch (error) {
      console.error('Error al cargar la imagen del perro:', error);
    }
  };
  

  // Función para generar un nombre de perro aleatorio (6 caracteres)
  const generateRandomName = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomName = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomName += alphabet[randomIndex];
    }
    setDogName(randomName);
  };

  // Efecto para cargar una imagen y generar un nombre al cargar el componente
  useEffect(() => {
    fetchRandomDog();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al cargar el componente

  return (
    <body>
    <div className="dog-card">
      <img
        src={dogImageUrl}
        alt="Perro candidato"
        style={{ width: '400px', height: '400px' }} 
      />
      <h2>Nombre: {dogName}</h2>
      <button onClick={() => fetchRandomDog(true)}>Aceptar</button>
      <button onClick={() => fetchRandomDog(false)}>Rechazar</button>
    </div>

    <body className="dog-lists">
      <div className="accepted-list">
      <h3>Perros Aceptados</h3>
      <ul>
        {acceptedDogs.map((dog, index) => (
          <li key={index}>{dog}</li>
        ))}
      </ul>
      </div>
    <div className="rejected-list">
      <h3>Perros Rechazados</h3>
      <ul>
        {rejectedDogs.map((dog, index) => (
          <li key={index}>{dog}</li>
        ))}
      </ul>
    </div>
    </body>
    
  </body>
  );
};

export default DogCard;
