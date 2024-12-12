export const setDocumentTitle = function (to) {
    const title = to?.meta?.title
    if (!title) {
        return
    }
    document.title = '公共安全大模型-' + title
}
