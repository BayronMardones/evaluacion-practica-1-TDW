import React, { useState, useEffect } from 'react';

const DogCard = () => {
  // Estado para la URL de la imagen del perro
  const [dogImageUrl, setDogImageUrl] = useState('');
  // Estado para el nombre del perro candidato (generado aleatoriamente)
  const [dogName, setDogName] = useState('');

  // Función para cargar una nueva imagen de perro al azar
  const fetchRandomDog = async () => {
    // Coloca aquí la lógica para hacer la solicitud GET a la API de perros
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      const imageUrl = data.message;
      setDogImageUrl(imageUrl);
      // Generar un nuevo nombre de perro cada vez que se obtiene una imagen nueva
      generateRandomName();
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
    <div className="dog-card">
      <img
        src={dogImageUrl}
        alt="Perro candidato"
        style={{ width: '500px', height: '500px' }} 
      />
      <h2>Nombre: {dogName}</h2>
      <button onClick={fetchRandomDog}>Aceptar</button>
      <button onClick={fetchRandomDog}>Rechazar</button>
    </div>
  );
};

export default DogCard;
