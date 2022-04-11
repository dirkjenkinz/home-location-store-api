const { expect, test } = require('@jest/globals');

const {
    getWorker,
    getAllWorkers,
    postWorker, updateWorker,
    findWorkersByHome,
} = require('../app/api');

const axios = require('axios');
const workerDetails = '{\"workerId\":0,\"name\":\"name\",\"location\":{\"latitude\":6.0274563,\"longitude\":1.4658129},\"home\":\"home\"}';
const worker = {
    "workerId": 21882100,
    "name": "Dirk Jenkinz",
    "location": {
        "latitude": 6.0274563,
        "longitude": 1.4658129
    },
    "home": "Midwich"
};
const workerList = [{
    "workerId": 0,
    "name": "Jimmy Jewel",
    "location": {
        "latitude": 3.3627422,
        "longitude": 2.1234567
    },
    "home": "Swindon"
}, {
    "workerId": 0,
    "name": "Sweeney Todd",
    "location": {
        "latitude": 3.0274563,
        "longitude": 2.4658129
    },
    "home": "Swindon"
}];

jest.mock('axios');

afterEach(() => {
    jest.clearAllMocks();
});

describe("Get worker", () => {
    test("it should call axios", async () => {
        axios.get.mockResolvedValueOnce(workerDetails);
        const response = await getWorker(21882000);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/v1/workers/21882000');
    });
});

describe("Get all workers", () => {
    test("it should call axios", async () => {
        axios.get.mockResolvedValueOnce(workerList);
        const response = await getAllWorkers();
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/v1/workers');
    });
    test("it should return meaningful data", async () => {
        axios.get.mockResolvedValueOnce(workerList);
        const response = await getAllWorkers();
        expect(response).toEqual(workerList);
    });
});

describe("Add a new worker", () => {
    test("it should call axios", async () => {
        axios.post.mockResolvedValueOnce(worker);
        const response = await postWorker(21882100, 'Dirk Jenkinz', [1.4658129, 6.0274563], 'Midwich');
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/v1/workers', worker);
    });
});

describe("Update worker", () => {
    test("it should call axios", async () => {
        axios.put.mockResolvedValueOnce(worker);
        const response = await updateWorker(21882100, 'Dirk Jenkinz', [1.4658129, 6.0274563], 'Midwich');
        expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/v1/workers', worker);
    });
});

describe("Find worker by home", () => {
    test("it should call axios", async () => {
        axios.get.mockResolvedValueOnce(workerList);
        const response = await findWorkersByHome('home');
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/v1/workers/findByHome/home');
    });
});
