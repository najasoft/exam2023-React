import React, { useState, useEffect } from 'react';

function ListLivres ()  {
  const [livres, setLivres] = useState([]);
  const adherent = {id:9};
  const loadData = () => {
   
    fetch("http://localhost:8080/livres")
      .then(response => response.json())
      .then(data => setLivres(data))
      .catch(error => console.log(error));
  };

  useEffect((livres) => {
    loadData();
  }, []);

  const emprunterLivre = livreId => {
    // Effectuer une requête d'emprunt de livre à l'API
    let emprunt={};
    emprunt.livre={"id": livreId};
    emprunt.adherent={"id": adherent.id};
    fetch(`http://localhost:8080/emprunts`, {
      method: 'POST',
      body: JSON.stringify(emprunt),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Emprunt réussi, mettre à jour la liste des livres disponibles
          const updatedLivres = livres.filter(livre => livre.id !== livreId);
          setLivres(updatedLivres);
        } else {
          console.log('Erreur lors de l\'emprunt du livre');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Prix</th>
          <th>Genre</th>
          <th>Auteurs</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {livres.map(livre => (
          <tr key={livre.id}>
            <td>{livre.titre}</td>
            <td>{livre.prix}</td>
            <td>{livre.genre.nom}</td>
            <td><ul>{livre.auteurs.map(auteur => <li>{auteur.nom} </li>)}</ul></td>
            <td>
              <button onClick={() => emprunterLivre(livre.id)}>Emprunter</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListLivres;
