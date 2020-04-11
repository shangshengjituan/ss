
/*
* 未用到
*
* */
let tool = {
  validatorNumber: (rule, value, callback) => {
    let reg = /^(-?\d+)(\.\d+)?$/
    if (value !== '') {
      // value = Number(value)
      if (!reg.test(value)) {
        callback(new Error('不符合数字规范'))
      } else {
        callback()
      }
    } else {
      callback(new Error('不可为空'))
    }
  }
}

export default tool
