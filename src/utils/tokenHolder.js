//页面打开期间的token，避免每次获取都读取硬盘
const cache = {
    token: window.localStorage.getItem('token')
}
if (process.env.NODE_ENV == 'development') {
    // cache.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE2OSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiIxNjAwMjc0NzI0IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJHM0dJS1k2M0M0WU81U1VSSk5WUVMzM01ER01RWU0zSCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJTdHVkZW50IiwiU3VwcGxpZXIiXSwiaHR0cDovL3d3dy5hc3BuZXRib2lsZXJwbGF0ZS5jb20vaWRlbnRpdHkvY2xhaW1zL3RlbmFudElkIjoiMSIsInN1YiI6IjE2OSIsImp0aSI6ImUyNGEzYjAzLTc0OTktNDUyNC1iNGFiLWM0OGRjOTZmMmQ2ZiIsImlhdCI6MTYwMDMxMTIzMCwibmJmIjoxNjAwMzExMjMwLCJleHAiOjE2MDAzOTc2MzAsImlzcyI6IkNoZW5nRGEiLCJhdWQiOiJDaGVuZ0RhIn0.DWTaslDjzeATUfs0WUGr-l6vOhNINKWrXfuMpOUVkHI'
  
}
export default {
    get() {
        return cache.token
    },
    set(token) {
        window.localStorage.setItem('token', token)
        cache.token = token
    },
    remove() {
        window.localStorage.removeItem('token')
        cache.token = null
    }

}