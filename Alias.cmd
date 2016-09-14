@echo off
rem Alias syntax =^> alias newCommandName=command
for /f "tokens=1* delims=^=" %%a in ("%*") do (
rem writes the command to the newCommandName batch file 
echo @%%b %%* > %%a.cmd
rem hides the file
attrib +h +s %%a.cmd
)