# Mise à jour du compte

Cet endpoint permet à un utilisateur authentifié de mettre à jour ses informations personnelles.

> Le mot de passe ne peut pas être modifié via cet endpoint. Utiliser [`/auth/me/password`](./update_password.md) à cet effet.

## Endpoint
```
PUT https://your.domain.net/auth/me/update
```

## Authentification

Cet endpoint est **protégé**. Le token JWT obtenu lors de la connexion doit être transmis dans le header `Authorization` :
```
Authorization: Bearer <token>
```

## Données requises

| Champ | Type | Description | Obligatoire |
|-------|------|-------------|-------------|
| `username` | string | Nouveau nom d'utilisateur unique | ✓ Oui |
| `email` | string | Nouvelle adresse email unique | ✓ Oui |
| `surname` | string | Nouveau nom de famille | ✓ Oui |
| `name` | string | Nouveau prénom | ✓ Oui |

> Tous les champs sont obligatoires, même si leur valeur ne change pas.

## Exemple de requête

### cURL
```bash
curl -X PUT https://your.domain.net/auth/me/update \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "username": "katyperry",
    "email": "katy.perry@capitolrecords.com",
    "surname": "Perry",
    "name": "Katy"
  }'
```

### JavaScript/Fetch
```javascript
fetch('https://your.domain.net/auth/me/update', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'katyperry',
    email: 'katy.perry@capitolrecords.com',
    surname: 'Perry',
    name: 'Katy'
  })
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
  "role": "user",
  "status": "Informations mises à jour avec succès"
}
```

### Erreurs

> Toute requête effectuée sur cet endpoint avec une méthode autre que `PUT` retournera une erreur `405 Method Not Allowed`.

#### Champ obligatoire manquant (400 Bad Request)
```json
{
  "error": "Le champ 'email' est requis"
}
```

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

#### Compte introuvable (404 Not Found)
```json
{
  "error": "Compte non trouvé"
}
```

#### Email déjà utilisé (409 Conflict)
```json
{
  "error": "Cet email est déjà utilisé"
}
```

#### Nom d'utilisateur déjà utilisé (409 Conflict)
```json
{
  "error": "Ce nom d'utilisateur est déjà utilisé"
}
```

#### Méthode non autorisée (405 Method Not Allowed)
```json
{
  "error": "Method not allowed"
}
```

#### Erreur serveur (500 Internal Server Error)
```json
{
  "error": "Une erreur est survenue lors de la mise à jour du compte"
}
```

## Sécurité

- Le token JWT est vérifié avant toute opération — l'identifiant du compte est lu depuis le claim `sub` du payload
- L'unicité de l'email et du username est vérifiée uniquement si leur valeur change, afin d'éviter un faux conflit sur les données actuelles
- Un utilisateur ne peut modifier que son propre compte, déterminé par le token et non par le body de la requête