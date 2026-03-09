---
sidebar_position: 6
---

# Suppression du compte

Cet endpoint permet à un utilisateur authentifié de supprimer définitivement son compte ainsi que toutes les données associées.

> ⚠️ **Cette action est irréversible.** Le compte et l'ensemble des données liées (favoris, historique, etc.) sont supprimés de manière permanente.

## Endpoint
```
DELETE https://your.domain.net/api/auth/delete_me
```

## Authentification

Cet endpoint est **protégé**. Le token JWT obtenu lors de la connexion doit être transmis dans le header `Authorization` :
```
Authorization: Bearer <token>
```

## Données requises

| Champ | Type | Description | Obligatoire |
|-------|------|-------------|-------------|
| `password` | string | Mot de passe du compte, pour confirmation | ✓ Oui |

> La confirmation par mot de passe est exigée en plus du token JWT afin de prévenir toute suppression accidentelle ou suite à un token volé.

## Exemple de requête

### cURL
```bash
curl -X DELETE https://your.domain.net/api/auth/delete_me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "password": "BonAppétit2017/*"
  }'
```

### JavaScript/Fetch
```javascript
fetch('https://your.domain.net/api/auth/delete_me', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    password: 'BonAppétit2017/*'
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
  "message": "Compte supprimé avec succès"
}
```

### Erreurs

> Toute requête effectuée sur cet endpoint avec une méthode autre que `DELETE` retournera une erreur `405 Method Not Allowed`.

#### Champ obligatoire manquant (400 Bad Request)
```json
{
  "error": "Le champ 'password' est requis"
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

#### Mot de passe incorrect (401 Unauthorized)
```json
{
  "error": "Mot de passe incorrect"
}
```

#### Compte introuvable (404 Not Found)
```json
{
  "error": "Compte non trouvé"
}
```

> Ce cas se produit si le compte associé au token a déjà été supprimé.

#### Erreur lors de la suppression (500 Internal Server Error)
```json
{
  "error": "Une erreur est survenue lors de la suppression du compte"
}
```

#### Méthode non autorisée (405 Method Not Allowed)
```json
{
  "error": "Method not allowed"
}
```

## Sécurité

- Le token JWT est vérifié avant toute opération — l'identifiant du compte est lu depuis le claim `sub` du payload
- Une confirmation par mot de passe est exigée en plus du token, comme second facteur de validation
- Le mot de passe est vérifié côté serveur avec `password_verify()` de PHP
- En cas d'erreur d'authentification, aucun détail supplémentaire n'est exposé