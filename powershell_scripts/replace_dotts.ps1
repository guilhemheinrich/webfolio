$DestinationPathWorkspace = "D:\code\QANOPEE\npm-qanopee-monorepo\packages\supabase-types\src"
$DestinationPathTest = "D:\code\QANOPEE\supabase-explore-ts\src\types"

function execute {
    param(
        [string]$DestinationPath
    )
    
    Get-ChildItem -Path $DestinationPath -Recurse -File | ForEach-Object {
        # Lit le contenu du fichier
        $contenu = Get-Content $_.FullName
        
        # Remplace '.ts"' par une chaîne vide
        $modified_doublequote = $contenu -replace '\.ts"', '"'
        $modified_quote = $modified_doublequote -replace "\.ts'", "'"
        
        # Affiche le contenu modifié
        Write-Output $modified_quote
        
        # Enregistre le fichier avec le contenu modifié
        Set-Content -Path $_.FullName -Value $modified_quote
    }
}

execute $DestinationPathWorkspace
execute $DestinationPathTest

