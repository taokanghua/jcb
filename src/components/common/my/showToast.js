import Vue from 'vue'
import Toast from './show-toast.vue'
const ToastConstructor = Vue.extend(Toast)

function showToast(title, duration=1500) {
  const toastDOM = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        title:title,
        isShow:true
      }
    }
  })

  document.body.appendChild(toastDOM.$el)

  setTimeout(() => {
    toastDOM.isShow = false
  }, duration)
}



export default function () {
  Vue.prototype.showToast = showToast
}