import test from './test.js'

function v1() {
    return 'v1'
}
function v2() {
    return 'v2'
}

export default {
    v1,
    v2,
    test
}
export {
    v1,
    v2,
    v2 as streamV2,
    test
}