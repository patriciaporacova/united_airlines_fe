import axios from "axios";

const kBaseUrl = "https://unitedairlinesassociation.azurewebsites.net/";

const state = {
    weatherRecords: [],
    meanTemp: {jfk: [], ewr: [], lga: []},
    temp: {jfk: [], ewr: [], lga: []},
    days: []
};

const mutations = {
    SET_WEATHER_RECORDS(state, payload) {
        state.weatherRecords = payload;
    },
    SET_TEMP(state, payload) {
        state.temp.ewr = payload.filter(f => f.origin === 'EWR').map(e => [new Date(2013, e.month, e.day, e.hour).getTime(), ((e.temp - 32) * 5 / 9).toFixed(2)]);
        state.temp.lga = payload.filter(f => f.origin === 'LGA').map(e => [new Date(2013, e.month, e.day, e.hour).getTime(), ((e.temp - 32) * 5 / 9).toFixed(2)]);
        state.temp.jfk = payload.filter(f => f.origin === 'JFK').map(e => [new Date(2013, e.month, e.day, e.hour).getTime(), ((e.temp - 32) * 5 / 9).toFixed(2)]);
    },
    SET_MEAN_TEMP(state, payload) {
        state.meanTemp.ewr = payload.filter(f => f.origin === 'EWR').map(e => ((e.mean_temperature - 32) * 5 / 9).toFixed(2));
        state.meanTemp.lga = payload.filter(f => f.origin === 'LGA').map(e => ((e.mean_temperature - 32) * 5 / 9).toFixed(2));
        state.meanTemp.jfk = payload.filter(f => f.origin === 'JFK').map(e => ((e.mean_temperature - 32) * 5 / 9).toFixed(2));
    },
    SET_DAYS(state, payload){
        state.days = payload.filter(f => f.origin === 'EWR').map(e => new Date(2013, e.month, e.day).getTime());
    },
};

const actions = {
    fetchTemp({commit}) {
        axios.get(`${kBaseUrl}weather/temperature`).then(response => {
            if (response.status === 200) {
                commit('SET_TEMP', response.data);
            }
        })
    },
    fetchWeatherRecords({commit}) {
        axios.get(`${kBaseUrl}weather/origin`).then(response => {
            if (response.status === 200) {
                commit('SET_WEATHER_RECORDS', response.data);
            }
        });
    },
    fetchMeanTemperature({commit}) {
        axios.get(`${kBaseUrl}weather/origin/mean-temperature`).then(response => {
            if (response.status === 200) {
                commit('SET_MEAN_TEMP', response.data);
                commit('SET_DAYS', response.data);
            }
        });
    },
};

const getters = {
    temperatureAtJfk: (state) => state.temp.jfk,
    temperature: (state) => state.temp,
    weatherRecords: (state) => state.weatherRecords,
    meanTemp: (state) => state.meanTemp,
    meanTempJfk: (state) => state.meanTemp.jfk,
    days: (state) => state.days,
};

export default {
    state, mutations, actions, getters
}
