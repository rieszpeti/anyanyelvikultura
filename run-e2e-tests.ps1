# Clean up any previous containers and volumes
docker-compose -f docker-dev-compose.yml down --volumes --remove-orphans

# Rebuild and start the Docker environment
docker-compose -f docker-dev-compose.yml up --build -d

# Wait for the environment to fully initialize (adjust sleep as needed)
Write-Host "Waiting for the environment to fully initialize..."
Start-Sleep -Minutes 10

# Run Playwright tests
Write-Host "Running Playwright tests..."
pnpm playwright test
