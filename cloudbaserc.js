module.exports = {
    // 此处填入你的真实环境 ID
    envId: "test-1gotf68l43775c18",
    functionRoot: "./functions",
    functions: [
        {
            name: "generateTicket",
            // 超时时间
            timeout: 5,
            // 环境变量
            envVariables: {},
            runtime: "Nodejs10.15",
            // 内存 128
            memorySize: 128,
            handler: "index.main"
        }
    ]
};
