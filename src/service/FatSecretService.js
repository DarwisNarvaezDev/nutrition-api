import request from 'request';
import fetch from 'node-fetch';
import { NUTRITION_API_TYPES_URL, NUTRITION_API_RECIPES_SEARCH_URL_BASE } from '../helper/Constants.js'

async function authenticate() {

    return new Promise(function (resolve, reject) {

        let options = {
            method: 'POST',
            url: process.env.FAT_SECRET_AUTH_URL,
            auth: {
                user: process.env.FAT_SECRET_CLIENT_ID,
                password: process.env.FAT_SECRET_PASSWORD
            },
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            form: {
                'grant_type': 'client_credentials',
                'scope': 'basic'
            },
            json: true
        };

        request(options, function (error, response, body) {
            if (error) reject(body);

            resolve(body);
        });
    });

}

export async function getRecipeTypes() {

    try {
        const url = NUTRITION_API_TYPES_URL;
        const { access_token } = await authenticate();

        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        const { recipe_types } = await data.json();
        const { recipe_type } = recipe_types;
        return recipe_type;

    } catch (error) {
        return error;
    }

}

export async function getRecipesByKeyWord(requestBody) {
    try {

        const foodType = requestBody.type !== null || !requestBody.type ? requestBody.type : '';
        const searchWord = requestBody.searchWord;

        const url = `${NUTRITION_API_RECIPES_SEARCH_URL_BASE}&search_expression=${searchWord}`;
        const { access_token } = await authenticate();

        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        const dataToJson = await data.json();
        const { recipe } = dataToJson.recipes;
        return recipe;

    } catch (error) {
        return error;
    }

}