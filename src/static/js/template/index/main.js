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
        entry: '//localhost:8000',
        container: '#container',
        activeRule: '/views/app-vue',
    }
]);
// 启动 qiankun
start();

document.querySelector('.react').onclick = () => {
    window.history.pushState({}, "react", "/views/app-react");
}

document.querySelector('.vue').onclick = () => {
    window.history.pushState({}, "vue", "/views/app-vue");
}