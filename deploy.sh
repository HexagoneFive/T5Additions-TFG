#!/bin/bash

DIR_TRABALHO="./trabalho"
DIR_DESPEJO="./despejo"
BRANCH="main"

echo "--- Sincronizando arquivos ---"
# O parâmetro -u (--update) diz ao rsync para pular arquivos que são mais novos no destino
# O --exclude='.git' impede que o histórico do repositório vá para o servidor
rsync -avz --update --exclude='.git' "$DIR_TRABALHO/" "$DIR_DESPEJO/"

echo -e "\n--- Automação do Git ---"
cd "$DIR_TRABALHO" || exit

# Checa se há alterações
if [[ -n $(git status -s) ]]; then
    git add .
    git commit -m "Auto-update: $(date +'%Y-%m-%d %H:%M:%S')"
    git push origin "$BRANCH"
    echo "🚀 Alterações enviadas para o GitHub."
else
    echo "Nenhuma alteração pendente para o GitHub."
fi