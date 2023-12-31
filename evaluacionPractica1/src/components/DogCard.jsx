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

  //variables para diferenciar entre perros aceptados y rechazados
  const [showDescriptionAccepted, setShowDescriptionAccepted] = useState({});
  const [showDescriptionRejected, setShowDescriptionRejected] = useState({});

  // Función para cargar una nueva imagen de perro al azar
  const fetchRandomDog = async (accept) => {
    // Deshabilitar los botones durante la carga
    setIsLoading(true);
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      const imageUrl = data.message;
      const newDog = {
        name: dogName,
        imageUrl: dogImageUrl,
        description: dogDescription,
      };

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
  const toggleDescription = (index, isAccepted) => {
    if (isAccepted) {
      setShowDescriptionAccepted((prevState) => {
        const newDescriptionState = { ...prevState };
        // Establecer todas las descripciones en false
        Object.keys(newDescriptionState).forEach((key) => {
          newDescriptionState[key] = false;
        });
        // Establecer la descripción actual en true si está oculta o en false si está visible
        newDescriptionState[index] = !prevState[index];

        return newDescriptionState;
      });

      // Cerrar todas las descripciones en la lista de perros rechazados
      setShowDescriptionRejected((prevState) => {
        const newDescriptionState = { ...prevState };
        Object.keys(newDescriptionState).forEach((key) => {
          newDescriptionState[key] = false;
        });
        return newDescriptionState;
      });
    } else {
      setShowDescriptionRejected((prevState) => {
        const newDescriptionState = { ...prevState };
        Object.keys(newDescriptionState).forEach((key) => {
          newDescriptionState[key] = false;
        });

        newDescriptionState[index] = !prevState[index];
        return newDescriptionState;
      });

      // Cerrar todas las descripciones en la lista de perros aceptados
      setShowDescriptionAccepted((prevState) => {
        const newDescriptionState = { ...prevState };
        Object.keys(newDescriptionState).forEach((key) => {
          newDescriptionState[key] = false;
        });
        return newDescriptionState;
      });
    }
  };
  //funcion para cambiar de lista, recibe el index del perro, reordenar la lista de perros aceptados y rechazados
  const changeList = (index, isAccepted) => {
    const newAcceptedDogs = [...acceptedDogs];
    const newRejectedDogs = [...rejectedDogs];
    if (isAccepted) {
      //agregar perro a la lista contraria
      newAcceptedDogs.push(newRejectedDogs[index]);
      //eliminar perro de la lista actual
      newRejectedDogs.splice(index, 1);
    } else {
      newRejectedDogs.push(newAcceptedDogs[index]);
      newAcceptedDogs.splice(index, 1);
    }
    //actualizar listas
    setRejectedDogs(newRejectedDogs);
    setAcceptedDogs(newAcceptedDogs);
  };

  //eliminar perro de la lista de candidatos
  const removeDog = (index, isAccepted) => {
    // Copiar el arreglo acceptedDogs
    const updatedAcceptedDogs = [...acceptedDogs];
    const updatedRejectedDogs = [...rejectedDogs];

    if (isAccepted) {
      updatedAcceptedDogs.splice(index, 1);
    } else {
      updatedRejectedDogs.splice(index, 1);
    }
    // Actualizar el estado de acceptedDogs con el nuevo arreglo
    setAcceptedDogs(updatedAcceptedDogs);
    setRejectedDogs(updatedRejectedDogs);
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
                style={{ width: "380px", height: "380px" }}
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

      <Grid item xs>
        <div className="list-container">
          <h3 className="list-name"
          style={{ borderBottom: "4px solid #a5b462" }}>Perros Aceptados</h3>

          <List sx className="list">
            {acceptedDogs.map((newDog, index) => (
              <ListItem
                key={index}
                style={{ borderBottom: "1px solid #a5b462" }}
              >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Avatar
                      src={newDog.imageUrl}
                      alt="Perro Aceptado"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </Grid>
                  <Grid item style={{ textAlign: "left" }}>
                    <div>
                      <span>{newDog.name}</span>
                    </div>
                  </Grid>
                  <Grid item>
                    <div style={{ textAlign: "center" }}>
                      {showDescriptionAccepted[index] && (
                        <p>{newDog.description}</p>
                      )}
                    </div>
                  </Grid>
                  <Grid item>
                    <button 
                    className="list-button"
                    onClick={() => toggleDescription(index, true)}>
                      {showDescriptionAccepted[index] ? " ʌ " : " v "}
                    </button>
                  </Grid>
                  <Grid item>
                    <button 
                    className="list-button"
                    onClick={() => changeList(index, false)}>
                      {"⇌"}
                    </button>
                  </Grid>
                  <Grid item>
                    {/* Botón para eliminar el candidato */}
                    <button 
                    className="delete-button"
                    onClick={() => removeDog(index, true)}>
                      {"X"}
                    </button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>

      <Grid item xs>
        <div className="list-container">
          <h3 className="list-name"
          style={{ borderBottom: "4px solid #404040" }}
          >Perros Rechazados</h3>

          <List sx className="list">
            {rejectedDogs.map((newDog, index) => (
              <ListItem
                key={index}
                style={{ borderBottom: "1px solid #404040" }}
              >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Avatar
                      src={newDog.imageUrl}
                      alt="Perro Rechazado"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </Grid>
                  <Grid item style={{ textAlign: "left" }}>
                    <div>
                      <span>{newDog.name}</span>
                    </div>
                  </Grid>
                  <Grid item>
                    <div style={{ textAlign: "center" }}>
                      {showDescriptionRejected[index] && (
                        <p>{newDog.description}</p>
                      )}
                    </div>
                  </Grid>
                  <Grid item>
                    <button 
                    className="list-button"
                    onClick={() => toggleDescription(index, false)}>
                      {showDescriptionRejected[index] ? " ʌ " : " v "}
                    </button>
                  </Grid>
                  <Grid item>
                    <button 
                    className="list-button"
                    onClick={() => changeList(index, true)}>
                      {"⇌"}
                    </button>
                  </Grid>
                  <Grid item>
                    {/* Botón para eliminar el candidato */}
                    <button 
                    className="delete-button"
                    onClick={() => removeDog(index, false)}>
                      {"X"}
                    </button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>

    </Grid>
  );
};

export default DogCard;
