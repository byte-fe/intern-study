export default ({ store, redirect, error }) => {
  console.log('AUTH', store.getters.isAuth)
  if (store.getters.isAuth) {
    // return redirect('/')
    return error({
      statusCode: 401,
      message: '没有权限'
    })
  }
}
