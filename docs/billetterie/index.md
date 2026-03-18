# Billetterie

L'API SIA propose un système de réservation sécurisé par **JWT (JSON Web Tokens)** pour gérer les créations, consultations, transferts et suppressions de réservations.

## Fonctionnement

### Créer une réservation

Créez une réservation via `POST /api/bookings/create` en spécifiant la date, l'heure de début, le type et le nombre de places.

**Règles de validation :**
- `date` : format `Y-m-d`
- `start_time` : entre `09:30` et `18:00`, par pas de 30 minutes
- `type` : `classic` ou `vr`
- `nb_places` : entre 1 et 10
- Capacité maximale par créneau et type : **10 places**

### Consulter ses réservations

Récupérez vos réservations via `GET /api/bookings/my`, triées par date, heure et identifiant.

**Authentification requise.**

### Transférer une réservation

Transférez une réservation via `PUT /api/bookings/transfer` en fournissant `id_booking` et `email_destinataire`.

**Restrictions :**
- Seul le propriétaire peut transférer
- Le compte destinataire doit exister

### Supprimer une réservation

Supprimez une réservation via `DELETE /api/bookings/delete` avec `id_booking`.

**Restrictions :**
- Seul le propriétaire peut supprimer

## Authentification

Incluez votre token JWT dans l'en-tête des requêtes :
```http
Authorization: Bearer <votre_token_jwt>
```

L'API valide la signature, l'expiration et l'identité à chaque requête protégée.

## Sécurité

- Authentification stateless par JWT
- Vérification de propriété sur transfert et suppression
- Validation stricte du JSON et des champs requis
- Contrôle métier de capacité par créneau/type
- Protection CORS

## Endpoints

| Endpoint                               | Méthode  | Description                |
|----------------------------------------|----------|----------------------------|
| [`/api/bookings/create`](./create)     | `POST`   | Créer une réservation      |
| [`/api/bookings/my`](./get_mine)       | `GET`    | Lister mes réservations    |
| [`/api/bookings/transfer`](./transfer) | `PUT`    | Transférer une réservation |
| [`/api/bookings/delete`](./delete)     | `DELETE` | Supprimer une réservation  |

## Schéma de données

| Champ | Type | Description |
|-------|------|-------------|
| `id` | integer | Identifiant unique |
| `date` | string | Date de réservation (`Y-m-d`) |
| `start_time` | string | Heure de début (`HH:mm`) |
| `type` | string | Type (`classic` ou `vr`) |
| `nb_places` | integer | Nombre de places (1-10) |
| `account_id` | integer | Propriétaire de la réservation |