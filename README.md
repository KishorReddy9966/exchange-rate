# ExchangeRate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

This project uses APIs from [ExchangeRates API](https://exchangeratesapi.io/documentation/)

## Development server

Download the code
`git clone https://github.com/KishorReddy9966/exchange-rate.git`

`cd exchange-rate`

Update the service access_key if needed in environmrnt.ts & environment-prod.ts

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Run the project in Docker

Run `docker build -it tet-exchange-rate .` to build the docker image

Run `docker run -d -p 3000:80 tet-exchange-rate`

Run `docker ps` to check the running container

Access the Application using localhost:3000 or ip_address:3000

## Page 1

Displays the Currency exchange rate of all the available currencies for the selected base currency and historical date as well.
![image](https://user-images.githubusercontent.com/48467022/131123719-219733e8-3fd8-4da0-bf98-4f4c18edd63d.png)


## Page 2

On clicking the Symbol on the table, Course of the exchange rate would be shown for the selected base currency and the time period
![image](https://user-images.githubusercontent.com/48467022/131123786-47b66020-961f-4631-98a4-422f7ade3487.png)


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
