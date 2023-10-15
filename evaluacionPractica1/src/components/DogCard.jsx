import React, { useState, useEffect } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Avatar,
  CircularProgress,
  Box,
} from "@material-ui/core";

const DogCard = () => {
  // Estado para la URL de la imagen y nombre del perro
  const [dogImageUrl, setDogImageUrl] = useState("");
  const [dogName, setDogName] = useState("");

  // Estado para la lista de perros aceptados y rechazados
  const [acceptedDogs, setAcceptedDogs] = useState([]);

  const [rejectedDogs, setRejectedDogs] = useState([]);

  const [dogDescription, setDogDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  //variable para ocultar descripcion del perro 
  const [showDescription, setShowDescription] = useState({});

  // Función para cargar una nueva imagen de perro al azar
  const fetchRandomDog = async (accept) => {
    // Deshabilitar los botones durante la carga
    setIsLoading(true);
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      const imageUrl = data.message;
      const newDog = { name: dogName, imageUrl: dogImageUrl, description : dogDescription };

      // Genera un nuevo nombre de perro
      generateRandomName();

      // Genera una nueva descripcion de perro
      generateRandomDescription();
      // Actualiza la imagen del perro
      setDogImageUrl(imageUrl);

      // Si se acepta el perro, agrega el nombre a la lista de perros aceptados
      if (accept) {
        setAcceptedDogs([...acceptedDogs, newDog]);
      } else if (accept == false) {
        setRejectedDogs([...rejectedDogs, newDog]);
      }
    } catch (error) {
      console.error("Error al cargar la imagen del perro:", error);
    } finally {
      // Habilitar los botones después de que se complete la carga
      setIsLoading(false);
    }
  };

  // Función para generar un nombre de perro aleatorio (6 caracteres)
  const generateRandomName = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomName = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomName += alphabet[randomIndex];
    }
    setDogName(randomName);
  };

  //generar descripcion aleatoria a cada perro

  const generateRandomDescription = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ      ";
    let randomDescription = "";
    for (let i = 10; i < 80; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomDescription += alphabet[randomIndex];
    }
    setDogDescription(randomDescription);
  };

  // Función para mostrar u ocultar la descripción del perro
  const toggleDescription = (index) => {
    //setShowDescription(!showDescription);
    setShowDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Efecto para cargar una imagen y generar un nombre al cargar el componente
  useEffect(() => {
    fetchRandomDog();
  }, []); // El array vacío asegura que esto se ejecute solo una vez al cargar el componente

  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <Box className="dog-card">
          {isLoading ? (
            <Box>
              <CircularProgress
                className="dog-image"
                color="inherit"
                style={{ width: "400px", height: "360px" }}
              />
              Cargando...
            </Box>
          ) : (
            <img
              className="dog-image"
              src={dogImageUrl}
              alt="Perro candidato"
              style={{ width: "400px", height: "400px" }}
            />
          )}
          <h2>Nombre: {dogName}</h2>
          <h4>Descripcion: {dogDescription}</h4>
          <div className="button-container">
            <button
              className="accept-button"
              onClick={() => fetchRandomDog(true)}
              disabled={isLoading}
            >
              Aceptar
            </button>
            <button
              className="reject-button"
              onClick={() => fetchRandomDog(false)}
              disabled={isLoading}
            >
              Rechazar
            </button>
          </div>
        </Box>
      </Grid>
      <Grid item xs className="list-con">

          <div className="list-container">
            <h3 className="list-name">Perros Aceptados</h3>
            <List sx className="list">
              {acceptedDogs.map((newDog, index) => (
                <ListItem key={index}>
                  <Avatar
                    src={newDog.imageUrl}
                    alt="Perro Aceptado"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <ListItemText
                    primary={
                      <span style={{ marginLeft: "15px" }}>{newDog.name}</span>
                    }

                    //boton para mostrar descripcion
                    secondary={
                      showDescription[index] ? (
                        <div>
                          <p>{newDog.description}</p>
                          <button onClick={() => toggleDescription(index)}>
                            Ocultar Descripción
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => toggleDescription(index)}>
                          Mostrar Descripción
                        </button>
                      )
                    }
                  />
                  
                </ListItem>
              ))}
            </List>
          </div>
      </Grid>

      <Grid item xs>
        <div className="list-container">
          <h3 className="list-name">Perros Rechazados</h3>
          <List xs className="list">
            {rejectedDogs.map((newDog, index) => (
              <ListItem key={index}>
                <Avatar
                  src={newDog.imageUrl}
                  alt="Perro Aceptado"
                  style={{ width: "40px", height: "40px" }}
                />
                <ListItemText
                  primary={
                    <span style={{ marginLeft: "15px" }}>{newDog.name}</span>
                  }
                />
                <ListItemText
                  secondary={newDog.description} // Aquí se agrega la descripción
                />
              </ListItem>

              
            ))}
          </List>
        </div>
      </Grid>
    </Grid>
  );
};

export default DogCard;
