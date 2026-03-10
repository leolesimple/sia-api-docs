# Mise à jour du mot de passe

Cet endpoint permet à un utilisateur authentifié de modifier son mot de passe. La confirmation du mot de passe actuel est exigée.

> Pour modifier les autres informations du compte (username, email, etc.), utiliser [`/auth/me/update`](./update.md).

## Endpoint
```
PUT https://your.domain.net/auth/me/password
```

## Authentification

Cet endpoint est **protégé**. Le token JWT obtenu lors de la connexion doit être transmis dans le header `Authorization` :
```
Authorization: Bearer <token>
```

## Données requises

| Champ | Type | Description | Obligatoire |
|-------|------|-------------|-------------|
| `current_password` | string | Mot de passe actuel du compte | ✓ Oui |
| `new_password` | string | Nouveau mot de passe souhaité | ✓ Oui |

> Les deux mots de passe sont transmis en clair via HTTPS. Le hachage du nouveau mot de passe est effectué côté serveur avec `password_hash()`.

## Exemple de requête

### cURL
```bash
curl -X PUT https://your.domain.net/auth/me/password \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "current_password": "BonAppétit2017/*",
    "new_password": "WitchyWoman2024/*"
  }'
```

### JavaScript/Fetch
```javascript
fetch('https://your.domain.net/auth/me/password', {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    current_password: 'BonAppétit2017/*',
    new_password: 'WitchyWoman2024/*'
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
  "message": "Mot de passe mis à jour avec succès"
}
```

### Erreurs

> Toute requête effectuée sur cet endpoint avec une méthode autre que `PUT` retournera une erreur `405 Method Not Allowed`.

#### Champ obligatoire manquant (400 Bad Request)
```json
{
  "error": "Le champ 'current_password' est requis"
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

#### Mot de passe actuel incorrect (401 Unauthorized)
```json
{
  "error": "Mot de passe actuel incorrect"
}
```

#### Compte introuvable (404 Not Found)
```json
{
  "error": "Compte non trouvé"
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
  "error": "Une erreur est survenue lors de la mise à jour du mot de passe"
}
```

## Sécurité

- Le token JWT est vérifié avant toute opération — l'identifiant du compte est lu depuis le claim `sub` du payload
- Le mot de passe actuel est vérifié avec `password_verify()` avant toute modification
- Le nouveau mot de passe est haché côté serveur avec `password_hash()` et l'algorithme `PASSWORD_DEFAULT` de PHP
- Un utilisateur ne peut modifier que son propre mot de passe, déterminé par le token et non par le body de la requête