const {
	Given,
	When,
	Then,
	And
} = require('cucumber');
const https = require('https');
const assert = require('assert');
const request = require('request');
const faker = require('faker');

const host = "http://qa-test.cloudbeds.com"
const currencies = "/app_dev.php/api/v1/currencies/"
const exchange = "/app_dev.php/api/v1/exchange/"

const user_role = {
	"user": "YECRSbpLDCXrJXCrVKOU",
	"admin": "tR6TI49mh4fbKAuSjm9L"
}


Given(/^Get all currencies as (.*)/, function(role) {

	var params = {
		url: host + currencies,
		headers: {
			'authorization': user_role[role],
			'accept': 'application/json',
			'content-type': 'application/json'
		}
	};

	request.get(params, function(error, response, body) {
		if (typeof body == 'undefined' && body.length == 0) {
			console.log('error: ', error);
		};
		assert.equal(response.statusCode, 200);
	});
});


Given(/^Create and delete currency as (.*)/, function(role) {

	var url = host + currencies;
	var params = {
		url: url,
		headers: {
			'authorization': user_role[role],
			'accept': 'application/json',
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			code: faker.random.word(), // used random word generator as code and country should be unique values
			country: faker.random.word(),
			value: faker.random.number(100)
		})
	};
	request.post(params, function(error, response, body) { // POST request to create new currency
		assert.equal(200, response.statusCode)
		if (typeof body !== 'undefined' && body.length > 0) {
			request.delete({
				url: url + JSON.parse(body).id,
				headers: {
					'authorization': user_role[role]
				}
			}, function(error, response, body) { // DELETE request to remove currency
				assert.equal(response.statusCode, 200); //expected response code - 200, actual - 204
			});
		} else {
			console.log('error: ', error);
		}
	});
});


Given(/^Get currency by id (\d+) as (.*)/, function(id, role) {

	var params = {
		url: host + currencies + id,
		headers: {
			'authorization': user_role[role],
			'content-type': 'application/json'
		}
	};

	request.get(params, function(error, response, body) {
		if (typeof body == 'undefined' && body.length == 0) {
			console.log('error: ', error);
		};
		assert.equal(response.statusCode, 200);
		assert.equal(JSON.parse(body).id, id);
	});
});

Given(/^Do exchange of (\d+) from currency id (\d+) to currency id (\d+) as (.*)/, function(currencyFromId, currencyToId, amount, role) {

    var exchange_value = amount * currencyFromId / currencyToId
    var params = {
    		url: host + exchange,
    		headers: {
    			'authorization': user_role[role],
    			'content-type': 'application/json'
    		},
    		body: JSON.stringify({
            			currencyFromId: currencyFromId,
            			currencyToId: currencyToId,
            			amount: amount
            		})
    	};

    	request.post(params, function(error, response, body) {
    		if (typeof body == 'undefined' && body.length == 0) {
    			console.log('error: ', error);
    		};
    		assert.equal(response.statusCode, 200); //endpoint returns 500
    		assert.equal(JSON.parse(body), exchange_value);
    	});
});
