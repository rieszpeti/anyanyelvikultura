docker-compose down --volumes --remove-orphans

docker-compose up --build -d

echo "Waiting for the environment to fully initialize..."
sleep 30

npx playwright test
