---
sidebar_position: 2
---

# Connexion à un compte

L'API SIA permet aux utilisateurs de s'authentifier afin d'obtenir un token JWT, nécessaire pour accéder aux endpoints protégés de l'API.

## Endpoint de connexion

L'endpoint de connexion est accessible via une requête POST à l'URL suivante :
```
https://your.domain.net/api/auth/login
```

## Données requises

| Champ | Type | Description | Obligatoire |
|-------|------|-------------|-------------|
| `email` | string | Adresse email du compte | ✓ Oui |
| `password` | string | Mot de passe en clair — la vérification est effectuée côté serveur | ✓ Oui |

## Exemple de requête

### cURL
```bash
curl -X POST https://your.domain.net/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "katy.perry@capitolrecords.com",
    "password": "BonAppétit2017/*"
  }'
```

### JavaScript/Fetch
```javascript
fetch('https://your.domain.net/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'katy.perry@capitolrecords.com',
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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoia2F0eS5wZXJyeUBjYXBpdG9scmVjb3Jkcy5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNjIzOTAyMiwiZXhwIjoxNzE2MzI1NDIyfQ.4Jb8vQkXz2mN9pLsYwRtUoD1eHcA6FgTnWqMvXsZkPo",
  "account": {
    "id": 1,
    "username": "katyperry",
    "email": "katy.perry@capitolrecords.com",
    "role": "user",
    "status": "Connecté"
  }
}
```

> Le token JWT retourné doit être conservé côté client et transmis dans le header `Authorization` de chaque requête aux endpoints protégés :
> ```
> Authorization: Bearer <token>
> ```

### Structure du payload JWT

Le token JWT contient les informations suivantes dans son payload :

| Champ | Type | Description |
|-------|------|-------------|
| `sub` | integer | Identifiant unique du compte |
| `email` | string | Adresse email du compte |
| `role` | string | Rôle de l'utilisateur (`user`, `admin`, etc.) |
| `iat` | integer | Date d'émission du token (timestamp Unix) |
| `exp` | integer | Date d'expiration du token (timestamp Unix) |

### Erreurs

> Toute requête effectuée sur cet endpoint avec une méthode autre que `POST` retournera une erreur `405 Method Not Allowed`.

#### Champ obligatoire manquant (400 Bad Request)
```json
{
  "error": "Le champ 'email' est requis"
}
```

#### Identifiants incorrects (401 Unauthorized)
```json
{
  "error": "Email ou mot de passe incorrect"
}
```

> Par sécurité, l'API ne précise pas si c'est l'email ou le mot de passe qui est incorrect, afin d'éviter l'énumération de comptes existants.

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

- Le mot de passe est transmis en clair via HTTPS et vérifié côté serveur avec `password_verify()` de PHP
- Le token JWT est signé avec l'algorithme **HS256** et la clé secrète définie dans la configuration du serveur
- Le token a une durée de validité limitée, définie par la constante `JWT_EXPIRY`
- En cas d'identifiants invalides, l'API retourne systématiquement la même erreur générique, sans distinguer email et mot de passe inconnus