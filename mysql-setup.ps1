# MySQL 8.3 Setup and Connection Test Script
# Run this script to verify MySQL 8.3 connectivity before starting the app

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MySQL 8.3 Connection Checker" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MySQL83 service exists and is running
Write-Host "Checking MySQL83 service..." -ForegroundColor Yellow

$mysqlService = Get-Service -Name "MySQL83" -ErrorAction SilentlyContinue

if ($mysqlService) {
    Write-Host "✓ MySQL83 service found" -ForegroundColor Green
    
    if ($mysqlService.Status -eq "Running") {
        Write-Host "✓ MySQL83 service is RUNNING" -ForegroundColor Green
    } else {
        Write-Host "⚠ MySQL83 service is STOPPED" -ForegroundColor Yellow
        Write-Host ""
        $startService = Read-Host "Do you want to start MySQL83 service? (y/n)"
        
        if ($startService -eq "y" -or $startService -eq "Y") {
            try {
                Write-Host "Starting MySQL83 service..." -ForegroundColor Cyan
                Start-Service -Name "MySQL83"
                Write-Host "✓ MySQL83 service started successfully!" -ForegroundColor Green
            } catch {
                Write-Host "✗ Failed to start MySQL83 service: $_" -ForegroundColor Red
                Write-Host "Try running PowerShell as Administrator" -ForegroundColor Yellow
                exit
            }
        } else {
            Write-Host "Please start MySQL83 service manually and try again." -ForegroundColor Yellow
            exit
        }
    }
} else {
    Write-Host "✗ MySQL83 service not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Available MySQL services on your system:" -ForegroundColor Yellow
    Get-Service -Name "MySQL*" -ErrorAction SilentlyContinue | Format-Table -Property Name, Status, DisplayName
    Write-Host ""
    Write-Host "Please ensure MySQL 8.3 is installed and the service name is 'MySQL83'" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Checking MySQL connectivity..." -ForegroundColor Yellow

# Check if mysql command is available
$mysqlPath = Get-Command mysql -ErrorAction SilentlyContinue

if ($mysqlPath) {
    Write-Host "✓ MySQL client found at: $($mysqlPath.Source)" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Testing connection..." -ForegroundColor Cyan
    Write-Host "Enter your MySQL root password when prompted" -ForegroundColor Gray
    Write-Host ""
    
    # Test connection
    $testQuery = "SELECT VERSION() as version;"
    $result = mysql -u root -p -e $testQuery 2>$null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Successfully connected to MySQL!" -ForegroundColor Green
        Write-Host ""
        Write-Host "MySQL Version:" -ForegroundColor Cyan
        Write-Host $result
        
        Write-Host ""
        Write-Host "Checking if ecommerce_db database exists..." -ForegroundColor Yellow
        
        $checkDb = "SHOW DATABASES LIKE 'ecommerce_db';"
        $dbExists = mysql -u root -p -e $checkDb 2>$null
        
        if ($dbExists -match "ecommerce_db") {
            Write-Host "✓ Database 'ecommerce_db' exists" -ForegroundColor Green
        } else {
            Write-Host "⚠ Database 'ecommerce_db' does not exist" -ForegroundColor Yellow
            Write-Host ""
            $createDb = Read-Host "Do you want to create the database now? (y/n)"
            
            if ($createDb -eq "y" -or $createDb -eq "Y") {
                $createDbQuery = "CREATE DATABASE ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
                mysql -u root -p -e $createDbQuery
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "✓ Database 'ecommerce_db' created successfully!" -ForegroundColor Green
                } else {
                    Write-Host "✗ Failed to create database" -ForegroundColor Red
                }
            }
        }
    } else {
        Write-Host "✗ Failed to connect to MySQL" -ForegroundColor Red
        Write-Host "Please check:" -ForegroundColor Yellow
        Write-Host "  1. MySQL83 service is running" -ForegroundColor White
        Write-Host "  2. Root password is correct" -ForegroundColor White
        Write-Host "  3. MySQL is listening on port 3306" -ForegroundColor White
    }
} else {
    Write-Host "⚠ MySQL client (mysql.exe) not found in PATH" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "MySQL is installed but the command-line client may not be in your PATH." -ForegroundColor Gray
    Write-Host "You can still use MySQL Workbench or add MySQL to PATH manually." -ForegroundColor Gray
    Write-Host ""
    Write-Host "To add MySQL to PATH:" -ForegroundColor Cyan
    Write-Host "1. Find your MySQL installation (usually C:\Program Files\MySQL\MySQL Server 8.3\bin)" -ForegroundColor White
    Write-Host "2. Add it to System Environment Variables > Path" -ForegroundColor White
    Write-Host "3. Restart PowerShell" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Backend Configuration Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Checking backend/.env file..." -ForegroundColor Yellow

$envFile = ".\backend\.env"
if (Test-Path $envFile) {
    Write-Host "✓ .env file found" -ForegroundColor Green
    Write-Host ""
    Write-Host "Current database configuration:" -ForegroundColor Cyan
    Get-Content $envFile | Select-String -Pattern "DATABASE_" | ForEach-Object {
        Write-Host "  $_" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "Make sure these settings match your MySQL setup!" -ForegroundColor Yellow
} else {
    Write-Host "⚠ .env file not found" -ForegroundColor Yellow
    Write-Host "Copy backend/.env.example to backend/.env and update settings" -ForegroundColor Gray
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Ensure MySQL83 service is running" -ForegroundColor White
Write-Host "2. Database 'ecommerce_db' exists" -ForegroundColor White
Write-Host "3. Update backend/.env with your MySQL credentials" -ForegroundColor White
Write-Host "4. Run: cd backend && npm run start:dev" -ForegroundColor White
Write-Host "5. Run: cd frontend && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Or use the interactive starter: .\start.ps1" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
