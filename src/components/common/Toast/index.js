import ToastComponent from './Toast.vue'
const Toast = {};

// 注册Toast
Toast.install = function (Vue) {
    const ToastConstructor = Vue.extend(ToastComponent);
    const instance = new ToastConstructor();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);

    //定义一个外部的变量，用于控制调用多次提示组件时，清除延时器
    let timer = 0;

    instance.$el.addEventListener('animationend', () => {
        timer = 0
        if (instance.open) return
        instance.show = false//关闭动画结束后 display:none 避免影响文档流
        instance.onClose()
    })
    const onCloseWrapper = (cb) => {//回调包装
        return () => {
            instance.open = false
            cb && cb()
        }
    }

    const methods = {
        inflate(config) {
            if (timer) clearTimeout(timer)
            config['onClose'] = onCloseWrapper(config['onClose'])
            timer = setTimeout(() => {
                instance.open = false
            }, config['duration'] || 2000);
            for (const key in config) {
                instance[key] = config[key]
            }
            instance.open = instance.show = true;
        },

        success(msg, config = {}) {
            methods.inflate({ ...config, msg, type: 'success' })
        },
        error(msg, config = {}) {
            methods.inflate({ ...config, msg, type: 'error' })
        },
        warn(msg, config = {}) {
            methods.inflate({ ...config, msg, type: 'warn' })
        },
        info(msg, config = {}) {
            methods.inflate({ ...config, msg, type: 'info' })
        }
    }

   function entry (msg) {
        methods.success(msg)
    }
    for (const key in methods) {
        entry[key] = methods[key]
    }

    //将方法挂载全局
    Vue.prototype.$Toast = entry;
}
export default Toast;
