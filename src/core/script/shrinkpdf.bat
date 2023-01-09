@echo off
 
REM Shrinks PDFs and puts them in a subdirectory of the first file
REM Usage: shrinkpdf.bat file1 file2 ...
 
REM Location of the Ghostscript exectuble
set GSPATH="C:\Program Files\gs\gs9.19\bin\gswin64c.exe"
 
REM Name of the subdirectory to store the shrunk files to
set OUTSUBDIR=shrunk
 
if "%~1"=="" (
 echo Usage: shrinkpdf.bat file1 file2 ...
 goto end
)
 
REM Take the path of the first file and use it as the folder
REM to create the shrunk directory under
set OUTDIR=%~dp1\%OUTSUBDIR%
 
REM Create the output folder if it doesn't exist
if not exist "%OUTDIR%" mkdir "%OUTDIR%"
 
:shrinkPDF
set OUTNAME=%OUTDIR%\%~nx1
 
@echo "Processing %~nx1"
 
REM Work the shrinking magic
REM Based on http://www.alfredklomp.com/programming/shrinkpdf/
%GSPATH% -q -dNOPAUSE -dBATCH -dSAFER ^
-sDEVICE=pdfwrite ^
-dCompatibilityLevel=1.3 ^
-dPDFSETTINGS=/screen ^
-dEmbedAllFonts=true ^
-dSubsetFonts=true ^
-dColorImageDownsampleType=/Bicubic ^
-dColorImageResolution=180 ^
-dGrayImageDownsampleType=/Bicubic ^
-dGrayImageResolution=180 ^
-dMonoImageDownsampleType=/Bicubic ^
-dMonoImageResolution=180 ^
-sOutputFile="%OUTNAME%" ^
"%~1"

REM Load the next file
shift
 
REM Are there any more files to shrink?
if "%~1"=="" goto end
 
goto shrinkPDF

:end