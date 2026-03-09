---
sidebar_position: 1
---

# Création d'un compte
L'API SIA permet aux utilisateurs de s'inscrire par eux-mêmes lors de la prise de ticket en ligne.
Cela leur permet de créer un compte personnel pour gérer leurs réservations ainsi que le SAV pour d'éventuels problèmes liés à leurs tickets.

## Endpoint d'inscription
L'endpoint d'inscription est accessible via une requête POST à l'URL suivante :
```
https://your.domain.net/api/auth/register
```

## Données requises
Pour s'inscrire, les utilisateurs doivent fournir les informations suivantes dans le corps de la requête :

| Champ | Type | Description | Obligatoire |
|-------|------|-------------|-------------|
| `surname` | string | Nom de famille de l'utilisateur | ✓ Oui |
| `name` | string | Prénom de l'utilisateur | ✓ Oui |
| `username` | string | Nom d'utilisateur unique pour la connexion | ✓ Oui |
| `email` | string | Adresse email unique de l'utilisateur | ✓ Oui |
| `password` | string | Mot de passe en clair — le hachage est effectué côté serveur | ✓ Oui |

> **Note :** Le mot de passe doit être transmis en clair dans la requête. Le hachage est réalisé côté serveur via `password_hash()` (algorithme `PASSWORD_DEFAULT` de PHP). La confidentialité des données en transit est assurée par HTTPS.

## Exemple de requête

### cURL
```bash
curl -X POST https://your.domain.net/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "surname": "Perry",
    "name": "Katy",
    "username": "katyperry",
    "email": "katy.perry@capitolrecords.com",
    "password": "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"
  }'
```

### JavaScript/Fetch
```javascript
fetch('https://your.domain.net/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    surname: 'Perry',
    name: 'Katy',
    username: 'katyperry',
    email: 'katy.perry@capitolrecords.com',
    password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Erreur:', error));
```

> **Note :** Le hash utilisé dans ces exemples est fictif et fourni à titre illustratif uniquement. En conditions réelles, le client envoie le mot de passe en clair et le serveur se charge du hachage.

## Validations

L'API effectue les validations suivantes :

- **Email** : Doit être une adresse email valide au format standard (`user@domain.ext`)
- **Unicité de l'email** : L'adresse email doit être unique dans la base de données
- **Unicité du username** : Le nom d'utilisateur doit être unique dans la base de données
- **Champs obligatoires** : Tous les champs doivent être présents et non vides

## Réponse

### Succès (201 Created)
```json
{
  "message": "Compte créé avec succès"
}
```

> Le compte est créé mais aucune session n'est ouverte automatiquement. L'utilisateur doit ensuite s'authentifier via [`/api/auth/login`](./login.md) pour obtenir un token d'accès.

### Erreurs

> Toute requête effectuée sur cet endpoint avec une méthode autre que `POST` retournera une erreur `405 Method Not Allowed`.

#### Email invalide (400 Bad Request)
```json
{
  "error": "Email invalide"
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
  "error": "Le nom d'utilisateur jeandupont est déjà utilisé"
}
```

#### Champ obligatoire manquant (400 Bad Request)
```json
{
  "error": "Le champ 'surname' est requis"
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
  "error": "Erreur serveur"
}
```

## Sécurité

- Les mots de passe sont transmis en clair via HTTPS puis **hachés côté serveur** avec l'algorithme `PASSWORD_DEFAULT` de PHP avant d'être stockés en base de données
- L'API valide les adresses email avec une expression régulière stricte
- Chaque nouvel utilisateur se voit attribuer le rôle `user` par défaut
- Les horodatages `created_at` et `updated_at` sont automatiquement définis lors de la création du compte