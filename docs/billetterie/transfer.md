# Transférer une réservation

**`PUT /api/bookings/transfer`**

Transférez une réservation à un autre utilisateur. Seul le propriétaire de la réservation peut la transférer.

## Authentification requise
```http
Authorization: Bearer <votre_token_jwt>
```

## Requête

### Payload
```json
{
  "id_booking": 5,
  "email_destinataire": "autre@example.com"
}
```

### Paramètres

| Paramètre | Type | Required | Description |
|-----------|------|----------|-------------|
| `id_booking` | integer | ✓ | Identifiant de la réservation à transférer |
| `email_destinataire` | string | ✓ | Email du compte qui recevra la réservation |

## Validation

- **`id_booking`** : entier positif, doit correspondre à une réservation existante
- **`email_destinataire`** : email non vide, doit correspondre à un compte existant
- **Propriété** : vous devez être le propriétaire de la réservation pour la transférer
- **Authentification** : votre token JWT doit être valide

## Réponses

### Succès (200)
```json
{
  "message": "Réservation transférée avec succès",
  "booking": {
    "id": 5,
    "date": "2024-04-15",
    "start_time": "10:00",
    "type": "classic",
    "nb_places": 2,
    "account_id": 3,
    "email_destinataire": "autre@example.com"
  }
}
```

### Erreur - Données invalides (400)
```json
{
  "error": "id_booking invalide"
}
```

Ou :
```json
{
  "error": "email_destinataire est requis"
}
```

**Causes possibles :**
- Le champ `id_booking` est manquant ou n'est pas un entier
- La valeur de `id_booking` est < 0
- Le champ `email_destinataire` est manquant ou vide

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

### Erreur - Réservation introuvable (404)
```json
{
  "error": "Réservation non trouvée"
}
```

*La réservation avec cet `id_booking` n'existe pas.*

### Erreur - Compte destinataire introuvable (404)
```json
{
  "error": "Compte destinataire non trouvé"
}
```

*Aucun compte ne correspond à cet email. Vérifiez que le destinataire a créé un compte sur SIA.*

### Erreur - Accès refusé (403)
```json
{
  "error": "Vous ne pouvez pas transférer cette réservation"
}
```

*Vous n'êtes pas propriétaire de cette réservation. Seul le propriétaire peut la transférer.*

## Exemples

### Exemple 1 : Transfert réussi

**Requête :**
```bash
curl -X PUT https://api.sia-exposition.fr/api/bookings/transfer \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "id_booking": 5,
    "email_destinataire": "marie@example.com"
  }'
```

**Réponse (200) :**
```json
{
  "message": "Réservation transférée avec succès",
  "booking": {
    "id": 5,
    "date": "2024-04-15",
    "start_time": "10:00",
    "type": "classic",
    "nb_places": 2,
    "account_id": 3,
    "email_destinataire": "marie@example.com"
  }
}
```

*La réservation appartient maintenant à Marie (account_id: 3).*

### Exemple 2 : Compte destinataire inexistant

**Requête :**
```bash
curl -X PUT https://api.sia-exposition.fr/api/bookings/transfer \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "id_booking": 5,
    "email_destinataire": "inconnu@example.com"
  }'
```

**Réponse (404) :**
```json
{
  "error": "Compte destinataire non trouvé"
}
```

*Aucun compte avec cet email n'existe. Le destinataire doit d'abord se créer un compte.*

### Exemple 3 : Vous n'êtes pas propriétaire

**Requête :**
```bash
curl -X PUT https://api.sia-exposition.fr/api/bookings/transfer \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "id_booking": 3,
    "email_destinataire": "marie@example.com"
  }'
```

**Réponse (403) :**
```json
{
  "error": "Vous ne pouvez pas transférer cette réservation"
}
```

*La réservation 3 appartient à quelqu'un d'autre. Seul son propriétaire peut la transférer.*

### Exemple 4 : ID réservation invalide

**Requête :**
```bash
curl -X PUT https://api.sia-exposition.fr/api/bookings/transfer \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "id_booking": "abc",
    "email_destinataire": "marie@example.com"
  }'
```

**Réponse (400) :**
```json
{
  "error": "id_booking invalide"
}
```

## Notes

- **Changement de propriétaire** — Après le transfert, la réservation n'apparaît plus dans vos `/api/bookings/my`, elle apparaît dans celle du destinataire
- **Pas d'annulation** — Si vous voulez simplement annuler une réservation sans la donner, utilisez plutôt [`DELETE /api/bookings/delete`](./delete)
- **Compte destinataire requis** — Le destinataire doit avoir créé un compte avant de recevoir une réservation
- **Authentification** — Votre token JWT doit être valide et correspondre au propriétaire actuel

## Cas d'usage courants

- Vous ne pouvez plus aller à la visite et voulez la donner à un ami
- Vous avez réservé pour quelqu'un d'autre et voulez la mettre à son nom
- Vous voulez que quelqu'un d'autre gère la réservation à votre place

## Liens connexes

- [Créer une réservation](./create)
- [Mes réservations](./get_mine.md)
- [Supprimer une réservation](./delete)