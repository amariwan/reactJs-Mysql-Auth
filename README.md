


<h1 align="center">
  ReactJs Auth with MySQL API
</h1>


Before start, you need to have the following tools installed on computer: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) and/or [Yarn](https://yarnpkg.com/). [MySQl::Workbench](https://www.mysql.com/products/workbench/).



### 📗 Quick Start

Install backend by running either of the following:
> Install NodeJS LTS from NodeJs Official Page (NOTE: Product only works with LTS version)

Clone the repository with the following command:
```bash
https://github.com/amariwan/reactJs-Mysql-Auth.git
```
Run in terminal this command:
```bash
cd backend && npm i 
```

Change your mySQL database data .env
```bash
cp -r env .env
```
Then run this command to start your local server
```bash
npm rum dev 
```
or
```bash
npm start
```

## 🦠  errorcodes messages 

A table that shows the error codes and their respective messages.
| code  | Msg  |
| :------------ |:---------------|
| 100 | username or Email already registered|
| 101 | Invalid email|
| 102 | Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.|
| 103 | Invalid email|
| 104 | Not registered user!|
| 105 | Email or password incorrect|
| 106 | User successfully registered|

## 🚀 Libraries used

  Backend: 
* [express](https://www.npmjs.com/package/express)
* [express-session](https://www.npmjs.com/package/express-session)
* [cors](https://www.npmjs.com/package/cors)
* [cookie-parser](https://www.npmjs.com/package/cookie-parser)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [mysql](https://www.npmjs.com/package/mysql)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [cors](https://www.npmjs.com/package/cors)
* [Formik](https://www.npmjs.com/package/formik)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
