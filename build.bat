@echo off
cd android && gradlew assembleRelease && cd .\app\build\outputs\apk\release && explorer . && cd ..\..\..\..\..\..\