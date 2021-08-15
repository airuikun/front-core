const fs = require('fs-extra')
const dateFns = require('date-fns')
const git = require('simple-git');
const path = require('path')

//需要配置的信息
const dir = `/Users/airuikun/Desktop/project/technology/git-auto-commit/mongoose_crud`
const dirRM = path.join(dir, `/recordLeah.js`)

const user = '第一名的小蝌蚪'
const email = '30694912@qq.com'
//初始时间
const startTime = '2018-10-13'
//所要提交的次数
const loop = 3

execProcess()

async function execProcess() {
    await writeFile()
}

async function writeFile() {
    try {
        const gitTarget = git(dir);
        gitTarget.pull('origin', 'master')
        //判断是否存在recordLeah.js文件 没有则创建
        await fs.ensureFile(dirRM)
        for (let i = 0; i < loop; i++) {
            const initTime = (new Date(startTime)).getTime() + (1*24*60*60*1000)*i//得到目标时间毫秒数
            const targetTime = new Date(initTime)//得到目标时间GMT值
            const record = dateFns.format(new Date(initTime), 'YYYY/MM/DD hh:mm:ss')//得到目标时间的具体格式的值
            //添加内容
            await fs.appendFile(dirRM, `git auto commit: ${record} \n`)
            //一定要控制好异步操作同步化 要不然会只有一个commit
            await gitTarget
                .add('./*')
                .commit(`git auto commit: ${record}`, { '--author': `"${user} <${email}>"`, '--date': `${targetTime}`})
        }
        //多个commit合并成一次提交
        gitTarget.push('origin', 'master')
    } catch (error) {
        console.log('error', JSON.stringify(error))
    }
    
}

