const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const https = require('https');
const fs = require('fs');
const app = express()

app.use(cors())

app.get('/', (req,res) => {
    res.json('hi')
})

app.get('/convert', (req,res) => {
    const toCurrency = req.query.to_currency
    const fromCurrency = req.query.from_currency


    const options = {
        method: 'GET',
        url: 'https://localhost:4000/',
        // params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
        // headers: {
        //     'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        //     'x-rapidapi-key': '8fa3683068msh5a2b6f9deade2dap155690jsn32fdf5584616'
        // }
    }

    axios.request(options).then((response) => {
        res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
    }).catch((error) => {
        console.error(error)
    })
})

app.get('/news', (req,res) => {
    const options = {
        method: 'GET',
        url: 'https://localhost:4000/',
        // headers: {
        //     'x-rapidapi-host': 'crypto-news-live.p.rapidapi.com',
        //     'x-rapidapi-key': '8fa3683068msh5a2b6f9deade2dap155690jsn32fdf5584616'
        // }
    }

    axios.request(options).then((response) => {
        res.json(response.data)

    }).catch((error) => {
        console.error(error)
    })
})


/* This is telling the server to listen to port 3001. */
https
	.createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
		{
			key: fs.readFileSync(process.env.privateKey),
			cert: fs.readFileSync(process.env.certificate),
		},
		app,
	)
	.listen(8000, '0.0.0.0', (err) => {
		if (err) {
			throw err;
		} else {
			console.log('🚀 Server running in the');
		}
	});
