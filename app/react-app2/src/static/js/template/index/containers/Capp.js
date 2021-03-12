/**
 * Created by chenhaifeng on 2018/2/26.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../components/App';
import { } from '../actions/action.js';

// 自动监听 state -> pros
const mapStateToProps = state => ({
    meta: state.meta
});

// dispatch->props
const mapDispatchToProps = dispatch => ({
    dispatch // 不能删
});

const Capp = connect(mapStateToProps, mapDispatchToProps)(App);

export default Capp;
