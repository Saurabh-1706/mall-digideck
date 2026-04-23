$dest = 'd:\Project\mall2\public\images'
$headers = @{
  'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0'
  'Accept' = 'image/webp,image/apng,image/*,*/*'
}

$images = @(
  # WEM Exterior - Wikimedia full res
  @{ name = 'wem-real-exterior.jpg';    url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/West_Edmonton_Mall.jpg/1280px-West_Edmonton_Mall.jpg' },
  @{ name = 'wem-real-galaxyland.jpg';  url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Galaxyland_Mindbender_2.jpg/1024px-Galaxyland_Mindbender_2.jpg' },
  @{ name = 'wem-real-waterpark.jpg';   url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/World_Waterpark_WEM_2019.jpg/1024px-World_Waterpark_WEM_2019.jpg' },
  @{ name = 'wem-real-ice-palace.jpg';  url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Ice_Palace_WEM_2.jpg/1024px-Ice_Palace_WEM_2.jpg' },
  @{ name = 'wem-real-santa-maria.jpg'; url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Santa_Maria_WEM.jpg/1024px-Santa_Maria_WEM.jpg' },
  @{ name = 'wem-real-entrance.jpg';    url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/WEM_entrance.jpg/1024px-WEM_entrance.jpg' },
  @{ name = 'wem-real-interior.jpg';    url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Inside_of_West_Edmonton_Mall.jpg/1024px-Inside_of_West_Edmonton_Mall.jpg' }
)

foreach ($img in $images) {
  $outFile = "$dest\$($img.name)"
  try {
    Invoke-WebRequest -Uri $img.url -OutFile $outFile -Headers $headers -TimeoutSec 30 -ErrorAction Stop
    $size = [math]::Round((Get-Item $outFile).Length / 1KB)
    if ($size -gt 10) {
      Write-Host "OK  $($img.name) - ${size}KB"
    } else {
      Write-Host "BAD $($img.name) - ${size}KB (too small, likely error page)"
      Remove-Item $outFile -Force
    }
  } catch {
    Write-Host "ERR $($img.name) - $($_.Exception.Message.Split([Environment]::NewLine)[0])"
  }
  Start-Sleep -Seconds 3
}
Write-Host "Done."
