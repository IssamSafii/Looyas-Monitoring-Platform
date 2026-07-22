@echo off
setlocal
if defined MAVEN_HOME (
  "%MAVEN_HOME%\bin\mvn.cmd" %*
  exit /b %errorlevel%
)
if exist "%ProgramFiles%\JetBrains\IntelliJ IDEA 2024.3.5\plugins\maven\lib\maven3\bin\mvn.cmd" (
  "%ProgramFiles%\JetBrains\IntelliJ IDEA 2024.3.5\plugins\maven\lib\maven3\bin\mvn.cmd" %*
  exit /b %errorlevel%
)
mvn %*
