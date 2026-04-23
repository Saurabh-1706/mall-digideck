# Download replacement images for empty/broken files
# Run this script in PowerShell

$imagesDir = "d:\Project\mall2\public\images"

Write-Host "Downloading replacement images..." -ForegroundColor Cyan

# Replace empty attractions-ice-rink.jpg
Write-Host "Downloading ice rink image..." -ForegroundColor Yellow
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=1000" -OutFile "$imagesDir\attractions-ice-rink.jpg"

# Remove unused image-1.jpg (or you can download a replacement)
Write-Host "Removing empty image-1.jpg..." -ForegroundColor Yellow
if (Test-Path "$imagesDir\image-1.jpg") {
    Remove-Item "$imagesDir\image-1.jpg" -Force
}

Write-Host "✅ Image replacement complete!" -ForegroundColor Green
Write-Host "Please verify images load correctly in browser." -ForegroundColor Cyan
