# cosmos-odbc

## Installation Error

When deploying to a brand new Windows Server 2016 in Azure, I got the following error:

*The setup routines for the Microsoft DocumentDB ODBC Driver ODBC driver could not be loaded due to system error code 126: The specified module could not be found. (C:\Program Files\Microsoft DocumentDB ODBC Driver\lib\DocumentDBODBC_sb64.dll*

The fix was to install the Visual Studio 2013 Visual C++ ODBC Redistributable Files as per: http://www.simba.com/products/SEN/doc/Client-Server_user_guide/content/clientserver/installing/required_files_-_cpp_redistributable_.htm.