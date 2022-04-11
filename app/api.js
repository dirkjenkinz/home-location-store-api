const axios = require('axios');
const { logger } = require('./utils');
const config = require('./config/config');

const getLocationAPI = async (name) => {
    logger.info('get location API');
    console.log('api', config.api)
    try {
        const response = await axios.get(`${config.api}/${name}`);
        return response.data;
    } catch (error) {
        console.log(error);
        logger.error(error.response);
        return {status: 400};
    }
};

const deleteLocationAPI = async (name) => {
    logger.info('delete location API');
    try {
        const response = await axios.delete(`${config.api}/${name}`);
        return response.status
    } catch (error) {
        logger.error(error.response.status);
        return error.response.status;
    }
};

const getLocationsAPI = async () => {
    logger.info('get locations API');
    try {
        const response = await axios.get(`${config.api}`);
        return response
    } catch (error) {
        console.log(error)
        logger.debug(error.response);
        return {status: 400};
    }
};

const postLocationAPI = async (name, latitude, longitude) => {
    logger.info('post location API');
    const body = {
        locationName: name,
        location: {
            latitude: Number(latitude),
            longitude: Number(longitude)
        }
    }
    try {
        response = await axios.post(`${config.api}`, body);
        return response.status
    } catch (error) {
        logger.error(error.response.statusText);
        return error.response.status;
    }
};

const updateLocationAPI = async (name, latitude, longitude) => {
    logger.info('update location API');
    const body = {
        locationName: name,
        location: {
            latitude: Number(latitude),
            longitude: Number(longitude),
        }
    };
    try {
        response = await axios.put(`${config.api}`, body);
        return response.status;
    } catch (error) {
        logger.error('error:', error);
        return error.response.status;
    }
};

module.exports = {
    getLocationAPI,
    deleteLocationAPI,
    getLocationsAPI,
    postLocationAPI,
    updateLocationAPI,
};