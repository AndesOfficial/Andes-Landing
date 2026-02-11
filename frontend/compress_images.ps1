
# Valid image extensions
$extensions = @(".jpg", ".jpeg", ".png")
$threshold = 500KB
$quality = 75
$maxWidth = 1200
$maxHeight = 1200

# Load System.Drawing for image processing
Add-Type -AssemblyName System.Drawing

# Get all image files in src/assets
$images = Get-ChildItem -Path "src/assets" -Recurse | Where-Object { $extensions -contains $_.Extension.ToLower() }

foreach ($image in $images) {
    if ($image.Length -gt $threshold) {
        Write-Host "Compressing $($image.Name) ($([math]::Round($image.Length / 1MB, 2)) MB)..."
        
        try {
            # Load image
            $originalImage = [System.Drawing.Image]::FromFile($image.FullName)
            
            # Calculate new dimensions
            $newWidth = $originalImage.Width
            $newHeight = $originalImage.Height
            
            if ($originalImage.Width -gt $maxWidth -or $originalImage.Height -gt $maxHeight) {
                $ratioX = $maxWidth / $originalImage.Width
                $ratioY = $maxHeight / $originalImage.Height
                $ratio = [Math]::Min($ratioX, $ratioY)
                
                $newWidth = [int]($originalImage.Width * $ratio)
                $newHeight = [int]($originalImage.Height * $ratio)
            }
            
            # Create new bitmap
            $newImage = new-object System.Drawing.Bitmap $newWidth, $newHeight
            $graph = [System.Drawing.Graphics]::FromImage($newImage)
            $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            
            # Draw resized image
            $graph.DrawImage($originalImage, 0, 0, $newWidth, $newHeight)
            
            # Encoder parameters for quality
            $encoder = [System.Drawing.Imaging.Encoder]::Quality
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, $quality)
            
            # Get codec info
            $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
            
            # Save to temporary file
            $tempFile = $image.FullName + ".tmp"
            $newImage.Save($tempFile, $codec, $encoderParams)
            
            # Dispose objects to release file locks
            $originalImage.Dispose()
            $newImage.Dispose()
            $graph.Dispose()
            
            # Replace original with compressed
            Remove-Item $image.FullName
            Rename-Item $tempFile $image.Name
            
            $newSize = (Get-Item $image.FullName).Length
            Write-Host "  -> Done! New size: $([math]::Round($newSize / 1KB, 2)) KB"
        }
        catch {
            Write-Error "Failed to compress $($image.Name): $_"
        }
    }
}

Write-Host "Compression complete!"
