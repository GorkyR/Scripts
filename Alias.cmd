@echo off
rem Alias syntax =^> alias newCommandName=command
set pwd=%cd%
cd %userprofile%\Documents\Aliases
for /f "tokens=1* delims=^=" %%a in ("%*") do (
rem writes the command to the newCommandName batch file 
echo @%%b %%* > %%a.cmd
rem hides the file
attrib +h +s %%a.cmd
)
cd %pwd%