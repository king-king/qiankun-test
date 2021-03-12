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
    }
]);
// 启动 qiankun
start();

document.querySelector('.react').onclick = () => {
    window.history.pushState({}, "react", "/views/app-react");
}
document.querySelector('.react-about').onclick = () => {
    window.history.pushState({}, "react", "/views/app-react/about");
}

document.querySelector('.vue').onclick = () => {
    window.history.pushState({}, "vue", "/views/app-vue");
}
