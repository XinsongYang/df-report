# df-report

A Node.JS application that takes the output of "df" and shows reports on back filesystems that are more than 75% full AND have less than 3 Gigabytes left.

## Demo

https://console.starter-us-west-1.openshift.com/console/project/df-report/browse/services/df-report?tab=details

![demo1](./demo1.png)

![demo2](./demo2.png)

## Getting Started

* Install packages
```
cd server && npm install
```

* Build the front end
```
cd frontend && npm install
npm run dev
```

* Start it up.
```
cd server && npm start
```