@echo off
setlocal enabledelayedexpansion

set "output=["

for %%F in (*.*) do (
    set "output=!output!"/images/icon/%%F", "
)

if not "!output!"=="[" (
    set "output=!output:~0,-2!"
)
set "output=!output!]"

echo !output! > images.txt

echo Generated JSON string saved to images.txt

pause
endlocal
