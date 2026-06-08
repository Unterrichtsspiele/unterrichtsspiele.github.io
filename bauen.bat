@echo off
echo ========================================================
echo Launcher wird aktualisiert und gebaut... Bitte warten.
echo ========================================================
call npm run build
echo ========================================================
echo FERTIG! Der Ordner "dist" ist jetzt auf dem neuesten Stand.
echo Sie koennen den "dist" Ordner nun hochladen.
echo ========================================================
pause
