cat <<EOT > start.sh
#!/bin/bash
while :
do
    echo "🚀 Iniciando NarutoBot 2026..."
    node index.js
    sleep 2
done
EOT
chmod +x start.sh
