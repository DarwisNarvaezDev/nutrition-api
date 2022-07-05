// API Mappings
export const NUTRITION_API_REQUEST_MAPPING_TYPES = '/type';
export const NUTRITION_API_REQUEST_MAPPING_RECIPES = '/recipe';

// URL Mappings
export const NUTRITION_API_TYPES_URL = 'https://platform.fatsecret.com/rest/server.api?method=recipe_types.get&format=json';
export const NUTRITION_API_RECIPES_SEARCH_URL_BASE = 'https://platform.fatsecret.com/rest/server.api?method=recipes.search&format=json&max_results=10';

// Messages
export const API_ERROR_MESSAGE = 'There was an error with the request.';
export const API_ERROR_MESSAGE_NO_PARAM = `${API_ERROR_MESSAGE}. No param received through URL request.`;
export const API_ERROR_MESSAGE_BAD_REQUEST = `${API_ERROR_MESSAGE}. Something's wrong with the word you used, try another one.`;