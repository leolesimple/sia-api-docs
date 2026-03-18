# Créer un ticket de support

**`POST /api/support/ticket`**

Ouvrez un ticket de support pour toute question ou problème concernant l'exposition.

## Authentification requise
```http
Authorization: Bearer <votre_token_jwt>
```

## Requête

### Payload
```json
{
  "subject": "Problème d'accès à mon compte",
  "message": "Je n'arrive pas à me connecter avec mes identifiants"
}
```

### Paramètres

| Paramètre | Type | Required | Description |
|-----------|------|----------|-------------|
| `subject` | string | ✓ | Titre du ticket (résumé du problème) |
| `message` | string | ✓ | Description détaillée du problème |

## Validation

- **`subject`** : non vide, au moins 1 caractère
- **`message`** : non vide, au moins 1 caractère
- **Authentification** : votre token JWT doit être valide

## Réponses

### Succès (201)
```json
{
  "id": 12,
  "subject": "Problème d'accès à mon compte",
  "status": "open",
  "created_at": "2024-03-18T15:30:45+00:00"
}
```

### Erreur - Données invalides (400)
```json
{
  "error": "subject est requis"
}
```

Ou :
```json
{
  "error": "message est requis"
}
```

**Causes possibles :**
- Le champ `subject` est manquant ou vide
- Le champ `message` est manquant ou vide
- Le corps de la requête n'est pas un JSON valide

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

## Exemples

### Exemple 1 : Ticket créé avec succès

**Requête :**
```bash
curl -X POST https://api.sia-exposition.fr/api/support/ticket \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Question sur les tarifs pour groupes",
    "message": "Nous sommes un groupe de 15 personnes, y a-t-il une réduction disponible?"
  }'
```

**Réponse (201) :**
```json
{
  "id": 45,
  "subject": "Question sur les tarifs pour groupes",
  "status": "open",
  "created_at": "2024-03-18T15:30:45+00:00"
}
```

### Exemple 2 : Sujet vide

**Requête :**
```bash
curl -X POST https://api.sia-exposition.fr/api/support/ticket \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "",
    "message": "Voici ma question en détail"
  }'
```

**Réponse (400) :**
```json
{
  "error": "subject est requis"
}
```

### Exemple 3 : Message manquant

**Requête :**
```bash
curl -X POST https://api.sia-exposition.fr/api/support/ticket \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Ma question"
  }'
```

**Réponse (400) :**
```json
{
  "error": "message est requis"
}
```

### Exemple 4 : Token invalide

**Requête :**
```bash
curl -X POST https://api.sia-exposition.fr/api/support/ticket \
  -H "Authorization: Bearer invalid_token" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Ma question",
    "message": "Détails du problème"
  }'
```

**Réponse (401) :**
```json
{
  "error": "Token invalide"
}
```

## Statut des tickets

Tous les nouveaux tickets sont créés avec le statut **`open`** (ouvert).

| Statut | Signification |
|--------|---------------|
| `open` | Ticket créé, en attente de réponse |
| `in_progress` | Pris en charge par l'équipe |
| `resolved` | Problème résolu |
| `closed` | Ticket fermé |

## Notes

- **Authentification obligatoire** — Vous devez être connecté pour créer un ticket
- **Lien au compte** — Le ticket est associé à votre compte automatiquement
- **Timestamp** — La date et heure de création (`created_at`) est générée automatiquement
- **Réponse rapide** — Nous nous efforçons de répondre sous 24h

## Cas d'usage

- Signaler un problème avec une réservation
- Poser une question sur l'exposition
- Demander une assistance technique
- Faire une remarque ou suggestion
- Signaler un bug ou une anomalie

## Conseils pour un bon ticket

Pour que nous puissions vous aider au mieux :

1. **Sujet clair** — résumez votre problème en quelques mots
2. **Message détaillé** — décrivez exactement ce qui se passe
3. **Contexte** — mentionnez les étapes que vous avez déjà essayées
4. **Réservation liée** — si applicable, donnez l'ID de votre réservation

**Exemple :**
```json
{
  "subject": "Impossible de créer une réservation pour le 15 avril",
  "message": "Quand je tente de créer une réservation pour le 15 avril à 10h00 en visite classique avec 2 places, j'obtiens une erreur 'Capacité dépassée'. Pouvez-vous vérifier?"
}
```

## Contact direct

Pour les urgences ou les questions avant exposition, contactez directement l'équipe via [notre formulaire de contact](https://sia-exposition.fr/contact).