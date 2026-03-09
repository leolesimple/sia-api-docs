---
sidebar_position: 3
---

# Informations du compte connecté

Cet endpoint permet à un utilisateur authentifié de récupérer ses propres informations de compte à partir de son token JWT.

## Endpoint
```
GET https://your.domain.net/api/auth/me
```

## Authentification

Cet endpoint est **protégé**. Le token JWT obtenu lors de la connexion doit être transmis dans le header `Authorization` :
```
Authorization: Bearer <token>
```

## Exemple de requête

### cURL
```bash
curl -X GET https://your.domain.net/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### JavaScript/Fetch
```javascript
fetch('https://your.domain.net/api/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Erreur:', error));
```

## Réponse

### Succès (200 OK)
```json
{
  "id": 1,
  "username": "katyperry",
  "email": "katy.perry@capitolrecords.com",
  "role": "user"
}
```

### Erreurs

> Toute requête effectuée sur cet endpoint avec une méthode autre que `GET` retournera une erreur `405 Method Not Allowed`.

#### Token manquant ou mal formé (401 Unauthorized)
```json
{
  "error": "Token manquant ou invalide"
}
```

#### Token expiré ou invalide (401 Unauthorized)
```json
{
  "error": "Token invalide"
}
```

> Cette erreur est retournée si le token est expiré, mal signé ou altéré.

#### Compte introuvable (404 Not Found)
```json
{
  "error": "Compte non trouvé"
}
```

> Ce cas se produit si le compte associé au token a été supprimé après l'émission du token.

#### Méthode non autorisée (405 Method Not Allowed)
```json
{
  "error": "Method not allowed"
}
```

#### Erreur serveur (500 Internal Server Error)
```json
{
  "error": "Erreur serveur"
}
```

## Sécurité

- Le token est extrait du header `Authorization` via le schéma `Bearer`
- Il est vérifié et décodé avec l'algorithme **HS256** et la clé secrète du serveur
- L'identifiant du compte est lu depuis le claim `sub` du payload JWT — l'utilisateur ne peut accéder qu'à ses propres données
- Toute exception lors du décodage (token expiré, altéré, mal signé) retourne systématiquement une `401` sans détail supplémentaire