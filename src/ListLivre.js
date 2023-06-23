import React, { useState, useEffect } from 'react';

const ListLivres = ({ adherent }) => {
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    // Récupérer la liste des livres disponibles depuis l'API
    fetch('/api/livres/disponibles')
      .then(response => response.json())
      .then(data => setLivres(data))
      .catch(error => console.log(error));
  }, []);

  const emprunterLivre = livreId => {
    // Effectuer une requête d'emprunt de livre à l'API
    fetch(`/api/emprunts/emprunter?adherentId=${adherent.id}&livreId=${livreId}`, {
      method: 'POST',
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
            <td>{livre.auteurs.map(auteur => auteur.nom).join(', ')}</td>
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
