# Créer une réservation

**`POST /api/bookings/create`**

Créez une nouvelle réservation pour un créneau de visite à l'exposition.

## Authentification requise
```http
Authorization: Bearer <votre_token_jwt>
```

## Requête

### Payload
```json
{
  "date": "2024-04-15",
  "start_time": "10:00",
  "type": "classic",
  "nb_places": 2
}
```

### Paramètres

| Paramètre | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | string | ✓ | Date de la réservation, format `Y-m-d` |
| `start_time` | string | ✓ | Heure de début, format `HH:mm` |
| `type` | string | ✓ | Type de visite : `classic` ou `vr` |
| `nb_places` | integer | ✓ | Nombre de places (1-10) |

## Validation

Les règles suivantes s'appliquent à chaque créneaux :

- **`date`** : format `Y-m-d`, dans le futur
- **`start_time`** : entre `09:30` et `18:00` inclus, par pas de 30 minutes
    - Créneaux valides : `09:30`, `10:00`, `10:30`, `11:00`, ... `18:00`
- **`type`** : soit `classic` (visite guidée), soit `vr` (réalité virtuelle)
- **`nb_places`** : entre 1 et 10
- **Capacité** : maximum 10 places par créneau et par type
    - Si un créneau est déjà réservé, vous ne pouvez ajouter que les places restantes

## Réponses

### Succès (201)
```json
{
  "id": 5,
  "date": "2024-04-15",
  "start_time": "10:00",
  "type": "classic",
  "nb_places": 2,
  "account_id": 1
}
```

### Erreur - Données invalides (400)
```json
{
  "error": "Le champ 'date' est requis"
}
```

Ou si le créneau est complet :
```json
{
  "error": "Capacité dépassée pour ce créneau et ce type de réservation",
  "remaining_places": 3
}
```

**Causes possibles :**
- Un ou plusieurs champs requis sont manquants ou vides
- La date n'est pas au format `Y-m-d`
- L'heure n'est pas dans les créneaux valides
- Le type n'est ni `classic` ni `vr`
- Le nombre de places est < 1 ou > 10
- Le créneau est complet

### Erreur - Authentification manquante (401)
```json
{
  "error": "Token manquant ou invalide"
}
```

Ou :
```json
{
  "error": "Token invalide"
}
```

### Erreur - Compte introuvable (404)
```json
{
  "error": "Compte non trouvé"
}
```

## Exemples

### Exemple 1 : Réservation classique simple

**Requête :**
```bash
curl -X POST https://api.sia-exposition.fr/api/bookings/create \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-04-15",
    "start_time": "10:00",
    "type": "classic",
    "nb_places": 2
  }'
```

**Réponse :**
```json
{
  "id": 5,
  "date": "2024-04-15",
  "start_time": "10:00",
  "type": "classic",
  "nb_places": 2,
  "account_id": 1
}
```

### Exemple 2 : Réservation VR avec 1 place

**Requête :**
```bash
curl -X POST https://api.sia-exposition.fr/api/bookings/create \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-04-20",
    "start_time": "14:30",
    "type": "vr",
    "nb_places": 1
  }'
```

**Réponse :**
```json
{
  "id": 6,
  "date": "2024-04-20",
  "start_time": "14:30",
  "type": "vr",
  "nb_places": 1,
  "account_id": 1
}
```

### Exemple 3 : Créneau complet

**Requête :**
```bash
curl -X POST https://api.sia-exposition.fr/api/bookings/create \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-04-15",
    "start_time": "10:00",
    "type": "classic",
    "nb_places": 5
  }'
```

**Réponse (400) :**
```json
{
  "error": "Capacité dépassée pour ce créneau et ce type de réservation",
  "remaining_places": 3
}
```

*Le créneau du 15 avril à 10:00 en visite classique a déjà 7 places réservées, il n'en reste que 3.*

## Notes

- Chaque réservation est liée au compte de l'utilisateur authentifié
- La capacité est **par créneau et par type** : un même créneau peut avoir 10 places en `classic` ET 10 places en `vr` en même temps
- Une fois créée, la réservation peut être [transférée](./transfer) ou [supprimée](./delete)
- Le token JWT doit être valide et non expiré