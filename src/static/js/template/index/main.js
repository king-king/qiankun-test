import { registerMicroApps, start } from 'qiankun';


registerMicroApps([
    {
        name: 'reactApp',
        entry: '//localhost:3000',
        container: '#container',
        activeRule: '/views/app-react',
    },
    {
        name: 'vueApp',
        entry: '//localhost:8080',
        container: '#container',
        activeRule: '/views/app-vue',
    },
    {
        name: 'reactApp2',
        entry: 'http://localhost:9100/react-app2/template/index.html',
        container: '#container',
        activeRule: '/views/app-react2',
    }
]);
// 启动 qiankun
start();


document.querySelector('.react2').onclick = () => {
    window.history.pushState({}, "react", "/views/app-react2");
}

document.querySelector('.react').onclick = () => {
    window.history.pushState({}, "react", "/views/app-react");
}
document.querySelector('.react-about').onclick = () => {
    window.history.pushState({}, "react", "/views/app-react/about");
}

document.querySelector('.vue').onclick = () => {
    window.history.pushState({}, "vue", "/views/app-vue");
}
