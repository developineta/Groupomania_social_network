## Groupomania - réseau social de l'entreprise

La réalisation du backend et frontend de l'application Groupomania.

## Frontend
- Le frontend du projet a été généré avec framework VueJS
- lancement du serveur sur `http://localhost:8080/` avec la commande `npm run serve`

## Backend
Le backend du projet a été généré avec Node serveur, framework Express, et la base de données MySQL.
Le demarrage du serveur `http://localhost:3000/` avec la commande `nodemon server`


## Securité et fonctionnement
Pour respecter les standards d'OWASP, les mésures de sécurité ont été introduites dans backend :
- Le mot de passe d'utilisateur est chiffré avec package 'bcrypt'
- L'email d'utilisateur est masqué avec 'maskdata'
- Les adresses email des utilisateurs sont uniques
- La moderation de publications peut être faite par utilisateur assigné comme administrateur dans la base de données
- Pour la connexion d'utilisateur le 'token' secret est utilisé qui expire dans 24h

Dans frontend :
- la soumission de données de formulaires est vérifié avec 'simple-vue-validator'
- 'axios' est utilisé pour communiquer avec l'API
- les requêtes peuvent être faites que par l'utilisateur authentifié

## Les fonctionnalités
- Création de compte, connexion, déconnexion
- Modification de données de son compte, ajout d'image de profil
- Suppression de son compte
- Ajout de publications avec ou sans l'image
- Suppression de sa publication
- Apperçu de toutes les publications, triés par date
- Apperçu de chaque publication apart
- Apperçu de toutes les publications d'un utilisateur
- Apperçu de profil des autres utilisateurs
- Moderateur qui a les droits de supprimer les publications de n'importe quel utilisateur