# Consulter mes réservations

**`GET /api/bookings/my`**

Récupérez la liste de toutes vos réservations, triées par date et heure.

## Authentification requise
```http
Authorization: Bearer <votre_token_jwt>
```

## Requête

Aucun paramètre requis. Le token JWT identifie automatiquement votre compte.
```bash
curl -X GET https://api.sia-exposition.fr/api/bookings/my \
  -H "Authorization: Bearer eyJhbGc..."
```

## Réponse

### Succès (200)

Un tableau de toutes vos réservations, trié par date, puis heure de début, puis identifiant :
```json
[
  {
    "id": 5,
    "date": "2024-04-15",
    "start_time": "10:00",
    "type": "classic",
    "nb_places": 2
  },
  {
    "id": 6,
    "date": "2024-04-20",
    "start_time": "14:30",
    "type": "vr",
    "nb_places": 1
  },
  {
    "id": 8,
    "date": "2024-04-20",
    "start_time": "15:00",
    "type": "classic",
    "nb_places": 3
  }
]
```

**Si vous n'avez aucune réservation :**
```json
[]
```

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

*Votre compte n'existe plus ou a été supprimé.*

## Structure de la réponse

Chaque réservation contient :

| Champ | Type | Description |
|-------|------|-------------|
| `id` | integer | Identifiant unique de la réservation |
| `date` | string | Date au format `Y-m-d` |
| `start_time` | string | Heure de début au format `HH:mm` |
| `type` | string | Type de visite : `classic` ou `vr` |
| `nb_places` | integer | Nombre de places réservées |

## Tri

Les réservations sont toujours retournées dans cet ordre :

1. **Par date** (croissant) — les plus anciennes en premier
2. **Par heure de début** (croissant) — les créneaux tôt en premier
3. **Par identifiant** (croissant) — en cas d'égalité

**Exemple :** Les réservations du 15 avril à 10:00 et 14:30 apparaîtront avant celles du 20 avril.

## Exemples

### Exemple 1 : Récupération avec réservations

**Requête :**
```bash
curl -X GET https://api.sia-exposition.fr/api/bookings/my \
  -H "Authorization: Bearer eyJhbGc..."
```

**Réponse (200) :**
```json
[
  {
    "id": 1,
    "date": "2024-04-10",
    "start_time": "09:30",
    "type": "classic",
    "nb_places": 1
  },
  {
    "id": 2,
    "date": "2024-04-10",
    "start_time": "14:00",
    "type": "vr",
    "nb_places": 2
  },
  {
    "id": 3,
    "date": "2024-05-05",
    "start_time": "11:00",
    "type": "classic",
    "nb_places": 4
  }
]
```

### Exemple 2 : Aucune réservation

**Requête :**
```bash
curl -X GET https://api.sia-exposition.fr/api/bookings/my \
  -H "Authorization: Bearer eyJhbGc..."
```

**Réponse (200) :**
```json
[]
```

*Vous n'avez pas encore créé de réservation.*

### Exemple 3 : Token invalide ou expiré

**Requête :**
```bash
curl -X GET https://api.sia-exposition.fr/api/bookings/my \
  -H "Authorization: Bearer invalid_token_xyz"
```

**Réponse (401) :**
```json
{
  "error": "Token invalide"
}
```

## Cas d'usage

- Voir toutes vos réservations à venir
- Vérifier les détails d'une réservation avant de la [transférer](./transfer) ou [supprimer](./delete)
- Afficher votre calendrier de visites
- Générer un récapitulatif de vos réservations

## Notes

- **Authentification obligatoire** — Vous ne pouvez consulter que vos propres réservations
- **Pas de filtre** — Cette route retourne **toutes** vos réservations, passées et futures
- **Lecture seule** — Cette route ne modifie rien
- **Token expiré** — Si votre token a expiré, vous recevrez un code 401. Reconnectez-vous via `/api/login`

## Liens connexes

- [Créer une réservation](./create)
- [Transférer une réservation](./transfer)
- [Supprimer une réservation](./delete)