# Authentification

L'API SIA utilise un système d'authentification basé sur **JWT (JSON Web Tokens)** et **Doctrine ORM** pour sécuriser l'accès aux ressources.

## Fonctionnement

### Inscription
Création d'un compte via `/api/auth/register` avec les informations personnelles de l'utilisateur. Les mots de passe sont hachés avec bcrypt et un rôle `user` est attribué automatiquement.

### Connexion
Authentification via `/api/auth/login` avec email/username et mot de passe. L'API retourne un token JWT contenant les informations de l'utilisateur.

### Utilisation
Inclusion du token dans l'en-tête des requêtes protégées :

```http
Authorization: Bearer <votre_token_jwt>
```

### Vérification
L'API valide la signature, l'expiration et les permissions du token à chaque requête.

## Sécurité

- Hachage bcrypt des mots de passe
- Authentification stateless par JWT
- Validation stricte des formats et unicité des identifiants
- Gestion des rôles et permissions
- Protection CORS

## Endpoints

- **[Inscription](./register)** - Créer un compte utilisateur
- **Connexion** - Obtenir un token JWT
- **Rafraîchissement** - Renouveler un token expiré

## Structure de données

Table `accounts` :

| Champ | Type | Description |
|-------|------|-------------|
| `id` | integer | Identifiant unique |
| `surname` | string | Nom de famille |
| `name` | string | Prénom |
| `username` | string | Nom d'utilisateur unique |
| `email` | string | Adresse email unique |
| `password` | string | Mot de passe haché |
| `role` | string | Rôle utilisateur |
| `created_at` | datetime | Date de création |
| `updated_at` | datetime | Date de mise à jour |





