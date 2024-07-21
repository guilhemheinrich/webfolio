
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}
# Référencer le répertoire du script
$rootDir = $PSScriptRoot + "\.."
$SourcePath = $rootDir + "supabase\functions\_shared\types"
echo $SourcePath
$DestinationPathWorkspace = $rootDir+"\packages\supabase-types\src"

Robocopy $SourcePath $DestinationPathWorkspace /E /COPYALL
