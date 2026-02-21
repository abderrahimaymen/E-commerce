# E-commerce Application Startup Script
# Choose between Docker or Local Development

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  E-commerce Application - Quick Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Choose your preferred setup:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. LOCAL DEVELOPMENT (Recommended for coding)" -ForegroundColor Green
Write-Host "   - Faster startup" -ForegroundColor Gray
Write-Host "   - Hot reload enabled" -ForegroundColor Gray
Write-Host "   - Better debugging" -ForegroundColor Gray
Write-Host "   - Requires: MySQL installed locally" -ForegroundColor Gray
Write-Host ""
Write-Host "2. DOCKER (Recommended for testing)" -ForegroundColor Blue
Write-Host "   - Complete isolation" -ForegroundColor Gray
Write-Host "   - Production-like environment" -ForegroundColor Gray
Write-Host "   - No local MySQL needed" -ForegroundColor Gray
Write-Host "   - Requires: Docker Desktop running" -ForegroundColor Gray
Write-Host ""
Write-Host "3. EXIT" -ForegroundColor Red
Write-Host ""

$choice = Read-Host "Enter your choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Starting LOCAL DEVELOPMENT setup..." -ForegroundColor Green
        Write-Host ""
        Write-Host "📖 Please follow the guide: LOCAL-DEVELOPMENT.md" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Quick steps:" -ForegroundColor Cyan
        Write-Host "1. Ensure MySQL is running locally" -ForegroundColor White
        Write-Host "2. Create database: ecommerce_db" -ForegroundColor White
        Write-Host "3. Update backend/.env with your MySQL credentials" -ForegroundColor White
        Write-Host "4. Open 2 terminals:" -ForegroundColor White
        Write-Host ""
        Write-Host "   Terminal 1 (Backend):" -ForegroundColor Yellow
        Write-Host "   cd backend" -ForegroundColor White
        Write-Host "   npm install" -ForegroundColor White
        Write-Host "   npm run start:dev" -ForegroundColor White
        Write-Host ""
        Write-Host "   Terminal 2 (Frontend):" -ForegroundColor Yellow
        Write-Host "   cd frontend" -ForegroundColor White
        Write-Host "   npm install" -ForegroundColor White
        Write-Host "   npm run dev" -ForegroundColor White
        Write-Host ""
        Write-Host "5. Access: http://localhost:5173" -ForegroundColor Green
        Write-Host ""
        
        $startNow = Read-Host "Do you want to start backend now? (y/n)"
        if ($startNow -eq "y" -or $startNow -eq "Y") {
            Write-Host ""
            Write-Host "Checking MySQL connection..." -ForegroundColor Cyan
            
            # Check if MySQL83 is running
            $mysqlService = Get-Service -Name "MySQL83" -ErrorAction SilentlyContinue
            if ($mysqlService -and $mysqlService.Status -eq "Running") {
                Write-Host "✓ MySQL83 service is running" -ForegroundColor Green
            } elseif ($mysqlService) {
                Write-Host "⚠ MySQL83 service exists but is not running" -ForegroundColor Yellow
                Write-Host "  Starting MySQL83 service..." -ForegroundColor Cyan
                try {
                    Start-Service -Name "MySQL83"
                    Write-Host "✓ MySQL83 service started" -ForegroundColor Green
                } catch {
                    Write-Host "⚠ Could not start MySQL83. Try running PowerShell as Administrator" -ForegroundColor Yellow
                }
            } else {
                Write-Host "⚠ MySQL83 service not found. Please ensure MySQL 8.3 is installed." -ForegroundColor Yellow
                Write-Host "  Or run mysql-setup.ps1 for detailed diagnostics" -ForegroundColor Gray
            }
            
            Write-Host ""
            Write-Host "Starting backend in new window..." -ForegroundColor Cyan
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force; cd '$PSScriptRoot\backend'; Write-Host 'Installing dependencies...' -ForegroundColor Yellow; npm install; Write-Host 'Starting backend...' -ForegroundColor Green; npm run start:dev"
            
            Start-Sleep -Seconds 2
            
            Write-Host "Starting frontend in new window..." -ForegroundColor Cyan
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force; cd '$PSScriptRoot\frontend'; Write-Host 'Installing dependencies...' -ForegroundColor Yellow; npm install; Write-Host 'Starting frontend...' -ForegroundColor Green; npm run dev"
            
            Write-Host ""
            Write-Host "✓ Backend and Frontend terminals opened!" -ForegroundColor Green
            Write-Host "  Wait for them to start, then access: http://localhost:5173" -ForegroundColor Cyan
        }
    }
    "2" {
        Write-Host ""
        Write-Host "Starting DOCKER setup..." -ForegroundColor Blue
        Write-Host ""
        
        # Check if Docker is running
        Write-Host "Checking Docker Desktop..." -ForegroundColor Cyan
        try {
            $dockerVersion = docker --version 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Docker is installed: $dockerVersion" -ForegroundColor Green
                
                # Try to connect to Docker daemon
                $dockerPs = docker ps 2>&1
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "✓ Docker Desktop is running" -ForegroundColor Green
                    Write-Host ""
                    
                    Write-Host "📖 For detailed Docker guide, see: DOCKER-SETUP.md" -ForegroundColor Yellow
                    Write-Host ""
                    
                    $startDocker = Read-Host "Do you want to start with Docker now? (y/n)"
                    if ($startDocker -eq "y" -or $startDocker -eq "Y") {
                        Write-Host ""
                        Write-Host "Building and starting containers..." -ForegroundColor Cyan
                        Write-Host "This may take 5-10 minutes for the first build..." -ForegroundColor Yellow
                        Write-Host ""
                        
                        docker-compose up --build -d
                        
                        if ($LASTEXITCODE -eq 0) {
                            Write-Host ""
                            Write-Host "✓ Containers started successfully!" -ForegroundColor Green
                            Write-Host ""
                            Write-Host "View logs with: docker-compose logs -f" -ForegroundColor Cyan
                            Write-Host "Access application at: http://localhost:5173" -ForegroundColor Green
                            Write-Host "Access Swagger API at: http://localhost:3000/api/docs" -ForegroundColor Green
                            Write-Host ""
                            Write-Host "Check container status:" -ForegroundColor Yellow
                            docker-compose ps
                        } else {
                            Write-Host ""
                            Write-Host "✗ Failed to start containers. Check the errors above." -ForegroundColor Red
                        }
                    }
                } else {
                    Write-Host "✗ Docker Desktop is NOT running!" -ForegroundColor Red
                    Write-Host ""
                    Write-Host "Please start Docker Desktop and try again." -ForegroundColor Yellow
                    Write-Host "1. Open Docker Desktop application" -ForegroundColor White
                    Write-Host "2. Wait for Docker icon to turn green in system tray" -ForegroundColor White
                    Write-Host "3. Run this script again" -ForegroundColor White
                }
            } else {
                Write-Host "✗ Docker is not installed!" -ForegroundColor Red
                Write-Host ""
                Write-Host "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "✗ Docker check failed: $_" -ForegroundColor Red
        }
    }
    "3" {
        Write-Host ""
        Write-Host "Exiting..." -ForegroundColor Gray
        exit
    }
    default {
        Write-Host ""
        Write-Host "Invalid choice. Please run the script again." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "For more information, check:" -ForegroundColor Yellow
Write-Host "  - LOCAL-DEVELOPMENT.md (Local setup guide)" -ForegroundColor White
Write-Host "  - DOCKER-SETUP.md (Docker setup guide)" -ForegroundColor White
Write-Host "  - README.md (Complete documentation)" -ForegroundColor White
Write-Host "  - QUICKSTART.md (API testing guide)" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to exit"
