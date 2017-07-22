@echo off
rem Unalias syntax =^> unlias commandName
set pwd=%cd%
cd %userprofile%\Documents\Aliases
rem unhides the batch file
attrib -h -s %1.cmd
rem deletes it
del %1.cmd
cd %pwd%
