import req from '../utils/request'
export default {
    //根据课程id获取课程详情
    getCourseById: Id => req.get(`/Curriculum/GetCurriculumById?Id=${Id}`),
    //根据课程id获取课件列表
    getCoursewareByCourseId: Id => req.get(`/Curriculum/GetAllCurriculumMedia?CurriculumId=${Id}`),
    //根据
    getTaskByCourseId: Id => req.get(`/Homework/GetUserHomeworks?CurriculumId=${Id}`),
    //根据课件ID获取沙龙列表
    getSalonById: Id => req.get(`/OfflineSalon/GetAllOfflineSalon?CurriculumId=${Id}`),
    //根据沙龙id获取沙龙详情
    getSalonDetailById: Id => req.get(`/OfflineSalon/GetOfflineSalonById?Id=${Id}`),
    //报名沙龙
    enterForSalon: params => req.post(`/OfflineSalon/CreateStudentSalonMap`, params),
    getTaskById: params => req.get(`/QuestionBank/GetQuestionBankList`, { params }),
    //交卷
    putHomework: params => req.post(`/Homework/Create`, params),
    //获取笔记列表
    getNote: params => req.get('/LearningNotes/GetPageToClient', { params }),
    getNoteById: id => req.get(`/LearningNotes/GetLearningNotesById?Id=${id}`),
    //添加笔记
    addNote: params => req.post('/LearningNotes/Create', params),
    //修改笔记
    editNote: params => req.put('/LearningNotes/Update', params),
    //删除笔记
    delNote: id => req.delete(`/LearningNotes/Delete?Id=${id}`),

    //获取课程栏目
    getNavigations: () => req.get('/CurriculumNavigation/GetNavigationsToClient'),
    //添加订制
    addCustomized: idsStr => req.put('/Student/CustomizedCurriculumNavigation', { curriculumNavigations: idsStr }),
    //添加学习记录
    addStudyRecord: params => req.post('/LearningRecord/Create', params),

    //获取会员价格
    getVIPPrice: () => req.get('/CurriculumNavigation/GetAllSettings'),

    //用户扫码签到
    signIn: params => req.post('/OfflineSalon/ScanQRCodeSignIn', params),

    //给分享者添加积分
    addIntegral: params => req.put(`/Student/AddIntegralTo15`, params),

    //获取作业详情
    getHomeworkDetail: Id => req.get(`/Homework/GetHomeworkById?Id=${Id}`),
}