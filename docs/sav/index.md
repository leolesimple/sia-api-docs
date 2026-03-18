# Support Tickets API

Système API pour gérer les tickets de support créés par les utilisateurs de la billetterie.

## Vue d'ensemble

L'endpoint de tickets permet aux utilisateurs authentifiés de signaler des problèmes, poser des questions ou faire des remarques concernant leurs réservations et l'exposition.

## Caractéristiques

- **Authentification requise** — JWT token obligatoire
- **Lié au compte** — chaque ticket est associé automatiquement au compte du créateur
- **Statut par défaut** — créé avec le statut `open`
- **Timestamp** — date de création générée automatiquement

## Structure des données

### Ticket

| Champ | Type | Description |
|-------|------|-------------|
| `id` | integer | Identifiant unique du ticket |
| `subject` | string | Titre/sujet du ticket |
| `message` | string | Description détaillée |
| `status` | string | État du ticket : `open`, `in_progress`, `resolved`, `closed` |
| `account_id` | integer | Compte proprietaire |
| `created_at` | datetime | Date et heure de création (ISO 8601) |

## Endpoints

| Route | Méthode | Description                 |
|-------|---------|-----------------------------|
| `/api/support/ticket` | `POST` | [Créer un ticket](./create) |

## Flux typique
```
POST /api/support/ticket
  ↓
Validation (subject, message, auth)
  ↓
Création SupportTicket entity
  ↓
Status = 'open'
  ↓
Response 201 + ticket ID
```

## Codes HTTP

| Code | Signification |
|------|---------------|
| `201` | Ticket créé avec succès |
| `400` | Données manquantes ou invalides |
| `401` | Authentification manquante/invalide |
| `404` | Compte introuvable |
| `405` | Méthode HTTP non autorisée |

## Validation

- **`subject`** : string, non vide
- **`message`** : string, non vide
- **Token JWT** : valide et non expiré

## Exemple complet

**Requête :**
```bash
curl -X POST https://api.sia-exposition.fr/api/support/ticket \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Impossible de transférer une réservation",
    "message": "Erreur 404 quand je tente de transférer ma réservation ID 5 à marie@example.com"
  }'
```

**Réponse (201) :**
```json
{
  "id": 12,
  "subject": "Impossible de transférer une réservation",
  "status": "open",
  "created_at": "2024-03-18T15:30:45+00:00"
}
```

## Intégration côté back

### Entity SupportTicket

Supposée avoir :
- `id` (PK)
- `subject` (string)
- `message` (string)
- `status` (string, default `open`)
- `account` (ManyToOne → Accounts)
- `created_at` (datetime, auto-generated)

### Implémentation

L'endpoint utilise Doctrine ORM pour :
1. Décoder le JWT et récupérer `account_id`
2. Charger l'entité `Accounts`
3. Créer une nouvelle entité `SupportTicket`
4. Persister et flush
5. Retourner le ticket créé

## Sécurité

- **JWT validation** — token signé avec `JWT_SECRET`
- **Ownership** — le ticket est lié au compte authentifié automatiquement
- **CORS** — headers CORS gérés via `cors.php`
- **JSON validation** — le body doit être un JSON valide

## Notes de développement

- L'email du créateur n'est pas retourné dans la réponse (utiliser `account_id` pour cross-reference)
- Le statut initial est toujours `open`, pas d'option pour changer à la création
- Pas d'endpoint GET/UPDATE/DELETE pour les tickets (lecture/modification admin uniquement)
- Le timestamp `created_at` est généré côté serveur, pas côté client

## Limitations actuelles

- Aucun système de notification automatique
- Pas de pagination pour la liste des tickets
- Pas d'endpoint pour consulter l'historique personnel des tickets
- Statut fixe à la création (pas de transition d'état côté user)

## Liens connexes

- [Détail endpoint POST](./create.md)