#!/bin/bash

echo "4) Mise a jour du fichier ecosystem."
cp ~/apps/clients-projects/mike/transacmoney_admin/ecosystem-prod.config ~/apps/clients-projects/mike/transacmoney_admin/ecosystem.config.js || { echo "Échec du déplacement du fichier de configuration."; exit 1; }

# Charger NVM et installer les dépendances
echo "5) Chargement de NVM et installation des dépendances..."
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh || { echo "Échec du chargement de NVM."; exit 1; }
yarn install || { echo "Échec de l'installation des dépendances."; exit 1; }

# Construire l'application
echo "6) Build de l'application..."
yarn run build || { echo "Échec du build."; exit 1; }

# Gérer le processus avec PM2

echo "7) Gestion du processus avec PM2..."

if pm2 list | grep -q "transacmoney-admin"; then
  echo "Le processus transacmoney-admin existe, suppression du processus..."
  pm2 delete transacmoney-admin || { echo "Échec de la suppression du processus."; exit 1; }
else
  echo "Aucun processus PM2 existant trouvé à supprimer."
fi

pm2 start -- ecosystem.config || { echo "Échec du démarrage de l'application avec PM2."; exit 1; }
pm2 save || { echo "Échec de l'enregistrement de l'état PM2."; exit 1; }

echo "8) Déploiement terminé avec succès."
