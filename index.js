import dotenv from 'dotenv';
import express from 'express'
import { cors } from './src/middleware/cors.js'
import { logger } from './src/middleware/logger.js'
import {
    NUTRITION_API_REQUEST_MAPPING_TYPES,
    NUTRITION_API_REQUEST_MAPPING_RECIPES,
    API_ERROR_MESSAGE,
    API_ERROR_MESSAGE_NO_PARAM,
    API_ERROR_MESSAGE_BAD_REQUEST
} from './src/helper/Constants.js'
import { getRecipesByKeyWord, getRecipeTypes } from './src/service/FatSecretService.js';

// dotenv config
dotenv.config();

// Express init
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use([cors, logger])

// Envs
const apiPort = process.env.NUTRITION_API_PORT != undefined ? process.env.NUTRITION_API_PORT : '8080';

app.get(NUTRITION_API_REQUEST_MAPPING_TYPES, async (req, res) => {
    const recipeTypes = await getRecipeTypes();
    if (recipeTypes) {
        res.status(200).json(recipeTypes);
    } else {
        res.status(500).json(API_ERROR_MESSAGE);
    }
});

app.get(NUTRITION_API_REQUEST_MAPPING_RECIPES, async (req, res) => {
    const searchWord = req.params.ingredient;
    if (searchWord) {
        try {
            const recipesFromApi = await getRecipesByKeyWord(searchWord);
            res.status(200).json(recipesFromApi);
        } catch (error) {
            res.status(400).json(API_ERROR_MESSAGE_BAD_REQUEST)
        }
    } else {
        res.status(401).json(API_ERROR_MESSAGE_NO_PARAM)
    }

});

app.listen(apiPort, () => {
    console.log("Ready to serve");
});