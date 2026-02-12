
$limit = 500000 # 500KB
$extensions = @("*.jpg", "*.jpeg", "*.png")

Add-Type -AssemblyName System.Drawing

Get-ChildItem -Path . -Include $extensions -Recurse | ForEach-Object {
    if ($_.Length -gt $limit) {
        Write-Host "Compressing $($_.Name) ($([math]::Round($_.Length/1KB)) KB)..."
        
        $img = [System.Drawing.Image]::FromFile($_.FullName)
        
        # Calculate new dimensions (max 1024px width/height to be safe)
        $status = "Resizing"
        $newWidth = $img.Width
        $newHeight = $img.Height
        
        if ($img.Width -gt 1200) {
            $newWidth = 1200
            $newHeight = [int]($img.Height * (1200 / $img.Width))
        }
        
        $newImg = new-object System.Drawing.Bitmap $newWidth, $newHeight
        $graph = [System.Drawing.Graphics]::FromImage($newImg)
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)
        
        $img.Dispose() # Release original file handle
        
        # Save depending on format
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75)
        
        $newName = $_.FullName
        # If PNG, we might convert to JPG to save space if it's not transparent, but safe to keep extension or convert.
        # Let's convert large PNGs to JPG if they don't have transparency? Hard to detect.
        # Simple approach: Overwrite with JPEG encoding but keep same name if possible? 
        # Actually, System.Drawing might fail saving PNG as JPG with .png extension locally.
        # Let's just resize and save.
        
        # For simplicity in this script, we will save everything as JPG to ensure compression
        $newName = $_.FullName -replace "\.png$", ".jpg"
        
        try {
            $newImg.Save($newName, $codec, $encoderParams)
            $newImg.Dispose()
            $graph.Dispose()
            
            if ($_.Extension -eq ".png" -and $newName -ne $_.FullName) {
                Remove-Item $_.FullName
            }
            Write-Host "Done: $($_.Name) -> $(Split-Path $newName -Leaf)"
        } catch {
            Write-Host "Error processing $($_.Name): $_"
        }
    }
}
