# Supprimer une réservation

**`DELETE /api/bookings/delete`**

Annulez une réservation existante. Seul le propriétaire de la réservation peut la supprimer.

## Authentification requise
```http
Authorization: Bearer <votre_token_jwt>
```

## Requête

### Payload
```json
{
  "id_booking": 5
}
```

### Paramètres

| Paramètre | Type | Required | Description |
|-----------|------|----------|-------------|
| `id_booking` | integer | ✓ | Identifiant de la réservation à supprimer |

## Validation

- **`id_booking`** : entier positif, doit correspondre à une réservation existante
- **Propriété** : vous devez être le propriétaire de la réservation pour la supprimer
- **Authentification** : votre token JWT doit être valide

## Réponses

### Succès (200)
```json
{
  "message": "Réservation supprimée avec succès"
}
```

### Erreur - id_booking invalide (400)
```json
{
  "error": "id_booking invalide"
}
```

**Causes possibles :**
- Le champ `id_booking` est manquant
- La valeur n'est pas un entier
- La valeur est `< 0`

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

*La réservation avec cet `id_booking` n'existe pas ou a déjà été supprimée.*

### Erreur - Accès refusé (403)
```json
{
  "error": "Vous ne pouvez pas supprimer cette réservation"
}
```

*Vous n'êtes pas propriétaire de cette réservation. Seul le propriétaire peut la supprimer.*

## Exemples

### Exemple 1 : Suppression réussie

**Requête :**
```bash
curl -X DELETE https://api.sia-exposition.fr/api/bookings/delete \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "id_booking": 5
  }'
```

**Réponse (200) :**
```json
{
  "message": "Réservation supprimée avec succès"
}
```

### Exemple 2 : Réservation introuvable

**Requête :**
```bash
curl -X DELETE https://api.sia-exposition.fr/api/bookings/delete \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "id_booking": 999
  }'
```

**Réponse (404) :**
```json
{
  "error": "Réservation non trouvée"
}
```

### Exemple 3 : Vous n'êtes pas propriétaire

**Requête :**
```bash
curl -X DELETE https://api.sia-exposition.fr/api/bookings/delete \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "id_booking": 3
  }'
```

**Réponse (403) :**
```json
{
  "error": "Vous ne pouvez pas supprimer cette réservation"
}
```

*La réservation 3 appartient à un autre compte. Seul son propriétaire peut la supprimer.*

## Notes

- **Suppression définitive** — Cette action est irréversible. Une fois supprimée, la réservation ne peut pas être récupérée
- **Places libérées** — Les places supprimées deviennent disponibles pour d'autres utilisateurs
- **Authentification** — Votre token JWT doit être valide et correspondre au propriétaire de la réservation
- **Alternatives** — Si vous souhaitez garder votre réservation mais la donner à quelqu'un d'autre, utilisez plutôt le [transfert](./transfer)

## Cas d'usage courants

- Annuler une visite prévue
- Libérer des places si vos plans changent
- Nettoyer vos réservations anciennes