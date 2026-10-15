@echo off
title Astro Digital - Novo Site
echo ===================================================
echo     INICIANDO ASTRO DIGITAL - SITE OFICIAL
echo ===================================================
echo.
echo Iniciando servidor local na porta 7755...
start "" cmd /c "node server.js"
timeout /t 2 /nobreak >nul
echo Abrindo site no navegador padrao...
start "" "http://localhost:7755/"
echo.
echo Site iniciado com sucesso!
echo Pressione qualquer tecla para fechar esta janela.
pause >nul
