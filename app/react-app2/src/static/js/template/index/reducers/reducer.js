/**
 * Created by chenhaifeng on 2018/2/26.
 */

import { combineReducers } from 'redux';
import {
} from '../actions/action.js';


const meta = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const content = (state = {
    trendData: {
        // 存放趋势图的数据
        categories: [],
        series: []
    },
    modalTrendData: {
        // 存放弹出框趋势图的数据
        categories: [],
        series: []
    },
    hotProGridData: [],
    flowProDridData: [],
    trendLoadingState: true,
    hotProLoadingState: true,
    flowProLoadingState: true,
    modalLoadingState: true
}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const rootReducer = combineReducers({ meta, content });

export default rootReducer;
