const fs = require('fs-extra')
const dateFns = require('date-fns')
const git = require('simple-git');
const path = require('path')
const schedule = require('node-schedule');

//需要配置的信息
const dir = `/Users/airuikun/Desktop/project/technology/git-auto-commit/mongoose_crud`
const dirRM = path.join(dir, `/recordLeah.js`)

const user = '第一名的小蝌蚪'
const email = '30694912@qq.com'

execProcess()

async function execProcess() {
    //每天的10点的时候提交一次
    schedule.scheduleJob('* * 10 * * *', function(){
        writeFile()
    });
}

async function writeFile() {
    try {
        const gitTarget = git(dir);
        const record = dateFns.format(new Date(), 'YYYY/MM/DD hh:mm:ss')//得到目标时间的具体格式的值
        //初始拉取一下项目
        gitTarget.pull('origin', 'master')
        //判断是否存在recordLeah.js文件 没有则创建
        await fs.ensureFile(dirRM)
        //添加内容
        await fs.appendFile(dirRM, `git auto commit: ${record} \n`)
        //一定要控制好异步操作同步化 要不然会只有一个commit
        await gitTarget
            .add('./*')
            .commit(`git auto commit: ${record}:${Math.random()}`, { '--author': `"${user} <${email}>"`, '--date': `${new Date()}`})
            .push('origin', 'master')
        console.log(`提交成功:${record}`)
    } catch (error) {
        console.log('error', error)
    }
    
}

