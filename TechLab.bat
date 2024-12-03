start cmd /k "cd BackEnd && npm start"
start cmd /k "cd Calculadora && flask --app server run --debug"
start cmd /k "cd FrontEnd && npm run dev"
timeout /t 5 /nobreak >nul
start firefox --new-window "http://localhost:5173/"