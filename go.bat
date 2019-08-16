@echo off
del /q chrome-ext\*
for /d %%x in (chrome-ext\*) do @rd /s /q "%%x"
xcopy /s /y lessons\%1 chrome-ext
